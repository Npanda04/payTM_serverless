import { Hono } from "hono";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@npanda_04/serverless_paytm";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();

  const { success } = signupInput.safeParse(body);

  if (!success) {
    return c.json({
      message: "invalid inputs",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
      },
    });

    // Generate a random balance between 100 and 20000
    const randomBalance = Math.floor(Math.random() * (20000 - 100 + 1) + 100);

    // Create a balance record for the user
    await prisma.balance.create({
      data: {
        amount: randomBalance,
        userId: user.id,
      },
    });

    const jwt = await sign(
      {
        id: user.id,
        username: user.username,
      },
      c.env.JWT_SECRET
    );

    return c.json({
      message: jwt,
    });
  } catch (error) {
    c.status(411);
    return c.text("invalid creds");
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();

  const { success } = signinInput.safeParse(body);

  if (!success) {
    return c.json({
      message: "wrong inputs",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      },
    });

    if (!user) {
      return c.json({
        message: "invalid creds",
      });
    }

    const jwt = await sign(
      {
        id: user.id,
        username: user.username,
      },
      c.env.JWT_SECRET
    );

    return c.json({
      message: jwt,
    });
  } catch (error) {
    c.status(411);
    return c.text("user didn't exist");
  }
});

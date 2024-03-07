import { Hono } from "hono";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { decode, sign, verify } from "hono/jwt";

export const accountRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    userName : string
  };
}>();

accountRouter.use("/*", async (c, next) => {
  try {
    const token = c.req.header("authorization") || "";
    const user = await verify(token, c.env.JWT_SECRET);




    if (user) {
      c.set("userName", user.username)
      c.set("userId", user.id);

      
      await next();
    } else {
      c.json({
        message: "You are not logged in",
      });
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    c.json({
      message: "Internal Server Error",
    });
  }
});

accountRouter.get("/balance", async (c) => {
  const userId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const balance = await prisma.balance.findFirst({
      where: {
        userId: parseInt(userId),
        
      },
      include: {
        user: {
          select: {
            name: true,
            username: true
          },
        },
      },
    });

    console.log(balance)

    if (!balance) {
      return c.json({ error: "Balance not found for the user" });
    }

    return c.json({
      balance: balance,
    });
  } catch (error) {
    console.error("Error fetching balance:", error);
    return c.json({ error: "Internal server error" });
  }
});

accountRouter.post("/transfer", async (c) => {
  const { to, amount } = await c.req.json();
  const userName = c.get("userName");
  const userId = c.get("userId");

  
  








  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const balance = await prisma.balance.findFirst({
      where: {
        userId: parseInt(userId),
      },
    });





    if (!balance?.amount || balance?.amount < amount) {
      return c.json({
        message: "Insufficiant balance"
      })
    }

    const receiverAccount = await prisma.user.findUnique({
      where: {
        username: to,
      },
    });

    console.log(receiverAccount)

  



    if (!receiverAccount){
      return c.json({
        message: "user not found"
      })
      
      

    } else if(receiverAccount.username === userName) {
      return c.json({
        message : "Cannot transfer to the same account"
      });
    }

    try {
      await prisma.$transaction([
        prisma.balance.update({
          where: { userId: parseInt(userId) },
          data: { amount: { decrement: amount } },
        }),
        prisma.balance.update({
          where: { userId: receiverAccount.id },
          data: { amount: { increment: amount } },
        }),
      ]);

      return c.text("Transfer successful");
    } catch (error) {
      console.error("Error during transfer:", error);
      return c.json({ message: "Transfer failed" });
    } finally {
      await prisma.$disconnect();
    }

});

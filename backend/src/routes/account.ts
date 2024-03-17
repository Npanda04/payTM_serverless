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
    userName: string;
  };
}>();

accountRouter.use("/*", async (c, next) => {
  try {
    const token = c.req.header("authorization") || "";
    const user = await verify(token, c.env.JWT_SECRET);

    if (user) {
      c.set("userName", user.username);
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
            username: true,
          },
        },
      },
    });

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
      message: "Insufficiant balance",
    });
  }

  const receiverAccount = await prisma.user.findUnique({
    where: {
      username: to,
    },
  });

  if (!receiverAccount) {
    return c.json({
      message: "user not found",
    });
  } else if (receiverAccount.username === userName) {
    return c.json({
      message: "Cannot transfer to the same account",
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

      prisma.transaction.create({
        data:{
          senderId: parseInt(userId),
          receiverId: receiverAccount.id,
          amount: amount
        }
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


accountRouter.get("/recent-transactions", async (c) => {

  const userId = c.get("userId");
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());



    // Assuming you have Prisma client instance named 'prisma'

 // Replace with the desired userId

const userTransactions = await prisma.transaction.findMany({
  where: {
    // Fetch transactions where the user is either the sender or the receiver
    OR: [
      { senderId: parseInt(userId) },
      { receiverId: parseInt(userId) },
    ],
  },
  take: 3, // Limit the result to the top 3 transactions
  orderBy: {
    timestamp: 'desc', // Order by timestamp in descending order
  },
  select: {
    amount: true,
    timestamp: true,
    message: true,
    sender: {
      // Including the 'name' and 'username' fields from the 'User' table for the sender
      select: {
        name: true,
      },
    },
    receiver: {
      // Including the 'name' and 'username' fields from the 'User' table for the receiver
      select: {
        name: true,
      },
    },
  },
});

console.log('User Transactions:', userTransactions);




    

    

    return c.json(userTransactions);




    // const recentTransactions = await prisma.transaction.findMany({
    //   take: 3,
    //   orderBy: { timestamp: 'desc' },
    //   select:{
    //     amount: true,
    //     timestamp: true,
    //     message: true,
    //     sender:{
    //       select:{
    //         username: true
    //       }
    //     },
    //     receiver: {
    //       select:{
    //         username: true
    //       }
    //     }
    //   } 
    // });
    


    // return c.json(recentTransactions);
  } catch (error) {
    console.error('Error fetching recent transactions:', error);
    return c.json({ error: 'Internal Server Error' });
  }
});


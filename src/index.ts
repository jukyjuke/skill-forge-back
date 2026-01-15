import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const main = async () => {
  try {
    const user = await prisma.user.create({
      data: {
        email: "test2@example.com",
        username: "Test2",
        password: "test2",
      },
    });
    console.log("Utilisateur créé :", user);
  } catch (error: any) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
  } finally {
    await prisma.$disconnect();
  }
};

main();

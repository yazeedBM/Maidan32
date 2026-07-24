import { PrismaClient } from "@prisma/client";

let prisma = global._prisma;
if (!prisma) {
  prisma = global._prisma = new PrismaClient();
}

export default prisma;

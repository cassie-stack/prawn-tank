import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  await prisma.tag.upsert({
    where: {
      name: "furry",
    },
    update: {},
    create: {
      name: "furry",
    },
  });

  await prisma.tag.upsert({
    where: {
      name: "shrek",
    },
    update: {},
    create: {
      name: "shrek",
    },
  });

  await prisma.user.upsert({
    where: {
      username: "admin",
    },
    update: {},
    create: {
      username: "admin",
    },
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const createdUser = await prisma.user.create({
      data: seedUser,
    });

    res.statusCode = 200;
    res.json({ success: "true" });
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.json({ error: error.message });
  }
}

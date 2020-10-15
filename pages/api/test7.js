const { PrismaClient } = eval('require("@prisma/client")');
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    await Promise.all([prisma.profile.deleteMany(), prisma.post.deleteMany()]);
    await prisma.user.deleteMany();

    const createdUser = await prisma.user.create({
      data: seedUser,
    });

    const createdUser2 = await prisma.user.create({
      data: seedUser2,
    });

    res.statusCode = 200;
    res.json({ success: "true" });
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.json({ error: error.message });
  }
}

const seedUser = {
  email: "jane@prisma.io",
  name: "Jane",
  profile: {
    create: {
      bio: "Health Enthusiast",
    },
  },
  posts: {
    create: [
      {
        title:
          "Comparing Database Types: How Database Types Evolved to Meet Different Needs",
        content:
          "https://www.prisma.io/blog/comparison-of-database-models-1iz9u29nwn37/",
      },
      {
        title: "Analysing Sleep Patterns: The Quantified Self",
        content: "https://quantifiedself.com/get-started/",
      },
      {
        title: "Prisma 2 Docs",
        content: "https://www.prisma.io/docs/",
      },
    ],
  },
};

const seedUser2 = {
  email: "toru@prisma.io",
  name: "Toru Takemitsu",
  profile: {
    create: {
      bio: "Musician",
    },
  },
  posts: {
    create: [
      {
        title: "Requiem for String Orchestra",
        content: "",
      },
      {
        title: "Music of Tree",
        content: "",
      },
      {
        title: "Waves for clarinet, horn, two trombones and bass drum ",
        content: "",
      },
    ],
  },
};

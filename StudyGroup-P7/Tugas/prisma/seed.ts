import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Start Seeding Data ---');

  await prisma.profile.deleteMany();
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
  await prisma.category.deleteMany();
  await prisma.publisher.deleteMany();

  const catFiction = await prisma.category.create({ data: { name: 'Fiksi' } });
  const catManga = await prisma.category.create({ data: { name: 'Manga' } });

  const pubGramedia = await prisma.publisher.create({ data: { name: 'Gramedia Pustaka Utama' } });
  const pubElex = await prisma.publisher.create({ data: { name: 'Elex Media Komputindo' } });

  const authorTereLiye = await prisma.author.create({
    data: {
      name: 'Tere Liye',
      profile: { 
        create: { bio: 'Penulis produktif asal Indonesia dengan berbagai karya best-seller seperti serial Bumi.' } 
      },
    },
  });

  const authorTatsuya = await prisma.author.create({
    data: {
      name: 'Tatsuya Endo',
      profile: { 
        create: { bio: 'Mangaka Jepang yang menciptakan seri hits Spy x Family.' } 
      },
    },
  });

  await prisma.book.create({
    data: {
      title: 'Bumi',
      year: 2014,
      categoryId: catFiction.id,
      publisherId: pubGramedia.id,
      authors: { 
        connect: [{ id: authorTereLiye.id }] 
      },
    },
  });

  await prisma.book.create({
    data: {
      title: 'Spy x Family vol. 1',
      year: 2019,
      categoryId: catManga.id,
      publisherId: pubElex.id,
      authors: { 
        connect: [{ id: authorTatsuya.id }] 
      },
    },
  });

  console.log('--- Seeding Finished Successfully! ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
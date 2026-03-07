import "dotenv/config";
import express from "express";
import type { Request, Response, Application } from "express";
import { PrismaClient } from "@prisma/client";

const app: Application = express();
const prisma = new PrismaClient();
const PORT: number = 3000;

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("<h1>API Ready - Prisma Connected</h1><p>Gunakan endpoint <b>/books</b> untuk akses data.</p>");
});

app.get("/books", async (_req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        category: true,
        authors: true,
        publisher: true
      }
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

app.get("/books/search", async (req: Request, res: Response) => {
  try {
    const titleParam = req.query.title;

    if (typeof titleParam !== "string") {
      return res.status(400).json({ message: "Query parameter 'title' harus string" });
    }

    const books = await prisma.book.findMany({
      where: {
        title: { contains: titleParam, mode: "insensitive" },
      },
      include: { category: true, authors: true }
    });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

app.get("/books/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "ID harus angka" });

    const book = await prisma.book.findUnique({
      where: { id },
      include: { authors: true, category: true, publisher: true }
    });

    if (!book) return res.status(404).json({ message: "Buku tidak ditemukan" });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

app.post("/books", async (req: Request, res: Response) => {
  try {
    const { title, year, categoryId, authorIds, publisherId } = req.body;

    if (!title || !year || !categoryId) {
      return res.status(400).json({ message: "Title, Year, dan CategoryId wajib diisi" });
    }

    const newBook = await prisma.book.create({
      data: {
        title,
        year,
        category: { connect: { id: categoryId } },
        ...(publisherId && { publisher: { connect: { id: publisherId } } }),
        authors: {
          connect: authorIds?.map((id: number) => ({ id })) || []
        }
      },
      include: { authors: true, category: true }
    });

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Gagal membuat buku. Pastikan ID Relasi valid." });
  }
});

app.put("/books/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, year, categoryId, authorIds } = req.body;

    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        title,
        year,
        ...(categoryId && { category: { connect: { id: categoryId } } }),
        ...(authorIds && {
          authors: {
            set: authorIds.map((id: number) => ({ id })) 
          }
        })
      }
    });

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(404).json({ message: "Buku tidak ditemukan atau ID relasi salah" });
  }
});

app.delete("/books/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "ID tidak valid" });

    await prisma.book.delete({ where: { id } });
    res.status(200).json({ message: "Buku berhasil dihapus" });
  } catch (error) {
    res.status(404).json({ message: "Buku tidak ditemukan" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
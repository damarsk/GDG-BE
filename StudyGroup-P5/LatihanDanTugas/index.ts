import express, { Request, Response, Application } from "express";
import * as swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app: Application = express();
const PORT: number = 3000;

app.use(express.json());

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}

let books: Book[] = [
  { id: 1, title: "Hujan", author: "Damar", year: 2025 },
  { id: 2, title: "Laskar Pelangi", author: "Andrea Hirata", year: 2005 },
];

const swaggerDocumentation = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    status: 200,
    message: "Endpoint list:",
    endpoints: [
      { method: "GET", path: "/", description: "Endpoint list" },
      { method: "GET", path: "/books", description: "Get all books" },
      { method: "POST", path: "/books", description: "Create a new book" },
      {
        method: "GET",
        path: "/books/s/:title",
        description: "Search a book by title",
      },
      { method: "PUT", path: "/books/:id", description: "Update a book" },
      { method: "DELETE", path: "/books/:id", description: "Delete a book" },
    ],
  });
});
app.get("/books", (_req: Request, res: Response) => {
  res.status(200).json(books);
});
app.post("/books", (req: Request, res: Response) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year)
    return res.status(400).json({ message: "Data tidak lengkap!" });
  const newBook: Book = {
    id: Date.now(),
    title: title,
    author: author,
    year: year,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});
app.get("/books/s/:title", (req: Request, res: Response) => {
  const { title } = req.params;
  if (!title) return res.status(400).json({ message: "Masukkan judul!" });
  let result = books.filter(
    (book) => book.title.toLowerCase() === String(title).toLowerCase(),
  );
  if (result.length <= 0) {
    return res.status(404).json({ message: "Buku tidak ditemukan!" });
  }
  res.status(200).json(result);
});
app.get("/books/:id", (req: Request, res: Response) => {
  const id: number = parseInt(String(req.params.id));
  const result = books.find((b) => b.id === id);
  if (!result) {
    return res.status(404).json({ message: "Buku tidak ditemukan!" });
  }
  res.status(200).json(result);
});
app.put("/books/:id", (req: Request, res: Response) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year)
    return res.status(400).json({ message: "Data tidak lengkap!" });
  const id: number = parseInt(String(req.params.id));
  const index = books.findIndex((b) => b.id === id);
  if (index !== -1) {
    books[index] = { ...books[index], ...req.body, id };
    res.status(200).json(books[index]);
  } else {
    res.status(404).json({ message: "Buku tidak ditemukan!" });
  }
});
app.delete("/books/:id", (req: Request, res: Response) => {
  const id: number = parseInt(String(req.params.id));
  const initialLength = books.length;
  books = books.filter((b) => b.id !== id);
  if (books.length < initialLength) {
    res.status(200).json({ message: "Buku berhasil dihapus!" });
  } else {
    res.status(404).json({ message: "Buku tidak ditemukan!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} | http://localhost:${PORT}`);
  console.log(`Swagger: http://localhost:${PORT}/api-docs`);
});

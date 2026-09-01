import express from "express";

const app = express();
const PORT = 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DB = {};

app.get("/", (req, res) => {
  return res.json({ message: "Welcome to Akorede Book Server" });
});

//Upload books
app.post("/upload", (req, res) => {
  const { bookTitle, bookAuthor, bookId } = req.body;
  if (DB[bookId] != null) {
    return res.json({ message: "Book exist already" });
  }
  DB[bookId] = { bookTitle, bookAuthor };
  return res.json({ message: "Book Added to Database." });
});

//Get books
app.get("/getBooks", (req, res) => {
  const { bookId } = req.query;

  if (bookId) {
    if (DB[bookId] == null) {
      return res.json({ message: "Book does not exist" });
    }
    return res.json({ book: DB[bookId] });
  }
  return res.json({ books: DB });
});

//find book by id
app.get("/bookid", (req, res) => {
  const { bookId } = req.query;
  if (DB[bookId] == null) {
    return res.json({ message: "Book does not exist" });
  }
  return res.json({ book: DB[bookId] });
});


app.listen(PORT, () => {
  console.log("Server is up Sir");
});

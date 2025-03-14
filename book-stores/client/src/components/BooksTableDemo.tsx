import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Import the API functions
import {
  getBooks,
  getAuthors,
  getCategories,
  getPublishers,
  deleteBook,
} from "@/lib/api";
interface Book {
  id: string;
  title: string;
  stock_quantity: number;
  price: string;
  author: string;
  category: string;
  publisher: string;
}

interface Author {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

interface Publisher {
  id: string;
  name: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const router = useRouter();
  const [totalBooks, setTotalBooks] = useState("0");

  // Fetch books, authors, categories, and publishers from API
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const booksData = await getBooks();
      const authorsData = await getAuthors();
      const categoriesData = await getCategories();
      const publishersData = await getPublishers();

      setBooks(booksData);
      setAuthors(authorsData);
      setCategories(categoriesData);
      setPublishers(publishersData);

      setTotalBooks(booksData.length.toString());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Get the name of an author by ID
  function getAuthorName(authorId: string): string {
    const author = authors.find((author) => author.id === authorId);
    return author ? author.name : "Unknown";
  }

  // Get the name of a category by ID
  function getCategoryName(categoryId: string): string {
    const category = categories.find((category) => category.id === categoryId);
    return category ? category.name : "Unknown";
  }

  // Get the name of a publisher by ID
  function getPublisherName(publisherId: string): string {
    const publisher = publishers.find(
      (publisher) => publisher.id === publisherId
    );
    return publisher ? publisher.name : "Unknown";
  }

  // Delete a book
  async function handleDeleteBook(bookId: string) {
    try {
      const response = await deleteBook(bookId);

      if (response) {
        setBooks(books.filter((book) => book.id !== bookId));
        setTotalBooks((books.length - 1).toString());
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  }

  return (
    <>
      {/* Header */}
      <h1 className="flex justify-center font-bold text-2xl my-4">
        Total Books: {totalBooks}
      </h1>

      {/* Table to Show Books */}
      <Table>
        <TableCaption>List of books available in the store.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Publisher</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{getAuthorName(book.author)}</TableCell>
              <TableCell>{book.stock_quantity}</TableCell>
              <TableCell>{getCategoryName(book.category)}</TableCell>
              <TableCell>{getPublisherName(book.publisher)}</TableCell>
              <TableCell className="text-right">Rs. {book.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Book Button */}
      <div className="flex justify-center my-6">
        <Button
          className="bg-green-500 text-white hover:bg-green-700"
          onClick={() => router.push("/books")}
        >
          view more
        </Button>
      </div>
    </>
  );
}

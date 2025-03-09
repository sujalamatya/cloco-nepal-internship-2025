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
import { getBooks, deleteBook } from "@/lib/api"; // Adjust the import path if needed

// Define the Book type based on Django API
interface Book {
  id: string;
  title: string;
  stock_quantity: number;
  price: string;
  author: string;
  category?: string;
  publisher?: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();
  const [totalBooks, setTotalBooks] = useState("0");

  // Fetch books from Django API
  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      const data = await getBooks();
      setBooks(data);
      console.log(data);
      setTotalBooks(data.length.toString());
    } catch (error) {
      console.error("Error fetching books:", error);
    }
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
      <h1 className="flex justify-center font-bold text-4xl my-4">
        📚 Total Books: {totalBooks}
      </h1>

      {/* Table to Show Books */}
      <Table>
        <TableCaption>List of books available in the store.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Publisher</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">{book.id}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.stock_quantity}</TableCell>
              <TableCell>{book.category || "N/A"}</TableCell>
              <TableCell>{book.publisher || "N/A"}</TableCell>
              <TableCell className="text-right">Rs. {book.price}</TableCell>
              <TableCell>
                <div className="flex space-x-3">
                  {/* Edit Button */}
                  <button
                    onClick={() => router.push(`/books/${book.id}`)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    ✏️
                  </button>

                  {/* Delete Button with Confirmation Dialog */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="text-red-500 hover:text-red-700">
                        🗑️
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the book.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteBook(book.id)}
                          className="bg-red-500 text-white"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Book Button */}
      <div className="flex justify-center my-6">
        <Button
          className="bg-green-500 text-white hover:bg-green-700"
          onClick={() => router.push("/books/add")}
        >
          ➕ Add Book
        </Button>
      </div>
    </>
  );
}

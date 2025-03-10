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
import { Book, Author, Category, Publisher } from "@/types/types";

// Import the API functions
import {
  getBooks,
  getAuthors,
  getCategories,
  getPublishers,
  deleteBook,
} from "@/lib/api";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [loading, setLoading] = useState(false); // To track if data is still loading
  const [totalBooks, setTotalBooks] = useState("0");
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    if (loading) return;

    setLoading(true);
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
    } finally {
      setLoading(false); // Set loading state to false after fetching
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
        setTotalBooks((prevTotal) => (parseInt(prevTotal) - 1).toString());
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
              <TableCell>{getAuthorName(book.author)}</TableCell>
              <TableCell>{book.stock_quantity}</TableCell>
              <TableCell>{getCategoryName(book.category)}</TableCell>
              <TableCell>{getPublisherName(book.publisher)}</TableCell>
              <TableCell className="text-right">Rs. {book.price}</TableCell>
              <TableCell>
                <div className="flex space-x-3">
                  {/* Edit Button */}
                  <Button
                    onClick={() => router.push(`/books/${book.id}`)}
                    className="bg-blue-500 hover:bg-blue-700 text-white"
                  >
                    Edit
                  </Button>

                  {/* Delete Button with Confirmation Dialog */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="bg-red-500 hover:bg-red-700 text-white">
                        Delete
                      </Button>
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
          Add Book
        </Button>
      </div>
    </>
  );
}

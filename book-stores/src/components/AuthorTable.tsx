import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Define the Book type
interface Book {
  id: string;
  name: string;
  author: string;
  price: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [authorsData, setAuthorsData] = useState<
    { author: string; count: number }[]
  >([]);
  const [selectedAuthorBooks, setSelectedAuthorBooks] = useState<Book[]>([]);
  const router = useRouter();
  const [totalBooks, setTotalBooks] = useState("0");

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      const response = await fetch("http://localhost:4000/books");
      const data: Book[] = await response.json();
      setBooks(data);
      setTotalBooks(data.length.toString());

      // Group books by author and calculate the number of books per author
      const authorsCount = data.reduce(
        (acc: { [key: string]: number }, book) => {
          acc[book.author] = (acc[book.author] || 0) + 1;
          return acc;
        },
        {}
      );

      const authorsData = Object.keys(authorsCount).map((author) => ({
        author,
        count: authorsCount[author],
      }));

      setAuthorsData(authorsData);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  // Function to get books by selected author
  function handleAuthorClick(author: string) {
    const filteredBooks = books.filter((book) => book.author === author);
    setSelectedAuthorBooks(filteredBooks);
  }

  return (
    <>
      <h1 className="flex justify-center font-bold text-4xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
          />
        </svg>
        Total authors: {totalBooks}
      </h1>

      {/* Table to Show Authors and Their Book Count */}
      <Table>
        <TableCaption>
          List of authors and the number of books they have.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Author</TableHead>
            <TableHead className="text-right">Number of Books</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {authorsData.map((authorData, index) => (
            <Popover key={index}>
              <PopoverTrigger asChild>
                <TableRow
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleAuthorClick(authorData.author)}
                >
                  <TableCell>{authorData.author}</TableCell>
                  <TableCell className="text-right">
                    {authorData.count}
                  </TableCell>
                </TableRow>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <h3 className="text-lg font-semibold mb-2">
                  Books by {authorData.author}
                </h3>
                <ul className="space-y-2">
                  {selectedAuthorBooks.length > 0 ? (
                    selectedAuthorBooks.map((book) => (
                      <li
                        key={book.id}
                        className="p-2 border rounded-lg shadow-sm"
                      >
                        <p className="font-medium">{book.name}</p>
                        <p className="text-sm text-gray-500">
                          Price: ${book.price}
                        </p>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500">No books found.</p>
                  )}
                </ul>
              </PopoverContent>
            </Popover>
          ))}
        </TableBody>
      </Table>

      {/* Button to Add New Book */}
      <div className="flex justify-center my-4">
        <Button
          className="bg-muted-foreground text-white hover:bg-green-700"
          onClick={() => router.push("/books/add")}
        >
          Add Book
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
            />
          </svg>
        </Button>
      </div>
    </>
  );
}

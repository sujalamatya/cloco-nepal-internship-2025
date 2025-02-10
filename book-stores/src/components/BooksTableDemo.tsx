import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { NumberTicker } from "./magicui/number-ticker";

// Define the Book type
interface Book {
  id: string;
  name: string;
  author: string;
  price: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalBooks, setTotalBooks] = useState("0");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("http://localhost:4000/books");
        const data: Book[] = await response.json();
        setBooks(data);
        setTotalBooks(data.length > 0 ? data[data.length - 1].id : "0");
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    fetchBooks();
  }, []);

  return (
    <>
      <h1 className="flex justify-center font-bold text-4xl">
        Total Books:{" "}
        <NumberTicker
          value={Number(totalBooks)}
          className="whitespace-pre-wrap text-4xl font-bold tracking-tighter text-black dark:text-white"
        />
      </h1>
      <Table>
        <TableCaption>List of books.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(showAll ? books : books.slice(0, 5)).map((book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">{book.id}</TableCell>
              <TableCell>{book.name}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell className="text-right">{book.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="font-medium text-center">
              Showing {showAll ? books.length : Math.min(5, books.length)} of{" "}
              {books.length} books
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {!showAll && books.length > 5 && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-700 rounded-2xl"
            onClick={() => setShowAll(true)}
          >
            Show More
          </button>
        </div>
      )}
    </>
  );
}

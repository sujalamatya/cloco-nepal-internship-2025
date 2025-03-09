"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthors, deleteAuthor, Author } from "@/lib/api"; // Import API functions
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

export default function AuthorsTable() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchAuthors();
  }, []);

  async function fetchAuthors() {
    try {
      const data = await getAuthors();
      setAuthors(data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this author?")) {
      try {
        await deleteAuthor(id);
        setAuthors(authors.filter((author) => author.id !== id)); // Update state
      } catch (error) {
        console.error("Error deleting author:", error);
      }
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-4">Authors List</h1>

      <Table>
        <TableCaption>List of authors</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {authors.map((author) => (
            <TableRow key={author.id}>
              <TableCell>{author.name}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  className="bg-blue-500 hover:bg-blue-700 text-white"
                  onClick={() => router.push(`/authors/${author.id}`)}
                >
                  Edit
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-700 text-white"
                  onClick={() => handleDelete(author.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center my-4">
        <Button
          className="bg-green-500 hover:bg-green-700 text-white"
          onClick={() => router.push("/authors/add")}
        >
          Add Author
        </Button>
      </div>
    </>
  );
}

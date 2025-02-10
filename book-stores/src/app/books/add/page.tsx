"use client"; // This tells Next.js that this component should be rendered on the client-side

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

// Define the Book type
interface Book {
  id: string;
  name: string;
  author: string;
  price: string;
}

export default function AddBook() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]); // To store the list of books
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Book>();

  // Fetch the list of books to determine the next ID
  useEffect(() => {
    fetch("http://localhost:4000/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  // Handle form submission (add new book)
  const onSubmit = async (data: Book) => {
    try {
      // Generate new ID based on the highest current ID + 1
      const newId = books.length
        ? (Math.max(...books.map((book) => parseInt(book.id))) + 1).toString()
        : "1";

      // Prepare the new book data with generated ID
      const newBook = { ...data, id: newId };

      const response = await fetch("http://localhost:4000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        // Redirect to the books list after adding the new book
        router.push("/books");
      } else {
        console.error("Error adding book:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="flex justify-center mt-10 w-">
      <Card className="w-9/12">
        <CardHeader>
          <CardTitle>Add New Book</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Name Input */}
            <div>
              <Label htmlFor="name">Book Name</Label>
              <Input
                id="name"
                {...register("name", { required: "Book name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Author Input */}
            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                {...register("author", { required: "Author is required" })}
              />
              {errors.author && (
                <p className="text-red-500 text-sm">{errors.author.message}</p>
              )}
            </div>

            {/* Price Input */}
            <div>
              <Label htmlFor="price">Price (Rs.)</Label>
              <Input
                id="price"
                type="number"
                {...register("price", { required: "Price is required" })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Add Book
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

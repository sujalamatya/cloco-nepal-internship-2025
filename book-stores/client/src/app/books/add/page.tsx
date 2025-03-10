"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addBook, getAuthors } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookSchema } from "@/lib/validationSchemas/bookSchema"; // import the Zod schema

interface Book {
  name: string;
  author: string;
  price: string;
  stock_quantity: string;
  category: string;
  publisher: string;
}

export default function AddBook() {
  const router = useRouter();
  const [authors, setAuthors] = useState<{ id: string; name: string }[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Book>({
    resolver: zodResolver(bookSchema), // Use Zod for validation
  });

  useEffect(() => {
    async function fetchAuthors() {
      try {
        const authorsList = await getAuthors();
        setAuthors(authorsList);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    }
    fetchAuthors();
  }, []);

  const onSubmit = async (data: Book) => {
    try {
      const response = await addBook(data);
      if (response) {
        router.push("/books");
      } else {
        console.error("Error adding book.");
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="flex justify-center mt-10 w-full">
      <Card className="w-9/12">
        <CardHeader>
          <CardTitle>Add New Book</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <Label htmlFor="name">Book Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="author">Author</Label>
              <select
                id="author"
                {...register("author")}
                className="border rounded px-2 py-1 w-full"
              >
                <option value="">Select an author</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
              {errors.author && (
                <p className="text-red-500 text-sm">{errors.author.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="price">Price (Rs.)</Label>
              <Input id="price" type="number" {...register("price")} />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="stock_quantity">Stock Quantity</Label>
              <Input
                id="stock_quantity"
                type="number"
                {...register("stock_quantity")}
              />
              {errors.stock_quantity && (
                <p className="text-red-500 text-sm">
                  {errors.stock_quantity.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input id="category" {...register("category")} />
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="publisher">Publisher</Label>
              <Input id="publisher" {...register("publisher")} />
              {errors.publisher && (
                <p className="text-red-500 text-sm">
                  {errors.publisher.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Add Book
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

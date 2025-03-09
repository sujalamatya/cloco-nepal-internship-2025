"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { updateBook, getBook } from "@/lib/api"; // Import API functions

// Define the Book type
interface Book {
  id: string;
  title: string;
  author: string;
  price: string;
  stock_quantity: number;
  category?: string;
  publisher?: string;
}

interface EditBookProps {
  params: {
    id: string;
  };
}

export default function EditBook({ params }: EditBookProps) {
  const router = useRouter();
  const { id } = params;
  const [book, setBook] = useState<Book | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Book>();

  // Fetch book data when the component mounts
  useEffect(() => {
    if (id) {
      getBook(id)
        .then((data) => {
          setBook(data);
          reset(data);
        })
        .catch((error) => console.error("Error fetching book details:", error));
    }
  }, [id, reset]);

  const onSubmit = async (data: Book) => {
    try {
      const response = await updateBook(id, data); // Use the updateBook function

      if (response) {
        router.push("/books");
      } else {
        console.error("Error updating book.");
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-9/12">
        <CardHeader>
          <CardTitle>Edit Book</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <Label htmlFor="title">Book Title</Label>
              <Input
                id="title"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

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

            <div>
              <Label htmlFor="stock_quantity">Stock Quantity</Label>
              <Input
                id="stock_quantity"
                type="number"
                {...register("stock_quantity", {
                  required: "Stock quantity is required",
                })}
              />
              {errors.stock_quantity && (
                <p className="text-red-500 text-sm">
                  {errors.stock_quantity.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Update Book
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

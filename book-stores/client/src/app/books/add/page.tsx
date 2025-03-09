"use client"; // This tells Next.js that this component should be rendered on the client-side

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addBook } from "@/lib/api"; // Import addBook function from utils

// Define the Book type
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Book>();

  // Handle form submission (add new book)
  const onSubmit = async (data: Book) => {
    try {
      const response = await addBook(data); // Use the addBook function

      if (response) {
        router.push("/books"); // Redirect after success
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

            {/* Stock Quantity */}
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

            {/* Category */}
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                {...register("category", { required: "Category is required" })}
              />
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Publisher */}
            <div>
              <Label htmlFor="publisher">Publisher</Label>
              <Input
                id="publisher"
                {...register("publisher", {
                  required: "Publisher is required",
                })}
              />
              {errors.publisher && (
                <p className="text-red-500 text-sm">
                  {errors.publisher.message}
                </p>
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

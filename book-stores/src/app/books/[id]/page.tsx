// Dynamic route [id] displays the edit table
"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
// Define the Book type
interface Book {
  id: string;
  name: string;
  author: string;
  price: string;
}

interface EditBookProps {
  params: {
    id: string;
  };
}

//
export default function EditBook({ params }: EditBookProps) {
  const router = useRouter();
  const { id } = params; // Use `params.id` directly from dynamic route params
  const [book, setBook] = useState<Book | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Book>();

  useEffect(() => {
    if (id) {
      // Fetch book details based on the ID
      fetch(`http://localhost:4000/books/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setBook(data);
          reset(data); // Populate form with fetched data
        })
        .catch((error) => console.error("Error fetching book details:", error));
    }
  }, [id, reset]);

  // Handle form submission
  const onSubmit = async (data: Book) => {
    try {
      const response = await fetch(`http://localhost:4000/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Redirect to the books list after saving
        router.push("/books");
      } else {
        console.error("Error updating book:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <>
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
                  <p className="text-red-500 text-sm">
                    {errors.author.message}
                  </p>
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
                Update Book
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

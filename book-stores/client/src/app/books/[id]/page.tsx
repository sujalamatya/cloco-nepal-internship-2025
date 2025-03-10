"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  updateBook,
  getBook,
  getAuthors,
  getCategories,
  getPublishers,
} from "@/lib/api"; // Import API functions
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the Book type
interface Book {
  id: string;
  title: string;
  author: string; // Foreign key ID for author
  price: string;
  stock_quantity: number;
  category: string; // Foreign key ID for category
  publisher: string; // Foreign key ID for publisher
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
  const [authors, setAuthors] = useState<{ id: string; name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [publishers, setPublishers] = useState<{ id: string; name: string }[]>(
    []
  );

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Book>();

  // Fetch book and foreign key data when the component mounts
  useEffect(() => {
    if (id) {
      getBook(id)
        .then((data) => {
          setBook(data);
          reset(data); // Reset form with the book data
        })
        .catch((error) => console.error("Error fetching book details:", error));
    }

    // Fetch authors, categories, and publishers data
    Promise.all([getAuthors(), getCategories(), getPublishers()])
      .then(([authors, categories, publishers]) => {
        setAuthors(authors);
        setCategories(categories);
        setPublishers(publishers);
      })
      .catch((error) => console.error("Error fetching data:", error));
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
            {/* Book Title */}
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

            {/* Author Dropdown */}
            <div>
              <Label htmlFor="author">Author</Label>
              <Select
                onValueChange={(value) => setValue("author", value)}
                defaultValue={book.author}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an author" />
                </SelectTrigger>
                <SelectContent>
                  {authors.map((author) => (
                    <SelectItem key={author.id} value={author.id}>
                      {author.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.author && (
                <p className="text-red-500 text-sm">{errors.author.message}</p>
              )}
            </div>

            {/* Category Dropdown */}
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) => setValue("category", value)}
                defaultValue={book.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Publisher Dropdown */}
            <div>
              <Label htmlFor="publisher">Publisher</Label>
              <Select
                onValueChange={(value) => setValue("publisher", value)}
                defaultValue={book.publisher}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a publisher" />
                </SelectTrigger>
                <SelectContent>
                  {publishers.map((publisher) => (
                    <SelectItem key={publisher.id} value={publisher.id}>
                      {publisher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.publisher && (
                <p className="text-red-500 text-sm">
                  {errors.publisher.message}
                </p>
              )}
            </div>

            {/* Price */}
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

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Update Book
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

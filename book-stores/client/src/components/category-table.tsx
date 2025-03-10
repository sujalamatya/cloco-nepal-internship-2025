"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCategories, deleteCategory } from "@/lib/api"; // Import API functions
import { Category } from "@/types/types";
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

export default function CategoryTable() {
  const [category, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchCategory();
  }, []);

  async function fetchCategory() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this Category?")) {
      try {
        await deleteCategory(id);

        setCategories((prevCategorie) =>
          prevCategorie.filter((category) => category.id !== id)
        );
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-4">Categories</h1>

      <Table>
        <TableCaption>Categories List </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {category.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  className="bg-blue-500 hover:bg-blue-700 text-white"
                  onClick={() => router.push(`/category/${category.id}`)}
                >
                  Edit
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-700 text-white"
                  onClick={() => handleDelete(category.id)}
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
          onClick={() => router.push("/category/add")}
        >
          Add category
        </Button>
      </div>
    </>
  );
}

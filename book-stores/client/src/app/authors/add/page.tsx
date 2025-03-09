"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addAuthor } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddAuthorPage() {
  const [name, setName] = useState("");
  const router = useRouter();

  async function handleAdd() {
    try {
      await addAuthor({ name });
      router.push("/authors");
    } catch (error) {
      console.error("Error adding author:", error);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
      <h1 className="text-2xl font-bold text-center mb-4">Add Author</h1>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <Button
        className="bg-green-500 hover:bg-green-700 text-white w-full"
        onClick={handleAdd}
      >
        Add Author
      </Button>
    </div>
  );
}

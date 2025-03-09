"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getAuthor, updateAuthor, Author } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditAuthorPage() {
  const { id } = useParams();
  const router = useRouter();
  const [author, setAuthor] = useState<Author | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    if (id) {
      fetchAuthor();
    }
  }, [id]);

  async function fetchAuthor() {
    try {
      const data = await getAuthor(id as string);
      setAuthor(data);
      setName(data.name);
    } catch (error) {
      console.error("Error fetching author:", error);
    }
  }

  async function handleUpdate() {
    try {
      await updateAuthor(id as string, { name });
      router.push("/authors");
    } catch (error) {
      console.error("Error updating author:", error);
    }
  }

  if (!author) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
      <h1 className="text-2xl font-bold text-center mb-4">Edit Author</h1>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <div className="flex justify-between">
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white"
          onClick={handleUpdate}
        >
          Save Changes
        </Button>
        <Button
          className="bg-gray-500 hover:bg-gray-700 text-white"
          onClick={() => router.push("/authors")}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

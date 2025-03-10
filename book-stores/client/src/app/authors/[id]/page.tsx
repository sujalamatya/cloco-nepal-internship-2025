"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getAuthor, updateAuthor, Author } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="flex justify-center mt-10">
      <Card className="w-11/12 md:w-3/4 lg:w-1/2">
        <CardHeader>
          <CardTitle>Edit Author</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
            className="flex flex-col gap-4"
          >
            <div>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
                placeholder="Enter author name"
              />
            </div>

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
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

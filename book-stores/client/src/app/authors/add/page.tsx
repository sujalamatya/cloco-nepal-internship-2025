"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addAuthor } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="flex justify-center mt-10">
      <Card className="w-11/12 md:w-3/4 lg:w-1/2">
        <CardHeader>
          <CardTitle>Add New Author</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAdd();
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
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white w-full"
              >
                Add Author
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

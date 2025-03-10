import { z } from "zod";

const bookSchema = z.object({
  name: z.string().min(1, { message: "Book name is required" }),
  author: z.string().min(1, { message: "Author is required" }),
  price: z
    .string()
    .min(1, { message: "Price is required" })
    .regex(/^\d+$/, { message: "Price must be a valid number" }),
  stock_quantity: z
    .string()
    .min(1, { message: "Stock quantity is required" })
    .regex(/^\d+$/, { message: "Stock quantity must be a valid number" }),
  category: z.string().min(1, { message: "Category is required" }),
  publisher: z.string().min(1, { message: "Publisher is required" }),
});

export { bookSchema };

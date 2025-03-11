import { z } from "zod";

const bookSchema = z.object({
  id: z.string().min(1, { message: "ID is required" }), // Include the `id` field here
  name: z.string().min(1, { message: "Book name is required" }),
  author: z.string().min(1, { message: "Author is required" }),
  price: z
    .number()
    .min(1, { message: "Price is required" })
    .refine((val) => val > 0, { message: "Price must be a positive number" }),
  stock_quantity: z
    .number()
    .min(1, { message: "Stock quantity is required" })
    .refine((val) => val >= 0, {
      message: "Stock quantity must be a non-negative number",
    }),
  category: z.string().min(1, { message: "Category is required" }),
  publisher: z.string().min(1, { message: "Publisher is required" }),
});

export { bookSchema };

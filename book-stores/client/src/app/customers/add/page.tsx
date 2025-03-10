"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addCustomer } from "@/lib/api";

// Define Customer Type
interface Customer {
  name: string;
  email: string;
  phone: string;
}

export default function AddCustomer() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Customer>();

  // Handle form submission (add new customer)
  const onSubmit = async (data: Customer) => {
    try {
      const response = await addCustomer(data);

      if (response) {
        router.push("/customers"); // Redirect after success
      } else {
        console.error("Error adding customer.");
      }
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  return (
    <div className="flex justify-center mt-10 w-full">
      <Card className="w-9/12">
        <CardHeader>
          <CardTitle>Add New Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Name Input */}
            <div>
              <Label htmlFor="name">Customer Name</Label>
              <Input
                id="name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Input */}
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone", { required: "Phone number is required" })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Add Customer
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

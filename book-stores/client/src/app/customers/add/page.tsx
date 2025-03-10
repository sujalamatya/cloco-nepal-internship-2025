"use client"; // This tells Next.js that this component should be rendered on the client-side

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addCustomer, updateCustomer, getCustomer } from "@/lib/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// Define the Customer type
interface Customer {
  name: string;
  email: string;
  phone: string;
}

export default function CustomerForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customerId = searchParams.get("id");
  const [loading, setLoading] = useState<boolean>(false); // State to manage loading state for fetching data
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // State for handling submission status
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Customer>();

  useEffect(() => {
    if (customerId) {
      setLoading(true); // Set loading state to true while fetching data
      getCustomer(customerId)
        .then((customer) => {
          setValue("name", customer.name);
          setValue("email", customer.email);
          setValue("phone", customer.phone);
          setLoading(false); // Set loading state to false when data is fetched
        })
        .catch((error) => {
          console.error("Error fetching customer:", error);
          setLoading(false); // Set loading to false even in case of an error
        });
    }
  }, [customerId, setValue]);

  // Handle form submission (add or edit customer)
  const onSubmit = async (data: Customer) => {
    try {
      setIsSubmitting(true); // Start submission
      if (customerId) {
        await updateCustomer(customerId, data); // Update existing customer
      } else {
        await addCustomer(data); // Add a new customer if there's no customerId
      }
      reset(); // Reset form after submission
      router.push("/customers"); // Redirect to customers list
    } catch (error) {
      console.error("Error saving customer:", error);
    } finally {
      setIsSubmitting(false); // Stop submission loading
    }
  };

  return (
    <div className="flex justify-center mt-10 w-full">
      <Card className="w-9/12">
        <CardHeader>
          <CardTitle>{customerId ? "Edit Customer" : "Add Customer"}</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading customer data...</p> // Display loading message while fetching customer data
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* Name Input */}
              <div>
                <Label htmlFor="name">Name</Label>
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
                  {...register("phone", { required: "Phone is required" })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting
                  ? "Saving..."
                  : customerId
                  ? "Update Customer"
                  : "Add Customer"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

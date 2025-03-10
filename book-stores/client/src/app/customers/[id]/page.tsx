"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCustomer, updateCustomer } from "@/lib/api";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export default function EditCustomer() {
  const { id } = useParams();
  const router = useRouter();
  const [customerData, setCustomerData] = useState<Customer | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Customer>();

  useEffect(() => {
    async function fetchCustomerData() {
      if (id && typeof id === "string") {
        // Check if id is a valid string
        try {
          const customer = await getCustomer(id);
          setCustomerData(customer);
          setValue("name", customer.name);
          setValue("email", customer.email);
          setValue("phone", customer.phone);
        } catch (error) {
          console.error("Error fetching customer:", error);
        }
      }
    }
    fetchCustomerData();
  }, [id, setValue]);

  const onSubmit = async (data: Customer) => {
    try {
      if (id && typeof id === "string") {
        // Ensure id is a string
        const response = await updateCustomer(id, data);
        if (response) {
          router.push("/customers"); // Redirect back to the customers list after success
        } else {
          console.error("Error updating customer.");
        }
      }
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  if (!customerData) return <p>Loading...</p>; // Loading state if data is not available yet

  return (
    <div className="flex justify-center mt-10 w-full">
      <Card className="w-9/12">
        <CardHeader>
          <CardTitle>Edit Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
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

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="text"
                {...register("phone", { required: "Phone number is required" })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Update Customer
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

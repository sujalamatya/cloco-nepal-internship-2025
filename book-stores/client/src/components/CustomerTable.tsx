"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCustomers, deleteCustomer, Customer } from "@/lib/api";
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

export default function CustomersTable() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this customer?")) {
      try {
        await deleteCustomer(id);
        setCustomers(customers.filter((customer) => customer.id !== id)); // Remove from UI
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-4">Customers List</h1>

      <Table>
        <TableCaption>List of customers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  className="bg-blue-500 hover:bg-blue-700 text-white"
                  onClick={() => router.push(`/customers/${customer.id}`)}
                >
                  Edit
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-700 text-white"
                  onClick={() => handleDelete(customer.id)}
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
          onClick={() => router.push("/customers/add")}
        >
          Add Customer
        </Button>
      </div>
    </>
  );
}

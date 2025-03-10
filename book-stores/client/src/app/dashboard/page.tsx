"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Component as BarChartCard } from "@/components/BarChartCard";
import { Component as PieChartComponent } from "@/components/PieChartComponent";
import BooksTableDemo from "@/components/BooksTableDemo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

interface Book {
  id: string;
  name: string;
  author: string;
  price: string;
}

export default function Page() {
  const [books, setBooks] = useState<Book[]>([]);
  const [uniqueAuthors, setUniqueAuthors] = useState<number>(0);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Home</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 min-h-screen">
          <div className="md:row-span-2 rounded-xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex justify-between">
                  <p>Analytics</p>
                </CardTitle>
                <CardDescription>Revenue from last 6 months</CardDescription>
              </CardHeader>
              <CardContent className="mt-6">
                <BarChartCard />
              </CardContent>
            </Card>
            <Card className="mt-3">
              <CardHeader>
                <CardTitle className="text-2xl flex justify-between">
                  <p>Analytics</p>
                </CardTitle>
                <CardDescription>Revenue from last 6 months</CardDescription>
              </CardHeader>
              <CardContent className="mt-6">
                <PieChartComponent />
              </CardContent>
            </Card>
          </div>

          <Card className="transition-transform duration-500 ease-in-out transform group hover:scale-105">
            <CardHeader>
              <CardTitle className="text-2xl flex justify-between">
                <p>Authors</p>
              </CardTitle>
              <CardDescription>Total Authors:</CardDescription>
            </CardHeader>
            <CardContent>{uniqueAuthors}</CardContent>
          </Card>

          <Card className="transition-transform duration-500 ease-in-out transform group hover:scale-105">
            <CardHeader>
              <CardTitle className="text-2xl flex justify-between">
                <p>Customers</p>
              </CardTitle>
              <CardDescription>Total Customers:</CardDescription>
            </CardHeader>
            <CardContent>100</CardContent>
          </Card>

          <Card className="md:col-span-2 row-span-2">
            <CardHeader>
              <CardTitle className="text-2xl flex justify-between">
                <p>Books</p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BooksTableDemo />
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

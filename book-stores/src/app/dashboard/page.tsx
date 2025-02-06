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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import Link from "next/link";
export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 ">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb className="">
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
        {/* <div className="flex flex-1 flex-col gap-4 p-4  "> */}
        {/* replace with grid-rows-2 if needed later */}
        <div className="grid grid-cols-3 gap-4 p-4 h-[120vh] overflow-hidden">
          {/* Card 1: Large card on the left spanning 4 rows */}
          <div className="row-span-2 rounded-xl ">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  <div className="flex justify-between">
                    <p>Analytics</p>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                        />
                      </svg>
                    </div>
                  </div>
                </CardTitle>
                <CardDescription>Revenue from last 6 months</CardDescription>
              </CardHeader>
              <CardContent className="mt-6">
                <BarChartCard />
              </CardContent>
            </Card>

            <Card className="mt-3">
              <CardHeader>
                <CardTitle className="text-2xl">
                  <div className="flex justify-between">
                    <p>Analytics</p>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                        />
                      </svg>
                    </div>
                  </div>
                </CardTitle>
                <CardDescription>Revenue from last 6 months</CardDescription>
              </CardHeader>
              <CardContent className="mt-6">
                <PieChartComponent />
              </CardContent>
            </Card>
          </div>

          {/* Card 2: Top-right card spanning 2 rows */}
          <Card className="col-span-1 row-span-1 transition-transform duration-500 ease-in-out transform group hover:scale-105">
            <CardHeader>
              <CardTitle className="text-2xl">
                <div className="flex justify-between">
                  <p>Authors</p>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </div>
                </div>
              </CardTitle>
              <CardDescription>Total Autors:</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="">
                <h1 className=" font-bold text-4xl">700</h1>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Next card also spanning 2 rows */}
          <Card className="col-span-1 row-span-1 transition-transform duration-500 ease-in-out transform group hover:scale-105">
            <CardHeader>
              <CardTitle className="text-2xl">
                <div className="flex justify-between">
                  <p>Customers</p>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </div>
                </div>
              </CardTitle>
              <CardDescription>Total Customers:</CardDescription>
            </CardHeader>
            <CardContent>
              <h1 className=" font-bold text-4xl ">1000</h1>
            </CardContent>
          </Card>

          {/* Card 4: Last card taking up all remaining space */}

          <Card className="col-span-2 row-span-2">
            <CardHeader>
              <CardTitle className="text-2xl">
                <div className="flex justify-between">
                  <p>Books</p>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                      />
                    </svg>
                  </div>
                </div>
              </CardTitle>
              {/* <CardDescription>980</CardDescription> */}
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

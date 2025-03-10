"use client";
import * as React from "react";
import { usePathname } from "next/navigation"; // Import usePathname from next/navigation
import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      items: [
        {
          title: "Home",
          url: "/dashboard",
        },
        {
          title: "Books",
          url: "/books",
        },
        {
          title: "Authors",
          url: "/authors",
        },
        {
          title: "Customers",
          url: "/customers",
        },
        {
          title: "Categories",
          url: "/category",
        },
        {
          title: "Publishers",
          url: "/publishers",
        },
        {
          title: "Employees",
          url: "/employees",
        },
        {
          title: "Users",
          url: "/users",
        },
        {
          title: "Inventory",
          url: "/inventory",
        },
        {
          title: "Order Item",
          url: "/order-item",
        },
        {
          title: "Order Details",
          url: "/order-details",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname(); // Get the current pathname

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {/* Add any other components you might need */}
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title} className="m-5">
            <SidebarGroupLabel className="mb-9">{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((menuItem) => {
                  // Determine if the current route matches the menu item's URL
                  const isActive = pathname === menuItem.url;

                  return (
                    <SidebarMenuItem key={menuItem.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <a href={menuItem.url}>{menuItem.title}</a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

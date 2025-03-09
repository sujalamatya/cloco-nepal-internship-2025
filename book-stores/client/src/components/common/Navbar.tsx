"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Logo from "@/assets/logo.png";
import { ModeToggle } from "./ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [topNavbar, setTopNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setTopNavbar(currentScrollY < 100);
      setShowNavbar(!(currentScrollY > lastScrollY && currentScrollY > 100));
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="px-4">
      <nav
        className={` w-full top-0 z-50 p-3 px-8 border rounded-2xl shadow-md transition-all duration-200 ease-in-out bg-card ${
          showNavbar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
      >
        <ul className="flex justify-between items-center list-none p-0 font-medium">
          {/* Logo */}
          <li>
            <Image
              src={Logo}
              alt="logo"
              height={90}
              width={120}
              className="h-14 w-35"
            />
          </li>

          {/* Dropdown Menu */}
          <li className="relative">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="bg-card">
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
                      d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/dashboard">
                    <span>Home</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/">
                    <span>Login</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/register">
                    <span>Sign up</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>

          {/* Theme Toggle Button (Placed Outside Dropdown) */}
        </ul>
      </nav>
    </div>
  );
}

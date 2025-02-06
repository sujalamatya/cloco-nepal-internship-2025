import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import { ThemeProvider } from "@/provider/ThemeProvider";

export const metadata: Metadata = {
  title: "Book Store",
  description: "Made by Cloco intern: Sujal Amatya ",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body className="antialiased ">
          <Navbar />
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}

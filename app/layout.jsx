
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "./AuthProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata = {
  title: "BlogSpace",
  description: "A Blog Website",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      ><AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">

            <Navbar />
            {children}
            <Footer />

          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

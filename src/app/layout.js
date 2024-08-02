import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/NavBar";
import Footer from "@/app/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jokes Microservice Application",
  description: "Welcome to the jokes application.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white bg-opacity-50 backdrop-blur-lg fixed top-0 inset-x-0 shadow-lg py-2 z-50">
      <div className="max-w-5xl mx-auto p-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition duration-300"
        >
          Jokes App
        </Link>
        <div className="flex space-x-4">
          <Link href="/get-joke" className={styles.navLink}>
            <span
              className={`${pathname === "/get-joke" ? styles.activeLink : ""}`}
            >
              Get Random Jokes
            </span>
          </Link>
          <Link href="/submit-joke" className={styles.navLink}>
            <span
              className={`${
                pathname === "/submit-joke" ? styles.activeLink : ""
              }`}
            >
              Submit Jokes
            </span>
          </Link>
          <Link href="/moderate-jokes" className={styles.navLink}>
            <span
              className={`${
                pathname === "/moderate-jokes" ? styles.activeLink : ""
              }`}
            >
              Moderate Jokes
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

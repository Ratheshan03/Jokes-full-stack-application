"use client";

export default function Footer() {
  return (
    <footer className="bg-white bg-opacity-30 backdrop-blur-lg py-4">
      <div className="max-w-5xl mx-auto text-center text-gray-900">
        <p className="mb-2">Created by Ratheshan Sathiyamoorthy</p>
        <p className="text-sm">
          © {new Date().getFullYear()} - All rights reserved. Privacy Policy
        </p>
        <div className="space-x-4 mt-2">
          <a
            href="https://github.com/Ratheshan03"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 hover:text-gray-700 hover:underline transition duration-300"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com/Ratheshan_03"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 hover:text-gray-700 hover:underline transition duration-300"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com/in/ratheshan-sathiyamoorthy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 hover:text-gray-700 hover:underline transition duration-300"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

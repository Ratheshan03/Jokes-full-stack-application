import Link from "next/link";
import {
  SparklesIcon,
  PencilIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-red-700">
      <div className="max-w-4xl w-full text-center bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-gray-100">
          Jokes Microservice Application
        </h1>
        <p className="text-lg mb-8 text-gray-300">
          Welcome to the jokes application. Choose an option below:
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            href="/get-joke"
            className="flex items-center space-x-2 bg-white bg-opacity-25 p-4 rounded-lg shadow-md hover:bg-white hover:bg-opacity-40 transition duration-300"
          >
            <SparklesIcon className="h-6 w-6 text-blue-900" />
            <span className="text-blue-900">Get a Random Joke</span>
          </Link>
          <Link
            href="/submit-joke"
            className="flex items-center space-x-2 bg-white bg-opacity-25 p-4 rounded-lg shadow-md hover:bg-white hover:bg-opacity-40 transition duration-300"
          >
            <PencilIcon className="h-6 w-6 text-blue-900" />
            <span className="text-blue-900">Submit a Joke</span>
          </Link>
          <Link
            href="/moderate-jokes"
            className="flex items-center space-x-2 bg-white bg-opacity-25 p-4 rounded-lg shadow-md hover:bg-white hover:bg-opacity-40 transition duration-300"
          >
            <ShieldCheckIcon className="h-6 w-6 text-blue-900" />
            <span className="text-blue-900">Moderate Jokes</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

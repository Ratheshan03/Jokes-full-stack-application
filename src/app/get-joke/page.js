"use client";

import { useState, useEffect } from "react";
import { AdjustmentsIcon } from "@heroicons/react/24/outline";
import styles from "./get-joke.module.css";

export default function GetJoke() {
  const [joke, setJoke] = useState("");
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch("http://localhost:3000/jokes/types");
        const data = await response.json();
        setTypes(data);
      } catch (error) {
        console.error("Error fetching joke types:", error);
      }
    };
    fetchTypes();
  }, []);

  const fetchJoke = async (type) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/jokes/random?type=${type}`
      );
      const data = await response.text();
      setJoke(data);
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJoke("Failed to fetch joke");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Get a Random Joke</h1>
        <div className="mb-6">
          <p className={`text-lg mb-2 ${styles.label}`}>
            {/* Fallback to a generic icon or remove if issues persist */}
            {AdjustmentsIcon ? (
              <AdjustmentsIcon className="h-6 w-6 text-gray-400 mr-2" />
            ) : (
              <span className="h-6 w-6 text-gray-400 mr-2">🔄</span>
            )}
            Select the joke type from the categories:
          </p>
          <select
            id="jokeType"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className={styles.select}
          >
            <option value="">-- Select a Type --</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => fetchJoke(selectedType)}
          className={styles.button}
          disabled={loading}
        >
          {loading ? <div className={styles.loadingSpinner}></div> : "Get Joke"}
        </button>

        {joke && (
          <div className={styles.jokeContainer}>
            <p className="text-lg text-gray-100">{joke}</p>
          </div>
        )}
      </div>
    </main>
  );
}

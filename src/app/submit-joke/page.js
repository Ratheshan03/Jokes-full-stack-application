"use client";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./submit-joke.module.css";

export default function SubmitJoke() {
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [types, setTypes] = useState([
    "General",
    "Programming",
    "Knock-Knock",
    "Pun",
    "Tech",
    "Science",
    "Animal",
    "Math",
    "History",
    "Sports",
    "Entertainment",
  ]);
  const [loading, setLoading] = useState(false);
  const [randomJoke, setRandomJoke] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/jokes/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, content }),
      });
      const data = await response.json();
      toast.success("Joke submitted successfully!");
      setContent(""); // Clear the form after submission
      setType(""); // Reset the type selection
    } catch (error) {
      console.error("Error submitting joke:", error);
      toast.error("Failed to submit joke.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomJoke = async () => {
    console.log("API KEY -> ", process.env.NEXT_PUBLIC_API_NINJAS_KEY);
    try {
      const response = await fetch("https://api.api-ninjas.com/v1/jokes", {
        headers: {
          "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJAS_KEY,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      console.log(JSON.stringify(data));

      if (data.length > 0) {
        setRandomJoke(data[0].joke);
      } else {
        toast.error("No jokes found.");
      }
    } catch (error) {
      console.error("Error fetching random joke:", error);
      toast.error("Failed to fetch a random joke.");
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Submit a New Joke</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="jokeType" className={styles.label}>
              Select Joke Type:
            </label>
            <select
              id="jokeType"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={styles.select}
            >
              <option value="">-- Select a Type --</option>
              {types.map((jokeType) => (
                <option key={jokeType} value={jokeType}>
                  {jokeType}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="jokeContent" className={styles.label}>
              Joke Content:
            </label>
            <textarea
              id="jokeContent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your joke here..."
              rows="4"
              className={styles.textarea}
              required
            />
          </div>
          <button
            type="submit"
            className={`${styles.button} ${loading ? styles.loading : ""}`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Joke"}
          </button>
        </form>

        {/* New Section for Random Joke Generator */}
        <div className={styles.randomJokeContainer}>
          <h2>Need some inspiration? Try a random joke!</h2>
          <button onClick={fetchRandomJoke} className={styles.randomJokeButton}>
            Get Random Joke
          </button>
          {randomJoke && (
            <div className={styles.randomJoke}>
              <p>{randomJoke}</p>
              <button
                onClick={() => setContent(randomJoke)}
                className={styles.useJokeButton}
              >
                Use This Joke
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000} // Close after 3 seconds
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </main>
  );
}

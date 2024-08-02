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
    "Math",
    "History",
    "Sports",
    "Entertainment",
  ]);
  const [loading, setLoading] = useState(false);

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

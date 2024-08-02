"use client";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./moderate-jokes.module.css";
import ConfirmationModal from "@/app/components/confirmationModal/confirmationModel";

// Dummy data for joke types
const jokeTypes = [
  "Programming",
  "General",
  "Tech",
  "Science",
  "Math",
  "Animal",
  "Pun",
  "History",
  "Medical",
  "Other",
];

export default function ModerateJokes() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [jokes, setJokes] = useState([]);
  const [editingJoke, setEditingJoke] = useState(null);
  const [newType, setNewType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [selectedJokeId, setSelectedJokeId] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3002/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.accessToken) {
        setToken(data.accessToken);
        fetchJokes(data.accessToken);
      } else {
        toast.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      toast.error("Error during authentication");
    } finally {
      setLoading(false);
    }
  };

  const fetchJokes = async (token) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3002/api/jokes", {
        headers: { "x-access-token": token },
      });
      const data = await response.json();
      setJokes(data);
    } catch (error) {
      console.error("Error fetching jokes:", error);
      toast.error("Error fetching jokes");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (joke) => {
    setEditingJoke(joke);
  };

  const handleReject = async (id) => {
    setConfirmAction(() => () => rejectJoke(id));
    setSelectedJokeId(id);
    setShowModal(true);
  };

  const rejectJoke = async (id) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3002/api/jokes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({ jokeId: id }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete joke: ${response.statusText}`);
      }

      setJokes(jokes.filter((joke) => joke._id !== id));
      toast.success("Joke rejected successfully");
    } catch (error) {
      console.error("Error rejecting joke:", error.message);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
    setShowModal(false);
  };

  const handleUpdate = async (id) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3002/api/jokes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          jokeId: id,
          content: editingJoke.content,
          type: editingJoke.type || newType,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update joke");
      }

      setJokes((prev) =>
        prev.map((joke) =>
          joke._id === id ? { ...joke, ...editingJoke } : joke
        )
      );
      setEditingJoke(null);
      toast.success("Joke updated successfully");
    } catch (error) {
      console.error("Error updating joke:", error);
      toast.error("Failed to update joke");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (id) => {
    setConfirmAction(() => () => submitJoke(id));
    setSelectedJokeId(id);
    setShowModal(true);
  };

  const submitJoke = async (id) => {
    const jokeToSubmit = jokes.find((joke) => joke._id === id);

    if (!jokeToSubmit) {
      console.error("No joke to submit");
      toast.error("No joke to submit");
      setShowModal(false);
      return;
    }

    setLoading(true);
    try {
      await fetch("http://localhost:3002/api/jokes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          joke: jokeToSubmit.content,
          type: jokeToSubmit.type,
        }),
      });

      await fetch("http://localhost:3002/api/jokes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({ jokeId: id }),
      });

      setJokes(jokes.filter((joke) => joke._id !== id));
      toast.success("Joke submitted successfully");
    } catch (error) {
      console.error("Error submitting joke:", error);
      toast.error("Failed to submit joke");
    } finally {
      setLoading(false);
    }
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingJoke((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Moderate Jokes</h1>

        {!token ? (
          <form onSubmit={handleAuth} className={styles.authForm}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className={styles.input}
              required
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className={styles.input}
              required
            />
            <button
              type="submit"
              className={styles.authButton}
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Authenticate"}
            </button>
          </form>
        ) : (
          <>
            {loading && <p className={styles.loading}>Loading...</p>}
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr className={styles.tableHeader}>
                    <th className={styles.tableCell}>Joke</th>
                    <th className={styles.tableCell}>Type</th>
                    <th className={styles.tableCell}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jokes.map((joke) => (
                    <tr key={joke._id}>
                      <td className={styles.tableCell}>{joke.content}</td>
                      <td className={styles.tableCell}>{joke.type}</td>
                      <td className={styles.tableCell}>
                        <button
                          onClick={() => handleEdit(joke)}
                          className={styles.editButton}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleReject(joke._id)}
                          className={styles.rejectButton}
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleSubmit(joke._id)}
                          className={styles.submitButton}
                        >
                          Submit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {editingJoke && (
              <div className={styles.editContainer}>
                <h2 className={styles.editTitle}>Edit Joke</h2>
                <textarea
                  name="content"
                  value={editingJoke.content}
                  onChange={handleChange}
                  rows="4"
                  className={styles.textarea}
                />
                <select
                  name="type"
                  value={editingJoke.type || newType}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="">-- Select a Type --</option>
                  {jokeTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleUpdate(editingJoke._id)}
                  className={styles.updateButton}
                >
                  Update Joke
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <ToastContainer />
      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to proceed?"
          onConfirm={confirmAction}
          onCancel={() => setShowModal(false)}
        />
      )}
    </main>
  );
}

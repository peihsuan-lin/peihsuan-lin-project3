import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [allData, setAllData] = useState([]);
  const [newUpdate, setNewUpdate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchAllData();
  }, []);

  async function fetchAllData() {
    try {
      const response = await axios.get("/api/home");
      setAllData(response.data.updates);
    } catch (error) {
      console.error("Error fetching all data:", error);
    }
  }

  async function handleSubmitUpdate() {
    if (!newUpdate.trim()) {
      setErrorMessage("Update cannot be empty");
      return;
    }

    try {
      await axios.post(
        "/api/home",
        { content: newUpdate },
        { withCredentials: true }
      );
      setNewUpdate("");
      fetchAllData();
    } catch (error) {
      console.error("Error creating update:", error);
      setErrorMessage("Failed to create update");
    }
  }

  function renderUpdates() {
    return allData.map((update, index) => (
      <div
        key={index}
        style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}
      >
        <h3>{update.username}</h3>
        <p>{update.content}</p>
        <small>{new Date(update.timestamp).toLocaleString()}</small>
      </div>
    ));
  }

  return (
    <div>
      <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}>
        <h2>Create a New Update</h2>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <textarea
          value={newUpdate}
          onChange={(e) => setNewUpdate(e.target.value)}
          placeholder="What's on your mind?"
          style={{ width: "100%", height: "100px", marginBottom: "10px" }}
        />
        <button onClick={handleSubmitUpdate} style={{ padding: "10px 20px", cursor: "pointer" }}>
          Post Update
        </button>
      </div>
      <h1>All Users' Status Updates</h1>
      {allData.length === 0 ? (
        <div>Loading...</div>
      ) : (
        renderUpdates()
      )}
    </div>
  );
}

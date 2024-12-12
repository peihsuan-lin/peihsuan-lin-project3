import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../style/Home.css';

export default function Home() {
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
      setErrorMessage("");
      fetchAllData();
    } catch (error) {
      console.error("Error creating update:", error);
      setErrorMessage("Failed to create update");
    }
  }

  function renderUpdates() {
    return allData.map((update, index) => (
      <div key={index} className="update-card">
        <h3>
          <Link 
            to={`/user/${update.username}`}
            className="username-link"
          >
            {update.username}
          </Link>
        </h3>
        <p>{update.content}</p>
        <small className="update-timestamp">
          {new Date(update.timestamp).toLocaleString()}
        </small>
      </div>
    ));
  }

  return (
    <div className="home-container">
      <div className="new-update-section">
        <h2>Create a New Update</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <textarea
          value={newUpdate}
          onChange={(e) => setNewUpdate(e.target.value)}
          placeholder="What's on your mind?"
          className="update-textarea"
        />
        <button onClick={handleSubmitUpdate} className="post-button">
          Post Update
        </button>
      </div>
      <div className="updates-section">
        <h1>All Status Updates</h1>
        {allData.length === 0 ? (
          <div className="loading-message">Loading...</div>
        ) : (
          renderUpdates()
        )}
      </div>
    </div>
  );
}
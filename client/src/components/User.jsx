import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import StatusUpdate from "./StatusUpdate";
import "../style/UserPage.css";

export default function User() {
  const { username } = useParams();
  const [updates, setUpdates] = useState([]);
  const [userInfo, setUserInfo] = useState({ createdAt: "" });
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    fetchUserUpdates();
  }, [username]);

  const fetchUserUpdates = async () => {
    try {
      const response = await axios.get(`/api/user/${username}`);
      setUpdates(response.data.userUpdates);
      setUserInfo({ createdAt: response.data.createdAt });
      setIsOwnProfile(response.data.isOwnProfile);
    } catch (error) {
      console.error("Error fetching updates:", error);
    }
  };

  const handleEdit = async (updateId, newContent) => {
    try {
      await axios.put(`/api/user/${username}/update/${updateId}`, {
        content: newContent,
      });
      fetchUserUpdates();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="user-page-container">
      <h1 className="page-title">
        {username}'s Status Updates
      </h1>
      
      <div className="date">
        User joined: {new Date(userInfo.createdAt).toLocaleDateString("en-US")}
      </div>

      {updates.length === 0 ? (
        <div className="no-updates">
          No updates found.
        </div>
      ) : (
        <div className="updates-list">
          {updates.map((update) => (
            <StatusUpdate
              key={update._id}
              update={update}
              isOwnProfile={isOwnProfile}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
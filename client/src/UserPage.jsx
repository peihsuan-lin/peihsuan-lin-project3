import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


export default function UserPage() {
    const { username } = useParams();
    const [updatesState, setUpdatesState] = useState([]);

    useEffect(() => {
        async function fetchUserUpdates() {
            try {
                const response = await axios.get(`/api/user/${username}`);
                setUpdatesState(response.data.userUpdates);
            } catch (error) {
                console.error(error.response ? error.response.data : error.message);
            }
        }
        
        fetchUserUpdates();
    }, [username]);

    return (
        <div>
          <h1>{username}'s Status Updates</h1>
          {updatesState.length === 0 ? (
            <div>No updates found.</div>
          ) : (
            updatesState.map((update, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "20px",
                  border: "1px solid #ccc",
                  padding: "10px",
                }}
              >
                <p>{update.content}</p>
                <small>{new Date(update.timestamp).toLocaleString()}</small>
              </div>
            ))
          )}
        </div>
      );
    }
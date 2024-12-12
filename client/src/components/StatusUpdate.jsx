import { useState } from "react";
import "../style/UserPage.css";

const StatusUpdate = ({ update, isOwnProfile, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(update.content);
  
  const handleSaveEdit = async () => {
    try {
      await onEdit(update._id, editContent);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving edit:", error);
    }
  };

  return (
    <div className="status-update">
      {isEditing ? (
        <div className="edit-form">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="edit-textarea"
          />
          <div className="action-buttons">
            <button
              onClick={handleSaveEdit}
              className="button primary-button"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditContent(update.content);
              }}
              className="button secondary-button"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="update-content">{update.content}</p>
          <div className="update-meta">
            <small className="timestamp">
              {new Date(update.timestamp).toLocaleString()}
            </small>
            {isOwnProfile && (
              <div className="action-buttons">
                <button
                  onClick={() => setIsEditing(true)}
                  className="edit-button"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StatusUpdate;
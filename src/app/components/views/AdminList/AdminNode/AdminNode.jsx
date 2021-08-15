import React from "react";
import "./UserNode.css";

const AdminNode = function AdminNode({
  id,
  email,
  username,
  handleRemoveAdmin,
}) {
  return (
    <div className="admin-node">
      <div className="admin-node-content-container">
        <div className="admin-node-content">
          <div className="admin-node-info-container">
            <div className="admin-node-username-container">
              <p className="admin-node-username">{email}</p>
            </div>
            <div className="admin-node-email-container">
              <p className="admin-node-email">{username}</p>
            </div>
          </div>
          <div className="admin-node-remove-admin-button-container">
            <button
              className="admin-node-remove-admin-button"
              onClick={(e) => handleRemoveAdmin(id)}
            >
              Remove Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNode;

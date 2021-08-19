import React from "react";
import "./UserNode.css";

const UserNode = function UserNode({ id, email, username, handleMakeAdmin }) {
  return (
    <div className="user-node">
      <div className="user-node-content-container">
        <div className="user-node-content">
          <div className="user-node-info-container">
            <div className="user-node-username-container">
              <p className="user-node-username">@{username}</p>
            </div>
            <div className="user-node-email-container">
              <p className="user-node-email">{email}</p>
            </div>
          </div>
          <div className="user-node-remove-admin-button-container">
            <button
              className="user-node-remove-admin-button"
              onClick={(e) => handleMakeAdmin(id)}
            >
              Make Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNode;

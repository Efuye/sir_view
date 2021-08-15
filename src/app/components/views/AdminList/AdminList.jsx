import "./AdminList.css";
import { useEffect, useState } from "react";
import UserNode from "../UserList/UserNode/UserNode";
import { getAdmins, removeAdmin } from "../../../api/interface/Admin";

const AdminList = function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [querying, setQuerying] = useState(false);

  async function handleGetAdmins() {
    const result = await getAdmins();
    if (result) setAdmins(result);
  }

  useEffect(() => {
    setQuerying(true);
    void handleGetAdmins();
  }, []);

  async function handleRemoveAdmin(id) {
    const result = await removeAdmin(id);
    if (result) setAdmins(admins.filter((admin) => admin.id !== id));
  }

  return (
    <div className="admin-list">
      <div className="admin-list-content-container">
        <div className="admin-list-content">
          {admins.length ? (
            <div className="admin-list-list-container">
              <div className="admin-list-list">
                {admins.map((admin) => (
                  <div className="admin-node-container">
                    <UserNode
                      id={admin.id}
                      email={admin.email}
                      username={admin.username}
                      handleMakeAdmin={handleRemoveAdmin}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : querying ? (
            <div className="admin-list-spinner-container-wrapper">
              <div className="admin-list-spinner-container">
                <div className="spinner" />
              </div>
            </div>
          ) : (
            <div className="admin-list-list-content-disclaimer-container">
              <span className="admin-list-list-content-disclaimer">
                No registered admins.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminList;

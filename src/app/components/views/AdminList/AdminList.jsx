import "./AdminList.css";
import { useEffect, useState } from "react";
import UserNode from "../UserList/UserNode/UserNode";
import { getAdmins, removeAdmin } from "../../../api/interface/Admin";
import AdminNode from "./AdminNode/AdminNode";

const AdminList = function AdminList({ adminsState, usersState }) {
  const [admins, setAdmins] = adminsState;
  const [users, setUsers] = usersState;
  const [querying, setQuerying] = useState(false);

  useEffect(() => {
    setQuerying(true);
    void handleGetAdmins();
  }, []);

  async function handleGetAdmins() {
    setQuerying(true);
    const result = await getAdmins();
    if (result) setAdmins(result.data);
    setQuerying(false);
  }

  async function handleRemoveAdmin(id) {
    const result = await removeAdmin(id);
    if (result) {
      const admin = admins.filter((admin) => admin.id === id)[0];
      setAdmins(admins.filter((admin) => admin.id !== id));

      admin.role = "ADMIN";
      setUsers([...users, admin]);
    }
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
                    <AdminNode
                      id={admin.id}
                      email={admin.email}
                      username={admin.username}
                      handleRemoveAdmin={handleRemoveAdmin}
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

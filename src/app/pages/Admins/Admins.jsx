import "./Admins.css";
import AdminList from "../../components/views/AdminList/AdminList";
import UserList from "../../components/views/UserList/UserList";
import { useState } from "react";

const Admins = function Admins() {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);

  return (
    <div className="admin-page">
      <div className="admin-page-content-container">
        <div className="admin-page-content">
          <div className="admin-page-user-list-container">
            <UserList
              usersState={[users, setUsers]}
              adminsState={[admins, setAdmins]}
              className="admin-page-user-list"
            />
          </div>
          <div className="admin-page-admin-list-container">
            <AdminList
              adminsState={[admins, setAdmins]}
              usersState={[users, setUsers]}
              className="admin-page-admin-list"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admins;

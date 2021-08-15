import "./Admins.css";
import AdminList from "../../components/views/AdminList/AdminList";
import UserList from "../../components/views/UserList/UserList";

const Admins = function Admins() {
  return (
    <div className="admin-page">
      <div className="admin-page-content-container">
        <div className="admin-page-content">
          <div className="admin-page-user-list-container">
            <UserList className="admin-page-user-list" />
          </div>
          <div className="admin-page-admin-list-container">
            <AdminList className="admin-page-admin-list" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admins;

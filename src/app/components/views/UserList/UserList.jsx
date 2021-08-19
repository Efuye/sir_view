import "./UserList.css";
import { useEffect, useState } from "react";
import { getUsers } from "../../../api/interface/User";
import UserNode from "./UserNode/UserNode";
import { verifyAdmin } from "../../../api/interface/Admin";

const UserList = function UserList({ usersState, adminsState }) {
  const [users, setUsers] = usersState;
  const [admins, setAdmins] = adminsState;
  const [queryingUsers, setQueryingUsers] = useState(true);
  const [userSearchInput, setUserSearchInput] = useState("");
  const [dateInput, setDateInput] = useState(
    new Date(new Date() - 2.628e9).toISOString().split("T")[0]
  );

  useEffect(() => {
    setQueryingUsers(true);
    void handleUserSearch();
  }, []);

  async function handleUserSearch() {
    setQueryingUsers(true);
    const result = await getUsers({ searchString: userSearchInput });
    if (result) setUsers(result.data);
    setQueryingUsers(false);
  }

  function handleUserSearchInput(e) {
    setUserSearchInput(e.target.value);
    void handleUserSearch();
  }

  function handleDateInput(e) {
    setDateInput(e.target.value);
    void handleUserSearch();
  }

  async function handleMakeAdmin(id) {
    const result = await verifyAdmin(id);
    if (result) {
      const user = users.filter((user) => user.id === id)[0];
      setUsers(users.filter((user) => user.id !== id));

      user.role = "ADMIN";
      setAdmins([...admins, user]);
    }
  }

  return (
    <div className="user-list">
      <div className="user-list-content-container">
        <div className="user-list-content">
          <div className="user-list-search-controllers-container">
            <div className="user-list-search-controllers">
              <div className="user-list-search-input-container">
                <input
                  className="user-list-search-input"
                  type="search"
                  placeholder="Search.."
                  value={userSearchInput}
                  onChange={(e) => handleUserSearchInput(e)}
                />
              </div>
              <div className="user-list-date-input-container">
                <input
                  className="user-list-date-input"
                  type="date"
                  value={dateInput}
                  onChange={(e) => handleDateInput(e)}
                />
              </div>
            </div>
          </div>
          {users.length ? (
            <div className="user-list-list-container">
              <div className="user-list-list">
                {users.map((user) => (
                  <div className="user-list-node-container">
                    <UserNode
                      id={user.id}
                      email={user.email}
                      username={user.username}
                      handleMakeAdmin={handleMakeAdmin}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : queryingUsers ? (
            <div className="user-list-spinner-container-wrapper">
              <div className="user-list-spinner-container">
                <div className="spinner" />
              </div>
            </div>
          ) : (
            <div className="user-list-list-content-disclaimer-container">
              <span className="user-list-list-content-disclaimer">
                No registered users.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;

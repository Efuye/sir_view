import "./LogList.css";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { getLogs } from "../../../api/interface/Log";
import { ReactComponent as LogsIcon } from "../../../../assets/logs.svg";
import SearchableDropdown from "../common/SearchableDropdown/SearchableDropdown.jsx";
import LogNode from "./LogNode/LogNode";
import { getUsers } from "../../../api/interface/User";

const LogList = function LogList() {
  const [querying, setQuerying] = useState(true);
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userSearchInput, setUserSearchInput] = useState("");
  const [expandedUserSearchDropdown, setExpandedUserSearchDropdown] =
    useState(false);
  const [logsSearchInput, setLogsSearchInput] = useState("");
  const [dateInput, setDateInput] = useState(new Date().toISOString());

  useEffect(() => {
    void fetchLogs();
    console.log(selectedUserId);
  }, [selectedUserId, dateInput, logsSearchInput]);

  async function fetchLogs() {
    setQuerying(true);

    const result = await getLogs({
      id: selectedUserId,
      createdAt: dateInput,
      searchString: logsSearchInput,
    });

    if (result.data && result.data.length) setLogs(result.data);
    else if (userSearchInput || logsSearchInput) setLogs([]);

    setQuerying(false);
  }

  async function fetchUsers() {
    const result = await getUsers({ searchString: userSearchInput, all: true });

    if (result.data && result.data.length) setUsers([...result.data]);
    else setUsers([]);

    return result.data;
  }

  async function handleUserSearchChange(e) {
    setUserSearchInput(e.target.value);
    return await fetchUsers();
  }

  async function handleUserSearchDropdown() {
    return await fetchUsers();
  }

  async function handleLogsSearchChange(e) {
    setLogsSearchInput(e.target.value);
  }

  function handleDateChange(e) {
    setDateInput(e.target.value);
  }

  function renderNoLogsView() {
    return (
      <>
        <div className="empty-log-list-container">
          {!querying ? (
            <div className="empty-log-list">
              <span>No</span>
              <div className="logs-image-container">
                <LogsIcon className="logs-image" alt="logs" />
              </div>
              <span>found.</span>
            </div>
          ) : (
            <div className="log-list-spinner-container">
              <div className="spinner" />
            </div>
          )}
        </div>
      </>
    );
  }

  function renderLogsView() {
    return (
      <>
        <div className="logs-list-content-container">
          <div className="logs-list-content">
            {logs.map((log) => (
              <div key={log.id} className="log-node-container">
                <LogNode
                  tag={log.tag}
                  ip={log.ip}
                  username={log.blame?.username ?? "Unknown"}
                  createdAt={log.createdAt}
                  method={log.method}
                  route={log.route}
                  useragent={log.useragent}
                  statusCode={log.statusCode}
                  responseTime={log.responseTime}
                  email={log.blame?.email ?? "Unknown"}
                  howManyPerMonth={log.blame?.howManyPerMonth ?? 0}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="log-list">
      <div className="logs-list-fetch-controllers-container">
        <div className="logs-list-fetch-controllers">
          <div className="user-search-input-container">
            <SearchableDropdown
              className="user-search-input"
              value={userSearchInput}
              placeholder="All users"
              searchHandler={handleUserSearchChange}
              expandHandler={handleUserSearchDropdown}
              pluralItemName="users"
              items={users}
              expandedDropDown={[
                expandedUserSearchDropdown,
                setExpandedUserSearchDropdown,
              ]}
            >
              {users.map((user) => (
                <div
                  key={user.id}
                  className="dropdown-search-user-node"
                  onClick={(e) => {
                    setSelectedUserId(user.id);
                    setExpandedUserSearchDropdown(!expandedUserSearchDropdown);
                  }}
                  tabIndex={0}
                >
                  <p className="dropdown-search-user-info-username">
                    @{user.username}
                  </p>
                  <p className="dropdown-search-user-info-email">
                    {user.email}
                  </p>
                </div>
              ))}
            </SearchableDropdown>
          </div>
          <div className="log-search-date-input-container">
            <input
              className="log-search-date-input"
              value={dateInput.split("T")[0]}
              onChange={(e) => handleDateChange(e)}
              type="date"
            />
          </div>
          <div className="log-search-input-container">
            <input
              className="log-search-input"
              type="search"
              placeholder="Search logs.."
              value={logsSearchInput}
              onChange={handleLogsSearchChange}
            />
          </div>
        </div>
      </div>
      {logs.length <= 0 ? renderNoLogsView() : renderLogsView()}
    </div>
  );
};

export default LogList;

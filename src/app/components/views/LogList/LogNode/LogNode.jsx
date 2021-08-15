import "./LogNode.css";
import { useRef, useState } from "react";

const LogNode = function LogNode({
  tag,
  ip,
  username,
  createdAt,
  method,
  route,
  statusCode,
  useragent,
  responseTime,
  email,
  howManyPerMonth,
}) {
  const [showUserInfo, setShowUserInfo] = useState(false);

  return (
    <div className="log-node">
      <div className="log-node-content-container">
        <div className="log-node-content">
          <div className={`log-info-cell log-tag ${tag.toLowerCase()}`}>
            <span>{tag}</span>
          </div>
          {/*<div className="log-info-cell log-ip">*/}
          {/*  <span>{ip}</span>*/}
          {/*</div>*/}
          <div
            className={`log-info-cell log-username`}
            tabIndex={0}
            onClick={(e) => setShowUserInfo(true)}
            onBlur={(e) => {
              setShowUserInfo(false);
            }}
            onfocusin={(e) => setShowUserInfo(true)}
          >
            {showUserInfo ? (
              <div
                className="log-user-info"
                onClick={(e) => {
                  e.preventDefault();
                  setShowUserInfo(true);
                  console.log("hi");
                }}
              >
                <p className="log-user-info-email">{email}</p>
                <p className="log-user-info-stat">{`${howManyPerMonth} monthly uploads`}</p>
              </div>
            ) : null}
            <span>@{username}</span>
          </div>
          <div className={`log-info-cell log-created-at`}>
            <span>{createdAt}</span>
          </div>
          <div className={`log-info-cell log-method ${method.toLowerCase()}`}>
            <span>{method}</span>
          </div>
          <div className={`log-info-cell log-route`}>
            <span>{route}</span>
          </div>
          <div
            className={`log-info-cell log-status-code ${
              statusCode >= 400
                ? "error-color"
                : statusCode < 300 && statusCode > 200
                ? "info-color"
                : "success-color"
            }`}
          >
            <span>{statusCode}</span>
          </div>
          {/*<div className="log-info-cell log-useragent">*/}
          {/*  <span>{useragent}</span>*/}
          {/*</div>*/}
          <div className={`log-info-cell log-response-time`}>
            <span>{responseTime} ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogNode;

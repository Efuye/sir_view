import { useHistory, useLocation } from "react-router";
import "./TopBar.css";
import { signout } from "../../../api/interface/Access";
import ProfileContext from "../../../data/contexts/ProfileContext";
import { useContext, useEffect, useState } from "react";

const navigablePathNames = ["/generator", "/logs", "/admins"];

const TopBar = function TopBar() {
  const history = useHistory();
  const location = useLocation();
  const { profile, setProfile } = useContext(ProfileContext);
  const [path, setPath] = useState(location.pathname);

  useEffect(() => {
    setPath(location.pathname);
  }, []);

  async function handleSignout() {
    const result = await signout();
    if (result) {
      setProfile(null);
      history.push("/signin");
    }
  }

  async function handleSignin() {
    history.push("/signin");
  }

  async function handleSignup() {
    history.push("/signup");
  }

  function handleNavigation(e, newPath) {
    setPath(newPath);
    history.push(newPath);
  }

  function handleHomeNavigation() {
    const url = profile ? "/generator" : "/";
    setPath(url);
    history.push(url);
  }

  function underlineTopBar() {
    return (
      navigablePathNames.includes(location.pathname) &&
      profile &&
      profile.role !== "USER"
    );
  }

  function renderSiteNavigation() {
    if (navigablePathNames.includes(location.pathname)) {
      if (profile && (profile.role === "ADMIN" || profile.role === "OWNER"))
        return (
          <>
            <div
              className={`to-generator-navigator site-navigation-item ${
                path === `/generator` ? "active" : ""
              }`}
              onClick={(e) => handleNavigation(e, `/generator`)}
            >
              <span>Generator</span>
            </div>
            <div
              className={`to-logs-navigator site-navigation-item ${
                path === `/logs` ? "active" : ""
              }`}
              onClick={(e) => handleNavigation(e, `/logs`)}
            >
              <span>Logs</span>
            </div>
            {profile.role === "OWNER" ? (
              <div
                className={`to-admins-navigator site-navigation-item ${
                  path === `/admins` ? "active" : ""
                }`}
                onClick={(e) => handleNavigation(e, `/admins`)}
              >
                <span>Admins</span>
              </div>
            ) : null}
          </>
        );

      return null;
    }

    return null;
  }

  return (
    <div className={`top-bar ${underlineTopBar() ? "underlined" : ""}`}>
      <div
        className="site-disclaimer"
        onClick={(e) => handleHomeNavigation()}
        style={{
          textAlign: `${
            location.pathname === "/signup" || location.pathname === "/signin"
              ? "center"
              : "start"
          }`,
        }}
      >
        SIR
      </div>
      {location.pathname !== "/signup" && location.pathname !== "/signin" ? (
        <>
          <div className="site-navigation">{renderSiteNavigation()}</div>
          <div className="profile-control">
            {location.pathname === "/" ? (
              <>
                <button
                  className="profile-control-button"
                  onClick={async (event) => handleSignin()}
                >
                  Sign in
                </button>
                {` / `}
                <button
                  className="profile-control-button"
                  onClick={async (event) => handleSignup()}
                >
                  Sign up
                </button>
              </>
            ) : navigablePathNames.includes(location.pathname) ? (
              <button
                className="profile-control-button"
                onClick={async (event) => handleSignout()}
              >
                Sign out
              </button>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default TopBar;

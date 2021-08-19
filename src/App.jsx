import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import TopBar from "./app/components/views/TopBar/TopBar";
import Landing from "./app/pages/Landing/Landing";
import SignUp from "./app/pages/SignUp/SignUp";
import SignIn from "./app/pages/SignIn/SignIn";
import Generator from "./app/pages/Generator/Generator";
import Logs from "./app/pages/Logs/Logs";
import PageNotFound from "./app/pages/PageNotFound/PageNotFound";
import ProfileContext from "./app/data/contexts/ProfileContext";
import Admins from "./app/pages/Admins/Admins";
import { instance } from "./app/api/config";

function App() {
  const [profile, setProfile] = useState(null);
  const [signedIn, setSignedIn] = useState();

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    const idToken = window.localStorage.getItem("idToken");
    if (user) setProfile(user);
    if (idToken) instance.defaults.headers.common["Authorization"] = idToken;
    setSignedIn(user && idToken);
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      <div className="App">
        <Router>
          <TopBar />
          <div className="body-content">
            <Switch>
              <Route
                path="/"
                exact={true}
                render={() =>
                  signedIn ? (
                    <Redirect to="/generator" />
                  ) : (
                    <Route path="/" component={Landing} />
                  )
                }
              />
              <Route
                path="/signup"
                exact={true}
                render={() =>
                  signedIn ? (
                    <Redirect to="/generator" />
                  ) : (
                    <Route path="/signup" component={SignUp} />
                  )
                }
              />
              <Route
                path="/signin"
                exact={true}
                render={() =>
                  signedIn ? (
                    <Redirect to="/generator" />
                  ) : (
                    <Route path="/" component={SignIn} />
                  )
                }
              />
              <Route path="/generator" component={Generator} />
              <Route path="/logs" component={Logs} />
              <Route path="/admins" component={Admins} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    </ProfileContext.Provider>
  );
}

export default App;

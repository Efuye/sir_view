import React, { useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
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

function App() {
  const [profile, setProfile] = useState(null);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      <div className="App">
        <Router>
          <TopBar />
          <div className="body-content">
            <Switch>
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
              <Route path="/generator" component={Generator} />
              <Route path="/logs" component={Logs} />
              <Route path="/admins" component={Admins} />
              <Route path="/" exact={true} component={Landing} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    </ProfileContext.Provider>
  );
}

export default App;

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";
import validateAccessInput from "../../../../utils";
import { signin, signup } from "../../../api/interface/Access";
import { useHistory } from "react-router";
import ProfileContext from "../../../data/contexts/ProfileContext";

const SignIn = function SignIn() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { profile, setProfile } = useContext(ProfileContext);
  const history = useHistory();

  async function handleOnSubmit(e) {
    e.preventDefault();

    const validInput = validateAccessInput({ identifier, password });
    if (!validInput) return;

    const result = await signin({ identifier, password });
    if (result) {
      setProfile(result);
      history.push("/generator");
    }
  }

  return (
    <form className="sign-in" onSubmit={(e) => handleOnSubmit(e)}>
      <p className="access-form-disclaimer">Login</p>
      <input
        className="access-form-input"
        type="text"
        name="identifier"
        id="identifier-input"
        placeholder="Username or email"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />
      <br />
      <input
        className="access-form-input"
        type="password"
        name="password"
        id="password-input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input
        className="access-form-submit"
        type="submit"
        value="Sign in"
        id="access-submit-button"
      />
      <Link to="/signup">
        <p className="access-form-switch-link">{`I don't have an account.`}</p>
      </Link>
    </form>
  );
};

export default SignIn;

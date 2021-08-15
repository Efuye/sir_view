import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./SignUp.css";
import validateAccessInput from "../../../../utils";
import { signup } from "../../../api/interface/Access";
import ProfileContext from "../../../data/contexts/ProfileContext";

const SignUp = function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { profile, setProfile } = useContext(ProfileContext);
  const history = useHistory();

  async function handleOnSubmit(e) {
    e.preventDefault();

    const validInput = validateAccessInput({ email, username, password });
    if (!validInput) return;

    const result = await signup({ username, email, password });
    if (result) {
      setProfile(result);
      history.push("/generator");
    }
  }

  return (
    <form
      className="sign-up"
      onSubmit={(e) => {
        void handleOnSubmit(e);
      }}
    >
      <p className="access-form-disclaimer">Register</p>
      <input
        className="access-form-input"
        type="text"
        name="username"
        id="username-input"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        className="access-form-input"
        type="email"
        name="email"
        id="email-input"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        className="access-form-input"
        type="password"
        name="password"
        id="password-input"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input
        className="access-form-submit"
        type="submit"
        value="Sign up"
        id="access-submit-button"
      />
      <Link to="/signin">
        <p className="access-form-switch-link">I have an account.</p>
      </Link>
    </form>
  );
};

export default SignUp;

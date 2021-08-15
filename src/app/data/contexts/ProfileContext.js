import { createContext } from "react";

const ProfileContext = createContext({
  currentProfile: {},
  setCurrentProfile: () => {},
});

export default ProfileContext;

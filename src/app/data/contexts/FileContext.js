import { createContext } from "react";

const FileContext = createContext({
  selectedFile: {},
  setSelectedFile: () => {},
});

export default FileContext;

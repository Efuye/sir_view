import { useRef, useContext, useState } from "react";
import "./UploadBox.css";
import FileContext from "../../../data/contexts/FileContext";
import { isEmptyObject } from "../../../../utils";
import parsePath from "path-parse";
import FileIcon from "../../../../assets/file.svg";

const UploadBox = function UploadBox() {
  const { selectedFile, setSelectedFile } = useContext(FileContext);
  const [animateBorder, setAnimateBorder] = useState(false);

  function handleOnDrop(e) {
    e.preventDefault();
    setAnimateBorder(false);
    const files = e.dataTransfer.files;
    if (files?.length) {
      console.log(files[0]);
      setSelectedFile(files[0]);
    }
  }

  function handleOnDragOver(e) {
    e.preventDefault();
    setAnimateBorder(true);
  }

  function handleOnDragEnter(e) {
    e.preventDefault();
    setAnimateBorder(true);
  }

  function handleOnDragLeave(e) {
    e.preventDefault();
    setAnimateBorder(false);
  }

  function handleOnUpload(e) {
    setSelectedFile(e.target.files[0]);
  }

  function handleOnClear(e) {
    setSelectedFile({});
  }

  function getProperFileName(filename) {
    const { name, ext } = parsePath(selectedFile.name);
    const limitSize = 25;

    const splitName = name.split("");
    let lastChars = "";

    const properName = name
      .split("")
      .map((char, index) => {
        if (index <= limitSize) return char;
        if (index > splitName.length - 3) lastChars = `${lastChars}${char}`;
      })
      .join("");

    if (name.split("").length <= limitSize) return filename;
    else return `${properName}...${lastChars}${ext}`;
  }

  return (
    <div className="upload-box">
      <div
        className={`drop-container ${
          animateBorder ? "drop-container-border" : ""
        }`}
        onDragOver={handleOnDragOver}
        onDragEnter={handleOnDragEnter}
        onDragLeave={handleOnDragLeave}
        onDrop={(e) => handleOnDrop(e)}
      >
        <div className="drop-message">
          <div className="upload-icon" />
          <input
            type="file"
            name="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => {
              handleOnUpload(e);
            }}
          />
          {`Drag and drop a file here or click `}
          <label className="upload-button" htmlFor="file">
            upload
          </label>
          .
        </div>
      </div>
      {selectedFile ? (
        <div className="file-container-wrapper">
          <span className="file-container">
            <div className="file-icon-container">
              <img src={FileIcon} alt="file icon" />
            </div>
            <div className="file-name-container">
              <p className="file-name">
                {getProperFileName(selectedFile.name)}
              </p>
            </div>
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default UploadBox;

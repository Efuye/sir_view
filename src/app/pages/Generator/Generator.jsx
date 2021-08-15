import React, { useState } from "react";
import "./Generator.css";
import UploadBox from "../../components/views/UploadBox/UploadBox";
import SizeSelector from "../../components/views/SizeSelector/SizeSelector";
import FileContext from "../../data/contexts/FileContext";

const Generator = function Generator() {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <FileContext.Provider value={{ selectedFile, setSelectedFile }}>
      <div className="generator-page">
        <div className="generator-content">
          <div className="upload-box-container">
            <UploadBox />
          </div>
          <div className="size-selector-container">
            <SizeSelector />
          </div>
        </div>
      </div>
    </FileContext.Provider>
  );
};

export default Generator;

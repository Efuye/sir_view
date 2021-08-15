import React, { useRef, useState, useContext } from "react";
import "./SizeSelector.css";
import { upload } from "../../../api/interface/Upload";
import pathParse from "path-parse";
import FileContext from "../../../data/contexts/FileContext";
import ProfileContext from "../../../data/contexts/ProfileContext";

const sizeList = [
  { index: 0, checked: true, height: 36, width: 36, name: "LDPI" },
  { index: 1, checked: true, height: 48, width: 48, name: "MDPI" },
  { index: 2, checked: true, height: 72, width: 72, name: "HDPI" },
  { index: 3, checked: true, height: 96, width: 96, name: "XHDPI" },
  { index: 4, checked: true, height: 144, width: 144, name: "XXHDPI" },
  { index: 5, checked: true, height: 192, width: 192, name: "XXHLDPI" },
  {
    index: 6,
    checked: true,
    height: 512,
    width: 512,
    name: "Google Play Store",
  },
];

const SizeSelector = function SizeSelector() {
  const [sizes, setSizes] = useState(getCheckedSizes(sizeList));
  const { selectedFile, setSelectedFile } = useContext(FileContext);
  const { profile, setCurrentProfile } = useContext(ProfileContext);
  const ref = useRef(null);

  function download(element, data, name) {
    const blob = new Blob([data], {
      type: "application/zip",
    });
    element.href = URL.createObjectURL(blob);
    element.download = name;
    element.click();
  }

  function getCheckedSizes(list) {
    return list
      .filter((value) => value.checked)
      .map((value) => [value.width, value.height]);
  }

  async function handleFile() {
    if (sizes.length && selectedFile) {
      const result = await upload(selectedFile, sizes);

      if (result.data) {
        download(
          ref.current,
          result.data,
          `${pathParse(selectedFile.name).name}.zip`
        );
      }
    }
  }

  function handleSelect(e, index) {
    sizeList.forEach((value, i) => {
      if (value.index === index) sizeList[i].checked = e.target.checked;
    });

    console.log(profile);

    setSizes(getCheckedSizes(sizeList));
  }

  return (
    <>
      <p className="sizes-disclaimer">Sizes</p>
      <form
        className="size-selector"
        onSubmit={(e) => {
          e.preventDefault();
          if (selectedFile) void handleFile();
        }}
      >
        <a ref={ref} href="#" style={{ display: "none" }} />
        {sizeList.map((value) => (
          <label className="size-node" key={value.index}>
            <input
              type="checkbox"
              defaultChecked={value.checked}
              name={`${value.index}`}
              onInput={(e) => handleSelect(e, value.index)}
            />
            <span className="checkmark" />
            {`${value.width + `x` + value.height} (${value.name})`}
          </label>
        ))}
        <div className="generator-submit-button-container">
          <input
            type="submit"
            value="Generate"
            id="generator-submit-button"
            className={`${!selectedFile ? "disabled" : ""}`}
          />
        </div>
      </form>
    </>
  );
};

export default SizeSelector;

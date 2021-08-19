import { useState } from "react";
import "./SearchableDropdown.css";
import { ReactComponent as ExpandMoreIcon } from "../../../../../assets/expand_more.svg";

const SearchableDropdown = function SearchableDropdown({
  pluralItemName = "items",
  placeholder = "Search..",
  value = "",
  searchHandler,
  children,
  expandedDropDown,
  items,
}) {
  const [dropdownExpanded, setDropdownExpanded] = expandedDropDown;
  const [searchInput, setSearchInput] = useState(value);
  const [queryingItems, setQueryingItems] = useState(false);

  function handleFocusShift(e) {
    setDropdownExpanded(false);
    setQueryingItems(false);
  }

  async function handleSearch(e) {
    setSearchInput(e.target.value);

    if (searchInput && searchHandler) {
      setDropdownExpanded(true);
      setQueryingItems(true);

      await searchHandler(e);
      setQueryingItems(false);
    }
  }

  async function handleDropdownExpand(e) {
    setDropdownExpanded(!dropdownExpanded);

    if (dropdownExpanded && searchHandler) {
      setQueryingItems(true);

      await searchHandler(e);
      setQueryingItems(false);
    }
  }

  // function renderUserNode(username, email) {
  //   return (
  //     <>
  //       <div className="log-search-user-node-container">
  //         <div className="log-search-user-node">
  //           <p className="log-search-user-node-username">@{username}</p>
  //           <p className="log-search-user-node-email">{email}</p>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }

  return (
    <div className="searchable-dropdown" onBlur={(e) => handleFocusShift(e)}>
      <div className="searchable-dropdown-input-container">
        <div className="searchable-dropdown-text-input-container">
          <input
            className="searchable-dropdown-text-input"
            type="search"
            placeholder={placeholder}
            onChange={(e) => void handleSearch(e)}
            value={searchInput}
          />
        </div>
        <div className="searchable-dropdown-dropdown-button-container">
          <button
            className="searchable-dropdown-dropdown-button"
            onClick={(e) => void handleDropdownExpand(e)}
          >
            <ExpandMoreIcon />
          </button>
        </div>
      </div>
      <div
        style={{ display: dropdownExpanded ? "flex" : "none" }}
        className={`searchable-dropdown-dropdown-container ${
          items.length || dropdownExpanded ? "expanded" : ""
        }`}
      >
        <div
          style={{ display: dropdownExpanded ? "grid" : "none" }}
          className="searchable-dropdown-dropdown"
        >
          {children[1] && children[1].length ? (
            children
          ) : dropdownExpanded && queryingItems ? (
            <div className="searchable-dropdown-spinner-container">
              <div className="spinner" />
            </div>
          ) : dropdownExpanded ? (
            <span>{`No ${pluralItemName}`}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SearchableDropdown;

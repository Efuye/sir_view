import { useState } from "react";
import "./SearchableDropdown.css";
import { ReactComponent as ExpandMoreIcon } from "../../../../../assets/expand_more.svg";

const SearchableDropdown = function SearchableDropdown({
  pluralItemName = "items",
  placeholder = "Search..",
  value = "",
  searchHandler,
  expandHandler,
}) {
  const [dropdownExpanded, setDropdownExpanded] = useState(false);
  const [searchInput, setSearchInput] = useState(value);
  const [queryingItems, setQueryingItems] = useState(false);
  const [items, setItems] = useState([]);

  function handleFocusShift(e) {
    setDropdownExpanded(false);
    setQueryingItems(false);
  }

  async function handleSearch(e) {
    setSearchInput(e.target.value);

    if (searchInput && searchHandler) {
      setDropdownExpanded(true);
      setQueryingItems(true);

      const result = await searchHandler(e);
      setQueryingItems(false);

      if (result) setItems(result);
    }
  }

  async function handleDropdownExpand(e) {
    setDropdownExpanded(!dropdownExpanded);

    if (dropdownExpanded && (expandHandler || searchHandler)) {
      setQueryingItems(true);

      const result = (await expandHandler(e)) || (await searchHandler(e));
      setQueryingItems(false);

      if (result) setItems(result);
    }
  }

  function renderUserNode(username, email) {
    return (
      <>
        <div className="log-search-user-node-container">
          <div className="log-search-user-node">
            <p className="log-search-user-node-username">@{username}</p>
            <p className="log-search-user-node-email">{email}</p>
          </div>
        </div>
      </>
    );
  }

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
        className={`searchable-dropdown-dropdown-container ${
          items.length || dropdownExpanded ? "expanded" : ""
        }`}
      >
        <div className="searchable-dropdown-dropdown">
          {items.length ? (
            this.props.children
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

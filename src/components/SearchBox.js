import React, { useState } from 'react';
import './SearchBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function SearchBox(props) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');

  function handleButtonClick() {
    setShowSearch(true);
  }

  function handleSearchTextChange(event) {
    setSearchText(event.target.value);
  }

  function handleSearchKeyPress(event) {
    if (event.key === 'Enter') {
      performSearch();
    }
  }

  function performSearch() {
    props.onSearch(searchText);
  }

  return (
    <div className="search-container">
      {showSearch ? (
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleSearchTextChange}
          onKeyDown={handleSearchKeyPress}
          autoFocus
        />
      ) : null}
      <button className="search-button" onClick={handleButtonClick}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}

export default SearchBox;

import React, { useState } from 'react';
import './SearchBox.css';

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
    <div className="search-box">
      {showSearch ? (
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleSearchTextChange}
          onKeyPress={handleSearchKeyPress}
          autoFocus
        />
      ) : null}
      <button className="search-button" onClick={handleButtonClick}>
        Search
      </button>
    </div>
  );
}

export default SearchBox;

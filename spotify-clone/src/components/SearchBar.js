import React from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-container">
      <input
        type="search"
        placeholder="Search Song, Artist"
        onChange={onSearch}
        className="search-input"
      />
      <i className="fas fa-search search-icon" />
    </div>
  );
};

export default SearchBar;
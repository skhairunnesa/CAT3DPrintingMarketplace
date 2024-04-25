// components/SearchBar.js
import React, { useState } from 'react';
import '../styles/SearchBar.css'; // Import the CSS file for styling

function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <form className="SearchBar" onSubmit={handleSubmit}>
      <input type="text" value={query} onChange={handleChange} placeholder="Search..." />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;

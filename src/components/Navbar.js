import React, { useState } from "react";
import "../css/Navbar.css";

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <header className="header">
      <h1 className="logo">CraveHub</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search over 1,000,000 recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default Navbar;

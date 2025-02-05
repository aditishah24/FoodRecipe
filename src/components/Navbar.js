// import React, { useState } from "react";
// import "../css/Navbar.css";

// const Navbar = ({ onSearch }) => {
//   const [query, setQuery] = useState("");

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (query.trim()) {
//       onSearch(query);
//     }
//   };

//   return (
//     <header className="header">
//       <h1 className="logo">CraveHub</h1>
//       <form onSubmit={handleSearch}>
//         <input
//           type="text"
//           placeholder="Search over 1,000,000 recipes..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <button type="submit">Search</button>
//       </form>
//     </header>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBookmark, faEdit } from "@fortawesome/free-solid-svg-icons";
import AddRecipe from "./AddRecipe"; // Import the AddRecipe modal
import "../css/Navbar.css";

const Navbar = ({ onSearch, onAddRecipe, query, setQuery }) => {
  const [showAddRecipe, setShowAddRecipe] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <header className="header">
      <div className="logo-container">
        <h1 className="logo">
          <span className="logo-highlight">Crave</span>Hub
        </h1>
      </div>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Search over 1,000,000 recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" type="submit">
          <FontAwesomeIcon icon={faSearch} /> Search
        </button>
      </form>
      <div className="nav-actions">
        <button className="action-button" onClick={() => setShowAddRecipe(true)}>
          <FontAwesomeIcon icon={faEdit} /> Add Recipe
        </button>
        <button className="action-button">
          <FontAwesomeIcon icon={faBookmark} /> Bookmarks
        </button>
      </div>

      {/* Add Recipe Modal */}
      {showAddRecipe && <AddRecipe onClose={() => setShowAddRecipe(false)} onAddRecipe={onAddRecipe} />}
    </header>
  );
};

export default Navbar;

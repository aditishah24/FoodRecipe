import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBookmark, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import AddRecipe from "./AddRecipe";
import "../css/Navbar.css";

const Navbar = ({ onSearch, onAddRecipe, query, setQuery, bookmarks }) => {
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleRecipeAdded = (recipe) => {
    onAddRecipe(recipe); // Send new recipe to App.js
    setShowAddRecipe(false); // Close the modal
  };

  return (
    <header className="header">
      <div className="logo-container">
        <h1 className="logo">
          <span className="logo-highlight">Crave</span>Hub
        </h1>
      </div>
      <form className="search-form" onSubmit={handleSearch}>
        <input type="text" className="search-input" placeholder="Search over 1,000,000 recipes..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <button className="search-button" type="submit">
          <FontAwesomeIcon icon={faSearch} /> Search
        </button>
      </form>
      <div className="nav-actions">
        <button className="action-button" onClick={() => setShowAddRecipe(true)}>
          <FontAwesomeIcon icon={faEdit} /> Add Recipe
        </button>
        <button className="action-button" onClick={() => setShowBookmarks(!showBookmarks)}>
          <FontAwesomeIcon icon={faBookmark} /> Bookmarks ({bookmarks.length})
        </button>
      </div>

      {showBookmarks && (
        <div className="bookmarks-dropdown">
          <div className="bookmarks-header">
            <h3>Bookmarked Recipes</h3>
            <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={() => setShowBookmarks(false)} />
          </div>
          {bookmarks.length === 0 ? (
            <p className="no-bookmarks">No bookmarks yet!</p>
          ) : (
            bookmarks.map((recipe) => (
              <div key={recipe.id} className="bookmark-item">
                <img src={recipe.image_url} alt={recipe.title} className="bookmark-img" />
                <div className="bookmark-details">
                  <p className="bookmark-title">{recipe.title}</p>
                  <p className="bookmark-author">{recipe.publisher}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {showAddRecipe && <AddRecipe onClose={() => setShowAddRecipe(false)} onAddRecipe={handleRecipeAdded} />}
    </header>
  );
};

export default Navbar;


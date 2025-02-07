import React, { useState, useEffect } from "react";
import "../css/Sidebar.css";

const Sidebar = ({ recipes, onSelectRecipe, searchTerm = "" }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;
  
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm]);

  // Normalize search term
  const normalizedSearchTerm = searchTerm.toLowerCase();

  // Filter recipes based on search input
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(normalizedSearchTerm)
  );

  // Paginate recipes
  const startIndex = (currentPage - 1) * recipesPerPage;
  const paginatedRecipes = filteredRecipes.slice(startIndex, startIndex + recipesPerPage);

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  return (
    <aside className="sidebar">
      <div className="recipe-list">
        {paginatedRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="recipe-item"
            onClick={() => onSelectRecipe(recipe.id)}
          >
            <img src={recipe.image_url} alt={recipe.title} />
            <p>{recipe.title}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          {currentPage > 1 && <button onClick={() => setCurrentPage(currentPage - 1)}>←</button>}
          <span>Page {currentPage}</span>
          {currentPage < totalPages && <button onClick={() => setCurrentPage(currentPage + 1)}>→</button>}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;

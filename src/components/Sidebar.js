// import React from "react";
// import "../css/Sidebar.css";

// const Sidebar = ({ recipes, onSelectRecipe }) => {
//   return (
//     <aside className="sidebar">
//       {recipes.map((recipe) => (
//         <div key={recipe.id} className="recipe-item" onClick={() => onSelectRecipe(recipe.id)}>
//           <img src={recipe.image_url} alt={recipe.title} />
//           <p>{recipe.title}</p>
//         </div>
//       ))}
//     </aside>
//   );
// };

// export default Sidebar;


import React, { useState } from "react";
import "../css/Sidebar.css";

const Sidebar = ({ recipes, onSelectRecipe, searchTerm = "" }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;

  const normalizedSearchTerm = searchTerm ? searchTerm.toLowerCase() : "";

  // Filter recipes based on the search term
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(normalizedSearchTerm)
  );

  // Paginate recipes
  const startIndex = (currentPage - 1) * recipesPerPage;
  const paginatedRecipes = filteredRecipes.slice(
    startIndex,
    startIndex + recipesPerPage
  );

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
      {!searchTerm && totalPages > 1 && (
        <div className="pagination">
          {currentPage > 1 && (
            <button className="pagination-arrow" onClick={handlePrevPage}>
              ←
            </button>
          )}
          <span className="pagination-page">Page {currentPage}</span>
          {currentPage < totalPages && (
            <button className="pagination-arrow" onClick={handleNextPage}>
              →
            </button>
          )}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;

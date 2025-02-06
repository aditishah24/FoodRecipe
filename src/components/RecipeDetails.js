// import React from "react";
// import "../css/RecipeDetails.css";

// const RecipeDetails = ({ recipe }) => {
//   if (!recipe) {
//     return <div className="recipe-details">Select a recipe to see details</div>;
//   }

//   return (
//     <div className="recipe-details">
//       <img className="recipe-image" src={recipe.image_url} alt={recipe.title} />
//       <h2 className="recipe-title">{recipe.title}</h2>
      
//       <div className="recipe-info">
//         <span>⏳ {recipe.cooking_time} minutes</span>
//         <span>🍽 {recipe.servings} servings</span>
//       </div>

//       <h3>Recipe Ingredients</h3>
//       <ul className="recipe-ingredients">
//         {recipe.ingredients.map((ing, index) => (
//           <li key={index}>✔ {ing.quantity} {ing.unit} {ing.description}</li>
//         ))}
//       </ul>

//       <div className="instructions">
//         <h3>How to Cook It</h3>
//         <p>This recipe was carefully designed by <strong>{recipe.publisher}</strong>. Check out directions at their website.</p>
//         <a href={recipe.source_url} target="_blank" rel="noopener noreferrer" className="directions-btn">
//           Directions
//         </a>
//       </div>
//     </div>
//   );
// };

// export default RecipeDetails;


import React, { useState } from "react";
import "../css/RecipeDetails.css";
import { FiBookmark, FiPlus, FiMinus } from "react-icons/fi";

const RecipeDetails = ({ recipe, onBookmark, bookmarks }) => {
  const [servings, setServings] = useState(recipe ? recipe.servings : 1);

  if (!recipe) {
    return (
      <div className="recipe-details">
        <p className="placeholder-text">Select a recipe to see details</p>
      </div>
    );
  }

  const isBookmarked = bookmarks.some((r) => r.id === recipe.id);

  return (
    <div className="recipe-details">
      <div className="recipe-header">
        <img className="recipe-image" src={recipe.image_url} alt={recipe.title} />
        <h2 className="recipe-title">{recipe.title}</h2>
      </div>

      <div className="recipe-info">
        <span className="info-item">⏳ {recipe.cooking_time} minutes</span>
        <span className="info-item servings">
          🍽 Servings:
          <button className="adjust-btn" onClick={() => setServings(servings - 1)}>
            <FiMinus />
          </button>
          <span className="servings-value">{servings}</span>
          <button className="adjust-btn" onClick={() => setServings(servings + 1)}>
            <FiPlus />
          </button>
        </span>
        <button className={`bookmark-btn ${isBookmarked ? "bookmarked" : ""}`} onClick={() => onBookmark(recipe)}>
          <FiBookmark /> {isBookmarked ? "Bookmarked" : "Bookmark"}
        </button>
      </div>

      <div className="ingredients-section">
        <h3 className="section-title">Recipe Ingredients</h3>
        <div className="ingredients-grid">
          {recipe.ingredients.map((ing, index) => (
            <div key={index} className="ingredient-item">
              ✔ {ing.quantity * servings} {ing.unit} {ing.description}
            </div>
          ))}
        </div>
      </div>

      <div className="instructions-section">
        <h3 className="section-title">How to Cook It</h3>
        <p className="instructions-text">
          This recipe was carefully designed by <strong>{recipe.publisher}</strong>.
          Check out directions at their website.
        </p>
        <a href={recipe.source_url} target="_blank" rel="noopener noreferrer" className="directions-btn">
          Directions
        </a>
      </div>
    </div>
  );
};

export default RecipeDetails;

import React from "react";
import "../css/RecipeDetails.css";

const RecipeDetails = ({ recipe }) => {
  if (!recipe) {
    return <div className="recipe-details">Select a recipe to see details</div>;
  }

  return (
    <div className="recipe-details">
      <img className="recipe-image" src={recipe.image_url} alt={recipe.title} />
      <h2 className="recipe-title">{recipe.title}</h2>
      
      <div className="recipe-info">
        <span>⏳ {recipe.cooking_time} minutes</span>
        <span>🍽 {recipe.servings} servings</span>
      </div>

      <h3>Recipe Ingredients</h3>
      <ul className="recipe-ingredients">
        {recipe.ingredients.map((ing, index) => (
          <li key={index}>✔ {ing.quantity} {ing.unit} {ing.description}</li>
        ))}
      </ul>

      <div className="instructions">
        <h3>How to Cook It</h3>
        <p>This recipe was carefully designed by <strong>{recipe.publisher}</strong>. Check out directions at their website.</p>
        <a href={recipe.source_url} target="_blank" rel="noopener noreferrer" className="directions-btn">
          Directions
        </a>
      </div>
    </div>
  );
};

export default RecipeDetails;

import React from "react";
import "../css/RecipeCard.css";

const RecipeCard = ({ recipe, selectRecipe }) => {
  return (
    <div className="recipe-card" onClick={() => selectRecipe(recipe)}>
      <img src={recipe.image} alt={recipe.title} />
      <p>{recipe.title}</p>
    </div>
  );
};

export default RecipeCard;

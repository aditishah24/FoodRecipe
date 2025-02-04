import React from "react";
import "../css/Sidebar.css";

const Sidebar = ({ recipes, onSelectRecipe }) => {
  return (
    <aside className="sidebar">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-item" onClick={() => onSelectRecipe(recipe.id)}>
          <img src={recipe.image_url} alt={recipe.title} />
          <p>{recipe.title}</p>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;

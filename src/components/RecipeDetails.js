import React, { useState, useEffect } from "react";
import "../css/RecipeDetails.css";
import { FiBookmark, FiPlus, FiMinus } from "react-icons/fi";

const RecipeDetails = ({ recipe, onBookmark, bookmarks }) => {
  const [servings, setServings] = useState(recipe?.servings || 1);
  const [imgSrc, setImgSrc] = useState(
    recipe?.image_url || "/fallback-image.jpg"
  );

  useEffect(() => {
    if (recipe) {
      setServings(recipe.servings || 1);
      setImgSrc(recipe.image_url || "/fallback-image.jpg");
    }
  }, [recipe]);

  if (!recipe) {
    return (
      <div className="recipe-details">
        <p className="placeholder-text">Select a recipe to see details</p>
      </div>
    );
  }

  const isBookmarked = bookmarks.some((r) => r.id === recipe.id);

  const handleImageError = () => {
    console.error("Image failed to load:", imgSrc);
    setImgSrc("/fallback-image.jpg");
  };

  return (
    <div className="recipe-details">
      <div className="recipe-header">
        <img
          className="recipe-image"
          src={imgSrc}
          alt={recipe.title}
          onError={handleImageError}
        />
        <h2 className="recipe-title">{recipe.title}</h2>
      </div>

      <div className="recipe-info">
        <span className="info-item">
          ⏳ {recipe.cooking_time || "N/A"} minutes
        </span>
        <span className="info-item servings">
          🍽 Servings:
          <button
            className="adjust-btn"
            onClick={() => setServings((prev) => Math.max(1, prev - 1))}
            disabled={servings <= 1}
          >
            <FiMinus />
          </button>
          <span className="servings-value">{servings}</span>
          <button
            className="adjust-btn"
            onClick={() => setServings((prev) => prev + 1)}
          >
            <FiPlus />
          </button>
        </span>
        <button
          className={`bookmark-btn ${isBookmarked ? "bookmarked" : ""}`}
          onClick={() => onBookmark(recipe)}
        >
          <FiBookmark /> {isBookmarked ? "Bookmarked" : "Bookmark"}
        </button>
      </div>

      <div className="ingredients-section">
        <h3 className="section-title">Recipe Ingredients</h3>
        <div className="ingredients-grid">
          {recipe.ingredients && recipe.ingredients.length > 0 ? (
            recipe.ingredients.map((ing, index) => (
              <div key={index} className="ingredient-item">
                ✔ {ing.quantity ? ing.quantity * servings : ""} {ing.unit}{" "}
                {ing.description}
              </div>
            ))
          ) : (
            <p>No ingredients available.</p>
          )}
        </div>
      </div>

      <div className="instructions-section">
        <h3 className="section-title">How to Cook It</h3>
        <p className="instructions-text">
          This recipe was carefully designed by{" "}
          <strong>{recipe.publisher || "Unknown"}</strong>. Check out directions
          at their website.
        </p>
        {recipe.source_url && (
          <a
            href={recipe.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="directions-btn"
          >
            Directions
          </a>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;

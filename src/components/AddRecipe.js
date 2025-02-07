import React, { useState } from "react";
import "../css/AddRecipe.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faUpload } from "@fortawesome/free-solid-svg-icons";

const AddRecipe = ({ onClose, onAddRecipe }) => {
  const [recipe, setRecipe] = useState({
    title: "",
    url: "",
    imageUrl: "",
    publisher: "",
    prepTime: "",
    servings: "",
    ingredients: ["", "", "", "", "", ""], // 6 ingredients
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (index !== undefined) {
      setRecipe((prevRecipe) => {
        const newIngredients = [...prevRecipe.ingredients];
        newIngredients[index] = value;
        return { ...prevRecipe, ingredients: newIngredients };
      });
    } else {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!recipe.title || !recipe.url || !recipe.imageUrl || !recipe.publisher) {
      alert("Please fill in all required fields!");
      return;
    }

    // Format ingredients properly
    const formattedIngredients = recipe.ingredients.filter((ing) => ing.trim() !== "");

    const newRecipe = {
      ...recipe,
      image_url: recipe.imageUrl, // Ensure consistency with API response format
      ingredients: formattedIngredients,
    };

    onAddRecipe(newRecipe); // Pass new recipe to App.js
    onClose(); // Close modal after submission
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <form onSubmit={handleSubmit} className="recipe-form">
          <div className="form-grid">
            <div className="form-section">
              <h2 className="modal-title">RECIPE DATA</h2>
              <label>Title</label>
              <input type="text" name="title" value={recipe.title} onChange={handleChange} />

              <label>URL</label>
              <input type="url" name="url" value={recipe.url} onChange={handleChange} />

              <label>Image URL</label>
              <input type="url" name="imageUrl" value={recipe.imageUrl} onChange={handleChange} />

              <label>Publisher</label>
              <input type="text" name="publisher" value={recipe.publisher} onChange={handleChange} />

              <label>Prep time</label>
              <input type="number" name="prepTime" value={recipe.prepTime} onChange={handleChange} />

              <label>Servings</label>
              <input type="number" name="servings" value={recipe.servings} onChange={handleChange} />
            </div>

            <div className="form-section">
              <h2 className="modal-title">INGREDIENTS</h2>
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index}>
                  <label>Ingredient {index + 1}</label>
                  <input
                    type="text"
                    placeholder="Format: 'Quantity,Unit,Description'"
                    value={ingredient}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="upload-button">
            <FontAwesomeIcon icon={faUpload} /> UPLOAD
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;

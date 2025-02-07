import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import RecipeDetails from "./components/RecipeDetails";
import "./App.css";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [query, setQuery] = useState("");
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);

  // Load saved recipes from localStorage on app load
  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(storedRecipes);
  }, []);

  // Save recipes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  // Fetch recipes from API + include stored recipes
  const fetchRecipes = async (searchQuery) => {
    try {
      const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

      // Filter stored recipes that match search query
      const filteredStoredRecipes = storedRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Fetch from API
      const response = await axios.get(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchQuery}`
      );

      // Avoid duplicate recipes when merging
      const apiRecipes = response.data.data.recipes;
      const combinedRecipes = [...filteredStoredRecipes];

      apiRecipes.forEach(apiRecipe => {
        if (!storedRecipes.some(storedRecipe => storedRecipe.id === apiRecipe.id)) {
          combinedRecipes.push(apiRecipe);
        }
      });

      setRecipes(combinedRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // Fetch details of a selected recipe
  const fetchRecipeDetails = async (id) => {
    try {
      const response = await axios.get(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      setSelectedRecipe(response.data.data.recipe);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  // Handle adding a new recipe + store it properly
  const handleAddRecipe = (newRecipe) => {
    const formattedRecipe = {
      id: `custom-${Date.now()}`,
      title: newRecipe.title,
      source_url: newRecipe.url,
      image_url: newRecipe.imageUrl,
      publisher: newRecipe.publisher,
      cooking_time: newRecipe.prepTime,
      servings: newRecipe.servings,
      ingredients: newRecipe.ingredients.map((ing) => {
        const parts = ing.split(",");
        return { quantity: parts[0] || null, unit: parts[1] || "", description: parts[2] || "" };
      }),
    };

    // Check if recipe already exists
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    if (storedRecipes.some(recipe => recipe.title === formattedRecipe.title)) {
      console.warn("Recipe already exists, skipping duplicate storage.");
      return;
    }

    const updatedRecipes = [formattedRecipe, ...storedRecipes];
    setRecipes(updatedRecipes);
    setSelectedRecipe(formattedRecipe);

    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  // Handle bookmarking recipes
  const handleBookmark = (recipe) => {
    const updatedBookmarks = bookmarkedRecipes.some((r) => r.id === recipe.id)
      ? bookmarkedRecipes.filter((r) => r.id !== recipe.id)
      : [...bookmarkedRecipes, recipe];

    setBookmarkedRecipes(updatedBookmarks);
    localStorage.setItem("bookmarkedRecipes", JSON.stringify(updatedBookmarks));
  };

  return (
    <div className="app">
      <Header 
        onSearch={fetchRecipes} 
        setQuery={setQuery} 
        query={query} 
        bookmarks={bookmarkedRecipes} 
        onAddRecipe={handleAddRecipe} 
      />
      
      <div className="main-content">
        <Sidebar 
          recipes={recipes} 
          onSelectRecipe={fetchRecipeDetails} 
          searchTerm={query}
        />
        <RecipeDetails 
          recipe={selectedRecipe} 
          onBookmark={handleBookmark} 
          bookmarks={bookmarkedRecipes} 
        />
      </div>
    </div>
  );
};

export default App;

// import React, { useState } from "react";
// import axios from "axios";
// import Header from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import RecipeDetails from "./components/RecipeDetails";
// import "./App.css";

// const App = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [selectedRecipe, setSelectedRecipe] = useState(null);

//   const fetchRecipes = async (query) => {
//     try {
//       const response = await axios.get(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`);
//       setRecipes(response.data.data.recipes);
//     } catch (error) {
//       console.error("Error fetching recipes:", error);
//     }
//   };

//   const fetchRecipeDetails = async (id) => {
//     try {
//       const response = await axios.get(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
//       setSelectedRecipe(response.data.data.recipe);
//     } catch (error) {
//       console.error("Error fetching recipe details:", error);
//     }
//   };

//   return (
//     <div className="app">
//       <Header onSearch={fetchRecipes} />
//       <div className="main-content">
//         <Sidebar recipes={recipes} onSelectRecipe={fetchRecipeDetails} />
//         <RecipeDetails recipe={selectedRecipe} />
//       </div>
//     </div>
//   );
// };

// export default App;

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

  // Reset bookmarks to zero on app restart
  useEffect(() => {
    // Reset bookmarks to empty array when app restarts
    localStorage.setItem("bookmarkedRecipes", JSON.stringify([]));
    setBookmarkedRecipes([]); // Set state to an empty array
  }, []);

  // Function to fetch recipes
  const fetchRecipes = async (searchQuery) => {
    try {
      const response = await axios.get(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchQuery}`
      );
      setRecipes(response.data.data.recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // Function to fetch recipe details
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

  // Function to handle bookmarking
  const handleBookmark = (recipe) => {
    const updatedBookmarks = bookmarkedRecipes.some((r) => r.id === recipe.id)
      ? bookmarkedRecipes.filter((r) => r.id !== recipe.id) // Remove if already bookmarked
      : [...bookmarkedRecipes, recipe]; // Add if not bookmarked

    setBookmarkedRecipes(updatedBookmarks);
    localStorage.setItem("bookmarkedRecipes", JSON.stringify(updatedBookmarks)); // Save to localStorage
  };

  return (
    <div className="app">
      <Header 
        onSearch={fetchRecipes} 
        setQuery={setQuery} 
        query={query} 
        bookmarks={bookmarkedRecipes} 
      />
      
      <div className="main-content">
        <Sidebar 
          recipes={recipes} 
          onSelectRecipe={fetchRecipeDetails} 
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

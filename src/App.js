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

import React, { useState } from "react";
import axios from "axios";
import Header from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import RecipeDetails from "./components/RecipeDetails";
import "./App.css";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [query, setQuery] = useState("");

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

  return (
    <div className="app">
      <Header onSearch={fetchRecipes} setQuery={setQuery} query={query} />
      
      {/* Main Content Flexbox Container */}
      <div className="main-content">
        <Sidebar recipes={recipes} onSelectRecipe={fetchRecipeDetails} />
        <RecipeDetails recipe={selectedRecipe} />
      </div>
    </div>
  );
};

export default App;

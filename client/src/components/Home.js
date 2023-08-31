import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetUserId } from './hooks/useGetUserId';
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userId = useGetUserId();
  const navigate=useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/recipes/savedRecipes/ids/${userId}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userId]);

  const saveRecipe = async (recipeId) => {
    try {
      const response = await axios.put("http://localhost:4000/recipes", {
        recipeId,
        userId,
      });
      setSavedRecipes(response.data.savedRecipes);
      navigate('/saved-recipe')
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <>
      <h2>Recipes</h2>
      {
        recipes.map((recipe) => (
          <div className="card" style={{ width: "18rem", margin: "0.2rem auto" }} key={recipe._id}>
            <img src={recipe.imageUrl} className="card-img-top" alt={recipe.name} />
            <div className="card-body">
              <h5 className="card-title">{recipe.name}</h5>
              <p className="card-text"><strong>Ingredients:</strong>{recipe.ingredients}</p>
              <p className="card-text"><strong>Instructions:</strong>{recipe.instructions}</p>
              <p className="card-text"><strong>cookingTime</strong>{recipe.cookingTime}</p>
              <button onClick={() => saveRecipe(recipe._id)}>
              {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default Home;
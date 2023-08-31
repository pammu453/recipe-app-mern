import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useGetUserId} from '../components/hooks/useGetUserId';

const SaveRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const userId=useGetUserId();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/recipes/savedRecipes/${userId}`);
        setRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipes();
  }, [])

  return (
    <>
    <h2>Saved Recipes</h2>
    {
      recipes.map((recipe) => (
        <div className="card" style={{ width: "18rem", margin: "0.2rem auto" }} key={recipe._id}>
          <img src={recipe.imageUrl} className="card-img-top" alt={recipe.name} />
          <div className="card-body">
            <h5 className="card-title">{recipe.name}</h5>
            <p className="card-text"><strong>Ingredients:</strong>{recipe.ingredients}</p>
            <p className="card-text"><strong>Instructions:</strong>{recipe.instructions}</p>
            <p className="card-text"><strong>cookingTime</strong>{recipe.cookingTime}</p>
          </div>
        </div>
      ))
    }
  </>
  )
}

export default SaveRecipe;

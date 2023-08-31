import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateRecipe = () => {
  
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions:"",
    imageUrl: "",
    cookingTime: 0,
    userOwner: localStorage.getItem("userId")
  })

  const onchangeHandler=(event)=>{
    const {name,value}=event.target;
    setRecipe({...recipe,[name]:value})
  }

  const navigate=useNavigate();

  const onSubmitHandler=async(event)=>{
    event.preventDefault();
    try {
      axios.post("http://localhost:4000/recipes",recipe);
      alert("Recipe created succefully");
      navigate("/");
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="wrapper">
        <h1>Create Recipe</h1>
        <form onSubmit={onSubmitHandler}>
          <label>
            <p>Name</p>
            <input type="text" name="name" onChange={onchangeHandler}/>
          </label>
          <label>
            <p>ingredients</p>
            <input type="text" name="ingredients" onChange={onchangeHandler}/>
          </label>
          <label>
            <p>instructions</p>
            <textarea cols="30" rows="10" name="instructions" onChange={onchangeHandler}></textarea>
          </label> 
          <label>
            <p>imageUrl</p>
            <input type="text" name="imageUrl" onChange={onchangeHandler}/>
          </label>
          <label>
            <p>cookingTime(minutes)</p>
            <input type="number" name="cookingTime" onChange={onchangeHandler}/>
          </label>
          <div>
            <button type="submit">Create Recipe</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateRecipe;
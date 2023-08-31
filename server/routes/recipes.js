const express = require('express');
const RecipeModel = require('../models/Recipes.js');
const UserModel = require('../models/Users.js');

const recipeRouter = express.Router();

//READING ALL RECIPRES
recipeRouter.get("/", async (req, res) => {
    try {
        const response = await RecipeModel.find({});
        res.json(response);
    } catch (error) {
        res.json(error)
    }
})

//CREATING NEW RECIPES
recipeRouter.post("/", async (req, res) => {
    const recipe = new RecipeModel(req.body);
    try {
        const response = await recipe.save();
        res.json(response);
    } catch (error) {
        res.json(error)
    }
})

//SAVE RECIPE
recipeRouter.put("/", async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeId);
        const user = await UserModel.findById(req.body.userId);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({ savedRecipes: user.savedRecipes })
    } catch (error) {
        res.json(error)
    }
})

//GETTING THE ID'S OF SAVED RECIPES
recipeRouter.get("/savedRecipes/ids/:userId", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        res.json({ savedRecipes: user?.savedRecipes });
    } catch (error) {
        res.json(error);
    }
})

//GETTING THE ACTUAL SAVED RECIPES
recipeRouter.get("/savedRecipes/:userId", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes }
        });
        console.log(savedRecipes);
        res.json({ savedRecipes });
    } catch (error) {
        res.json(error)
    }
})

module.exports = { recipeRouter }
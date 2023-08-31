const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const { userRouter } = require('./routes/users.js');
const {recipeRouter}=require('./routes/recipes.js')

const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config();

app.use('/auth',userRouter);
app.use('/recipes',recipeRouter);

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Datacase connected succefully...')
    }).catch((error) => {
        console.log(`Error found :in ${error.message}`);
    })

app.listen(4000, () => {
    console.log("Server started...");
})
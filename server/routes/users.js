const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserModel=require('../models/Users.js');

const userRouter = express.Router();

//REGISTER
userRouter.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({username});
    
    if(user){
        return res.status(400).send("User already exist.!");
    }

    const hashedPassword=await bcrypt.hash(password,10);
    
    const newUser=new UserModel({username,password:hashedPassword});
    await newUser.save();
    
    res.json({message:"User Registerd succefully!"})
});

//LOGIN
userRouter.post('/login',async(req,res)=>{
    const { username, password } = req.body;
    const user = await UserModel.findOne({username});

    if(!user){
        return res.json({meassage:"User doesn't exist."})
    }
    
    const isPasswordValid= await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.json({meassage:"Username and password incorrect"});
    }

    const token=jwt.sign({id:user._id},process.env.SECRET);
    res.json({token,userId:user._id});
});

module.exports={userRouter}
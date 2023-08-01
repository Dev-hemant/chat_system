const asyncHandler = require("express-async-handler");
const userModel = require('../models/userModel');
const generateToken = require('../config/generateToken');
const User = require("../models/userModel");

const registerUser = asyncHandler(async(req, res) =>{
    const { name, email, password, pic } = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Plase Enter all Fields");
    }

    const userExits = await userModel.findOne({email})

    if(userExits){
        res.status(400);
        throw new Error("User Already exits");
    }

    const user = await userModel.create({
        name, email, password, pic
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }else {
        res.status(400);
        throw new Error("Failed to create the user");
    }
})

const authUser =  asyncHandler(async (req, res) => {
    const {email, password} =  req.body;

    const user = await userModel.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.json(data=[{
            _id : user._id,
            name: user.name,
            email : user.email,
            pic: user.pic,
            token: generateToken(user._id)

        }]);
    } else {
        res.json(data=[]);
    }
});

module.exports = {registerUser, authUser};
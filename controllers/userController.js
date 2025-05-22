const asyncHandler = require("express-async-handler")
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
require('dotenv').config();



// @desc add register
//@route GET /api/users/register
//@access public
const registerUser = asyncHandler( async (req, res)=>{
    const { username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const userAvailable = await User.findOne({ email });
    if(userAvailable){
         res.status(400);
        throw new Error("User already registered!");
    }

    //Hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword, bcrypt.getRounds(hashedPassword));
     
    
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    const mailer = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    const mailDetail = {
        from: process.env.EMAIL_USER,
        to: 'varsha.kodus@gmail.com',
        subject: 'Testing mail',
        text: 'Testing Gmail'
    };

    mailer.sendMail(mailDetail, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });


    if(user){
        res.status(201).json({_id: user.id, email: user.email})
    }else{
         res.status(400);
        throw new Error("User data is not valid");
    }

    // res.json({ message: "Register the user", data:user});
});


// @desc login user
//@route GET /api/users/login
//@access public
const loginUser = asyncHandler( async (req, res)=>{
    const { email, password} = req.body;

     if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const user = await User.findOne({ email });

    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.name,
                email: user.email,
                id: user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m"});
        res.status(200).json ({ accessToken });
    }else{
        res.status(401);
        throw new Error("email or password is not valid");
    }

    // res.json({ message: "Login user"});
});

// @desc current user
//@route GET /api/users/curent
//@access private
const currentUser = asyncHandler( async (req, res)=>{
    res.json(req.user);
    // res.json({ message: "Current user info"});
});


module.exports = { 
    registerUser,
    loginUser,
    currentUser
}
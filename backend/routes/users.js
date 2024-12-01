const express = require('express');
const model = require('../models/User');
const { validationResult } = require('express-validator');
const { compare } = require('bcrypt');
const router = express.Router();
const jwt = require("jsonwebtoken");

const ACCESS_SECRET = process.env.JWT_SECRET || "de0237d5173f85e17659b90392b18a448c7646e66c6d7f70694acbdb5505c1ee8b696379bc3c019ca8872aee733e2a2e03eabd3353a2ec763a7e390ebadcea23c82815ffe29973f4b02a5e307b3b419919639cb189be40d3a0ec493241a5affd79dabf1a49a348101b1737791b38da9b61523deeb1edd4950bc9fff3525dbf60c8ff49cd39c8d431d94a3f0411c30be4817020698256dadb212918296f230973f7c741afdafb8f1dec82de0f3fc84d608a13f1273613402ad9cc1d5ba930a3305e5ce0e3497bfa1fd23915efd107acbb4e717839d1c91944f18228d9b421107083a6c06a89cc5669300d3f2bcbbe08dd29cdea79752c2667ec68695bdd70ed7e";

// Sign up user
/*
{
  "username": "johndoe",
  "email": "johndoe@domain.com",
  "password": "password123"
} 
*/
//http://localhost:3000/user/signup
router.post('/signup', async (req, res) => {
    // Validate req.body
    if(!validationResult(req.body).isEmpty()){
        res.status(401).json({
            message: "Missing required information"
        });
        return
    }

    // Preform task
    try{ 
        const { username, email, password } = req.body;
        
        // Check if user exists
        if(await model.findOne({username: username})){
            res.status(401).json({
                message: "Username already exists"
            })
            return;
        };        

        // Create user
        let user = await new model({
            username: username,
            email: email,
            password: password,
            created_at: Date.now()
        });

        // Save & fetch new user
        await user.save();
        user = await model.findOne({username: username});

        const accessToken = jwt.sign(
            { id: user._id},
            ACCESS_SECRET
        )
        
        res.status(200).json({
            status: true,
            accessToken, 
            message: "User created",
        })
    } catch(e){
        res.status(500).send(e);
    }
});

// Login
/*
{
  "email": "johndoe@domain.com",
  "password": "password123"
}
*/
//http://localhost:3000/user/login
router.post("/login", async (req, res) => {
    // Validate req.body
    if(!validationResult(req.body).isEmpty()){
        res.status(400).json({
            status: false,
            message: "Missing required information"
        })
        return;
    }

    // Preform task
    try{
        const givenUser = req.body;

        // find user by username or email
        const foundUser = await model.findOne({
            $or: [{username: givenUser.username}, {email: givenUser.email}]
        });

        const validatePassword = await compare(givenUser.password, foundUser.password)
        if(!foundUser || !validatePassword){
            res.status(401).json({
                status: false,
                message: "Invalid username/password."
            });
            return;
        }

        const accessToken = jwt.sign(
            { id: foundUser._id},
            ACCESS_SECRET
        )
        
        res.status(200).json({
            status: true,
            accessToken, 
            message: "Login successful",
        })

    } catch(e) {
        console.log("Login error: ", e)
        res.status(500).send(e)
    }
});

module.exports = router;
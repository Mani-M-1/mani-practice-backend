const express = require('express');
const router = express.Router();


const User = require('../Models/User');


// post user
router.post('/signup', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});

        if (!user) {
            const createdUser = new User(req.body);
            await createdUser.save();

            res.status(200).json({message: "User signup successfully!", userDetails: createdUser})
        }
        else {
            res.status(404).json({message: "User already exists, please enter other username!"});
        }
    }
    catch(err) {
        res.status(500).json({message: "API Error occured while creating user!", err_desc: err.message});
    }
})

// login user
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});

        if (!user) {
            res.status(404).json({message: "User not found!"});
        }
        else {
            if (user.password === req.body.password) {
                res.status(200).json({message: "User signup successfully!", userDetails: user})
            }
            else {
                res.status(404).json({message: "Incorrect Password, please enter valid password!"});
            }
        }
    }
    catch(err) {
        res.status(500).json({message: "API Error occured while creating user!", err_desc: err.message});
    }
})


// get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({message: "Users fetched successfully!", users});
    }
    catch(err) {
        res.status(500).json({message: "API Error occured while fetching users from db!", err_desc: err.message});
    }
})

module.exports = router;
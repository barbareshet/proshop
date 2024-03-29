import asyncHandler from 'express-async-handler';
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//  @desc   Auth User & get token
//  @route  POST /api/users/login
//  @access public

const authUser = asyncHandler(async ( req, res ) => {
    const { email, password } = req.body

    // if you send res, you will get a header sent Error
    // res.send({email, password})


    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid Email / Password')
    }
})

//  @desc   Register new User
//  @route  POST /api/users
//  @access public

const registerUser = asyncHandler(async ( req, res ) => {
    const { name,  email, password } = req.body

    // if you send res, you will get a header sent Error
    // res.send({email, password})


    const userExists = await User.findOne({email})

    if (userExists){
        res.status(400)
        throw new Error('User already exists')
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if (user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//  @desc   get user profile
//  @route  GET /api/users/profile
//  @access private

const getUserProfile = asyncHandler(async ( req, res ) => {
   const user = await User.findById(req.user._id)

    if (user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

//  @desc   update user profile
//  @route  PUT /api/users/profile
//  @access private

const updateUserProfile = asyncHandler(async ( req, res ) => {
    const user = await User.findById(req.user._id)

    if (user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if ( req.body.password ){
            user.password = req.body.password || user.password;
        }
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

export {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile
}
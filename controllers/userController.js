const express = require('express')
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const { configDotenv } = require('dotenv')

configDotenv()



const register = async (req,res) => {
    try{
        const inputData = req.body
        if(Object.keys(inputData).length == 0) {
            return res.status(402).json({ message: 'Provide Details'})
        }
        const emailData = await User.findOne({ email: inputData.email})
        const mobileData = await User.findOne({ mobile_number: inputData.mobile_number})

        console.log(emailData)
        if(emailData || mobileData) {
            return res.status(402).json({ message: 'User already exists'})

        }
        const data = await User.create(inputData)
        return res.status(200).json({ message: 'User Registered successfully', data:data})

    } catch (err) {
        return res.status(400).json({message: 'Internal Server Error'})
    }
}

const login = async (req,res) => {
    try{
        const inputData = req.body
        if(Object.keys(inputData).length == 0) {
            return res.status(402).json({ message: 'Provide Details'})
        }
        const emailData = await User.findOne({ email: inputData.email})
        if(!emailData) {
            return res.status(402).json({ message: 'User Does not exists'})
        }

        if(inputData.password === emailData.password) {
            const createToken = jwt.sign({email: emailData.email, password:emailData.password}, process.env.SECRET_KEY, {expiresIn: '1h'})
            return res.status(200).json({ message: 'User Logged In successfully', token: createToken, data:emailData})
        } else {
            return res.status(403).json({ message: 'Wrong Credentials'})
        } 

    } catch (err) {
        return res.status(400).json({message: 'Internal Server Error'})
    }    

}

const updateUser = async (req,res) => {
    try {
    const id = req.params.id;
    const inputData = req.body;
    console.log(id)
    console.log('inputData',inputData)
    if(Object.keys(inputData).length == 0) {
        return res.status(402).json({ message: 'Provide Details'})
    }
    console.log('Hello')
    const updateUser = await User.findByIdAndUpdate(id, inputData)
    console.log('updateUser', updateUser)
    return res.status(200).json({ message: 'User Updated successfully', data:updateUser})

    } catch (err) {
        console.log(err)
        return res.status(400).json({message: 'Internal Server Error'})   
    }
}

const addDeliveryAddress = async (req,res) => {
    try {
        const inputData = req.body;
        console.log('req',req.params.id)
        if(Object.keys(inputData).length === 0) {
           return res.status(402).json({message:'Delivery Address cannot be empty'})
        }
        // const checkHouseNumber = User.findOne({})
        const findUser = User.findByIdAndUpdate(req.params.id, inputData)
        console.log('findUser',findUser)
        // const addDeliveryAddress = await User.create(inputData)
        return res.status(200).json({ success:true, message: 'User Updated successfully'})

    } catch (err) {
        console.log(err)
        return res.status(400).json({message: 'Internal Server Error'})   

    }

}

const addPaymentMethod = () => {

}

const removePaymentMethod = () => {

}

const addProductReview = () => {

}

const updateDeliveryAddress = () => {

}

const removeDeliveryAddress = () => {

}

const addToWishlist = () => {

}

const TrackOrder = () => {

}

const removeFromWishlist = () => {

}

const placeOrder = () => {

}

const cancelOrder = () => {

}



const addToCart = () => {

}

const removeFromCart = () => {

}

const deActivateUser = () => {

}

const deleteUser = () => {

}

const customerSupport = () => {

}

module.exports = {register, login, 
    updateUser, addDeliveryAddress, 
    addPaymentMethod, removePaymentMethod,addProductReview,
    updateDeliveryAddress,removeDeliveryAddress,
    addToWishlist, TrackOrder,removeFromWishlist
    ,placeOrder,cancelOrder,addToCart,
    removeFromCart, deActivateUser,
    deleteUser,customerSupport}
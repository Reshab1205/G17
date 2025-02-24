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
        const findUserAddAddress = await User.findByIdAndUpdate(req.params.id, {
            $push:{address: inputData}
        })
        console.log('findUser',findUserAddAddress)
        // const addDeliveryAddress = await User.create(inputData)
        return res.status(200).json({ success:true, message: 'User Address Updated successfully', data:findUserAddAddress})

    } catch (err) {
        console.log(err)
        return res.status(400).json({message: 'Internal Server Error'})   

    }

}

const addPaymentMethod = async (req,res) => {
    try {
        const { id } = req.params
        const inputData = req.body;
        if(!id) {
            return res.status(400).json({message: "User Id is required"})
        }
        if(Object.keys(inputData).length === 0) {
           return res.status(402).json({message:'Payment Details cannot be empty'})
        }
        const findUserAddPaymentMethod = await User.findByIdAndUpdate(req.params.id, {
            $push:{payment: inputData}
        })
        console.log('findUser',findUserAddPaymentMethod)
        return res.status(200).json({ success:true, message: 'User Payment Updated successfully', data:findUserAddPaymentMethod})

    } catch (err) {
        console.log(err)
        return res.status(400).json({message: 'Internal Server Error'})   

    }    

}

// const addPaymentMethod = async (req,res) => {
//     try {
//         const { id } = req.params
//         const inputData = req.body;
//         if(!id) {
//             return res.status(400).json({message: "User Id is required"})
//         }
//         if(Object.keys(inputData).length === 0) {
//            return res.status(402).json({message:'Payment Details cannot be empty'})
//         }
//         const validPaymentModes = ["UPI", "Credit_Card", "Debit_Card", "Cash"]
//         if(!validPaymentModes.includes(inputData.mode_of_payment)) {
//             return res.status(400).json({message: "Invalid mode of payment"})
//         }
//         if(["Credit_Card", "Debit_Card"].includes(inputData.mode_of_payment)) {
//             if(!inputData.card_details) {
//                 return res.status(400).json({message: "Card Details are required!"})   
//             }
//         }
//         const {Card_number, CVV, Expiry} = inputData.card_details
//         const user = await User.findById(id)
//         if(!user) {
//             return res.status(400).json({message: "User does not exists"})
//         }
//         const matchCard = user.payment.find(payment => payment.card_details && payment.card_details.Card_number === Card_number)
//         console.log(matchCard)
//         if(matchCard) {
//             return res.status(400).json({message: "Card Already Exists"})
//         }
        
//         const findUserAddPaymentMethod = await User.findByIdAndUpdate(req.params.id, {
//             $push:{payment: inputData}   
//         })
//         findUserAddPaymentMethod['payment'].push(inputData);
//         // console.log('findUser',findUserAddPaymentMethod)
//         return res.status(200).json({ success:true, message: 'User Payment Updated successfully', data:findUserAddPaymentMethod})

//     } catch (err) {
//         console.log(err)
//         return res.status(400).json({message: 'Internal Server Error'})   

//     }    

// }

const removePaymentMethod = async (req,res) => {
    try {
        const inputData = req.body;
        console.log('req',req.params.id)
        const findUser = await User.findById()
        
        const findPaymentTypeAndDelete = await User.findByIdAndUpdate(req.params.id, {
            $push:{payment: inputData}
        })
        console.log('findUser',findPaymentTypeAndDelete)
        return res.status(200).json({ success:true, message: 'User Payment Removed successfully', data:findPaymentTypeAndDelete})

    } catch (err) {
        console.log(err)
        return res.status(400).json({message: 'Internal Server Error'})   

    } 

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
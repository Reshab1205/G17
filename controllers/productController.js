const express = require('express')
const product = require('../models/productSchema')

const addProduct = async (req,res) => {
    try {
        const inputData = req.body
        // console.log(Object.keys(inputData).length)
        if(Object.keys(inputData).length === 0) {
            return res.status(400).json({ message: 'Provide Details'}) 
        }
        const findProductByProductCode = await product.findOne({ product_code: inputData.product_code})
        console.log(findProductByProductCode)
        if(findProductByProductCode) {
            return res.status(401).json({ message: 'Provide Already exists'}) 
        }
        const createProduct = await product.create(inputData)
        console.log(createProduct)
        return res.status(200).json({ message: 'Product Added', data:createProduct})
    } catch (err) {
        return res.status(400).json({ message: 'Internal Server Error', err:err})
    }


}


module.exports = {addProduct}
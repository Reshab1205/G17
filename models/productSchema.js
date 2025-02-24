const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    feedback_description:{type:String},
    ratings:{type:Number},
    product_image:[{type:String}]
}, {timestamps:true})

const productSchema = new mongoose.Schema({

    product_code: {type:String, unique:true, required:true},
    product_name: {type:String},
    product_mrp: {type:Number},
    product_discount: {type:Number},
    product_discount_price: {type:Number},
    product_brand_name: {type:String},
    product_sellers: [{type:mongoose.Schema.Types.ObjectId, ref:'seller'}],
    product_category: {type:mongoose.Schema.Types.ObjectId, ref:'category'},
    product_description: {type:String},
    product_mfg_date: {type:Date},
    product_expiry_date: {type:Date},
    product_quantity: {type:Number},
    product_size: [{type:String}],
    product_image: [{type:String}],
    product_color: [{type:String}],
    product_material: [{type:String}],
    product_weight: [{type:String}],
    product_ratings: [feedbackSchema],
    product_warranty: {type:String},
    product_return_type: {type:String, enum:["Exchange", "Return", "No Return"]},
    product_return_policy: {type:String},
    product_buy_limit: {type:Number},
    product_expected_delivery_date:{type:Date},
    product_terms_conditions: {type:String},
    product_emi_availability: {type:Boolean, default:"false"},

}, {timestamps:true})

module.exports = mongoose.model('product', productSchema)
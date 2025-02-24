const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    house_no:{type:String},
    address_line_1: { type:String},
    address_line_2: { type:String},
    street: { type:String},
    landmark: { type:String},
    city: { type:String},
    state: { type:String},
    country: { type:String, default: "Bharat"},
    pincode: { type:Number}

}, {timestamps:true})

const paymentSchema = new mongoose.Schema({
    mode_of_payment:{type:String, enum:["UPI", "Credit_Card", "Debit_Card", "Cash"]},
    card_details: {
        Card_number: {type:Number},
        CVV:{type:Number},
        Expiry:{type:String},
        Name_on_card: {type:String}

    }
})

const add_to_cart = new mongoose.Schema({
    // product_id: {type:mongoose.Schema.Types, ref:'products'},

}, {timestamps: true})


const userSchema = new mongoose.Schema({
    first_name: { type:String, required: true},
    last_name: { type:String},
    email: { type:String, unique:true, required: true},
    password: { type:String, required: true},
    mobile_number: { type:Number, unique:true, required: true},
    address: [addressSchema],
    payment:[paymentSchema],
    // wishlist:{type:mongoose.Schema.Types.ObjectId, ref:'products'},
    order_status:{type:String, enum:["Order Confirmed", "Dispatched", "InTransit", "Delivered"]},
    // my_orders:{type:mongoose.Schema.Types.ObjectId, ref: 'orders'},
    add_to_cart:[add_to_cart],
    user_status:{type:String, enum:["Active", "Inactive"]}



}, {timestamps: true})

module.exports = mongoose.model('user', userSchema)
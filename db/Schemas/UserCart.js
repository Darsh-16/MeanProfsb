let mongoose = require('mongoose');
let Joi = require('@hapi/joi');
let UCart = require("./Cart");



// User Cart Schema

let UserCartSchema = new mongoose.Schema({
    userEmail:{type:String,required:true},
    cartItemId:{type:UCart.CartSchema,required:true}
});

let UcartModel = mongoose.model('UcartModel',UserCartSchema);
function Validation(message){
    let Schema = Joi.object({
        userEmail:Joi.string().required(),
        cartItemId:Joi.required()
    })
        return Schema.validate(message);
}

module.exports = {UcartModel,Validation,UserCartSchema};
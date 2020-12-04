let mongoose = require('mongoose');
let Joi =require('@hapi/joi');

// Contact Schema

let ContactSchema = new mongoose.Schema({
    Firstname:{type:String,required:true},
    Lastname:{type:String,required:true},
    Email:{type:String,required:true},
    Phone:{type:Number,required:true},
    Message:{type:String,required:true}
});

let Contact = mongoose.model('Contact',ContactSchema);

function ValidationError(message){
    let Schema=Joi.object({
        Firstname:Joi.string().required(),
        Lastname:Joi.string().required(),
        Email:Joi.string().required(),
        Phone:Joi.string().required(),
        Message:Joi.string().required()
    });
    return Schema.validate(message);
}

module.exports = {Contact,ValidationError}
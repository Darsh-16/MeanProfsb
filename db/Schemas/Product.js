let mongoose=require('mongoose');
let Joi = require('@hapi/joi');

// Product Schema

let ProductSchema = new mongoose.Schema({
    Name:{type:String,minlength:3,maxlength:80},
    image:{type:String},
    Description:{type:String,minlength:10,maxlength:1000},
    Brand:{type:String,minlength:3,maxlength:80},
    TotalPrice:{type:Number},
    Ratings:{type:Number},
    OfferPrice:{type:Number},
    IsAvailable:{type:String},
    Category:{type:String},
    recordDate:{type:Date,default:Date.now},
    updateDate:{type:Date,default:Date.now}
});

let Productinfo = mongoose.model('Productinfo',ProductSchema);



function ValidationError(message){
    let Schema = Joi.object({
        Name:Joi.string().min(3).max(80).required(),
        image:Joi.string(),
        Description:Joi.string().min(10).max(1000),
        Brand:Joi.string().min(3).max(80).required(),
        Ratings:Joi.string().min(1),
        TotalPrice:Joi.string().min(1),
        OfferPrice:Joi.string().min(1),
        IsAvailable:Joi.string(),
        Category:Joi.string().min(3).max(100),
    });
    return Schema.validate(message);

}
module.exports={Productinfo,ValidationError,ProductSchema}



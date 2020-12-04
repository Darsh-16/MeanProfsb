let mongoose = require('mongoose');
let Joi = require('@hapi/joi');

// Cart Schema

let CartSchema = new mongoose.Schema({
    ProductId:{type:mongoose.Schema.Types.ObjectId,ref:"Productinfo",require:true},
    Name:{type:String},
    image:{type:String},
    TotalPrice:{type:Number},
    recordDate:{type:Date,default:Date.now()},
    updateDate:{type:Date,default:Date.now()}
});


let CModel = mongoose.model('CModel',CartSchema);
function Validation(message){
    let Schema = Joi.object({
        ProductId:Joi.required(),
        TotalPrice:Joi.number().required(),
    });
    return Schema.validate(message);
}


module.exports = {CModel,Validation,CartSchema}

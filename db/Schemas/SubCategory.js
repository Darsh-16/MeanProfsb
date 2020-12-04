let mongoose = require('mongoose');
let Joi = require('@hapi/joi');

//SubCategory Schema

let SubCategorySchema = new mongoose.Schema({
    subcategoryname:{type:String,minlength:3,maxlength:50,required:true}
    
})

let SubCategoryinfo = mongoose.model('SubCategoryinfo',SubCategorySchema);
function ValidationError(message){
    let Schema= Joi.object({
        subcategoryname:Joi.string().required().min(3).max(50)
    })
    return Schema.validate(message);
};
module.exports={SubCategoryinfo,ValidationError,SubCategorySchema};

let mongoose = require('mongoose');
let Joi = require('@hapi/joi');
let SCategory = require('./SubCategory');

//  Category Schema

let CategorySchema = new mongoose.Schema({
    categoryname:{type:String,minlength:3,maxlength:50,required:true},
    SubcategoryId:{type:SCategory.SubCategorySchema}
});

let Categoryinfo = mongoose.model('Categoryinfo',CategorySchema);
function ValidationError(message){
  let Schema = Joi.object({
      categoryname:Joi.string().min(3).max(50).required(),
      SubcategoryId:Joi.required()
  });
  return Schema.validate(message);  
};

module.exports ={Categoryinfo,ValidationError};

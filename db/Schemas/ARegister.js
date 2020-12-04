let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let config = require('config');
let Joi = require('@hapi/joi');

//Admin Registeration

let AdminSchema = new mongoose.Schema({
    AFirstname:{type:String,min:3,max:20,required:true},
    ALastname:{type:String,min:3,max:20,required:true},
    Adminlogin:{
        AdminEmail:{type:String,required:true,unique:true},
        AdminPassword:{type:String,required:true}
    },
    resetPasswordToken:{type:String},
    resetPasswordExpires:{type:Date},
    recordDate:{type:Date,default:Date.now},
    updateDate:{type:Date,default:Date.now}
});

 AdminSchema.methods.Generatetoken = function(){
     let atoken = jwt.sign({_id:this._id},config.get('projectapp'));
     return atoken;

 }

 
let Admininfo = mongoose.model('Admininfo',AdminSchema);

function validationerror(message){
    let Schema=Joi.object({
     AFirstname:Joi.string().min(3).max(20).required(),
     ALastname:Joi.string().min(4).max(20).required(),
     Adminlogin:{
                AdminEmail:Joi.string().required().email(),
                AdminPassword:Joi.string().required()
                }
  })  
    return Schema.validate(message);
 };

 module.exports = {Admininfo,validationerror,AdminSchema};
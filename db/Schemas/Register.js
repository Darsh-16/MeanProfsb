let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let config = require('config');
let Joi = require('@hapi/joi');
 
//User Schema

let UserSchema = new mongoose.Schema({
    Firstname:{type:String,min:3,max:20,required:true},
    Lastname:{type:String,min:4,max:20,required:true},
    userlogin:{
      UserEmail:{type:String,required:true},
      UserPassword:{type:String,required:true}
               },
    termsAcceptCheck:{type:Boolean},
    newslettercheck:{type: Boolean}, 
    resetPasswordToken:{type:String},
    resetPasswordExpires:{type:Date},
    isAdmin:{type:Boolean},
    recordDate:{type:Date,default:Date.now},
    updateDate:{type:Date,default:Date.now}
});

UserSchema.methods.Generatetoken = function(){
  let token = jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get('projectapp'));
return token;
}

let Userinfo  = mongoose.model('Userinfos',UserSchema);


    
function validationerror(message){
   let Schema=Joi.object({
    Firstname:Joi.string().min(3).max(20).required(),
    Lastname:Joi.string().min(4).max(20).required(),
    userlogin:{
               UserEmail:Joi.string().required().email(),
               UserPassword:Joi.string().required()
               },
   termsAcceptCheck:Joi.boolean(),
   newslettercheck:Joi.boolean(),
   isAdmin:Joi.boolean()
 })  
   return Schema.validate(message);
};


module.exports = {Userinfo,validationerror,UserSchema};
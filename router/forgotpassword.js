let express = require('express');
let router = express.Router();
let Joi = require('@hapi/joi');
let bcrypt = require('bcryptjs');
let model = require('../db/Schemas/Register');


router.post('/forgotpassword/:id', async(req,res)=>{
    try{
    let user = await model.Userinfo.findOne({
        resetPasswordToken: req.params.id,
        resetPasswordExpires:{$gt:Date.now()}
    });
        if(!user){return res.status(401).send({message:'Invalid token'})}
        let {error}=ValidationError(req.body);
        if(error){return res.send(error.details[0].message)}
    let comparepassword = await bcrypt.compare(req.body.userlogin.UserPassword,user.userlogin.UserPassword);
    if(comparepassword){return res.status(401).send({message:'This is your old password plz make a new one !!'})}
        let salt = await bcrypt.genSalt(10);
        user.userlogin.UserPassword = await bcrypt.hash(req.body.userlogin.UserPassword,salt);
        user.resetPasswordExpires = undefined;
        user.resetPasswordToken = undefined;
        let data = await user.save();
        res.send({message:'Password Updated Successfully !!',d:data})
    }
    catch(ex){
        res.send(ex.message);
    }
});

function ValidationError(message){
    let Schema = Joi.object({
        userlogin:{ 
            UserPassword:Joi.string().required()
        }
    });
    return Schema.validate(message);
}


module.exports=router;
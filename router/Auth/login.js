let express=require('express');
let router = express.Router();
let U = require('../../db/Schemas/Register');
let Joi = require('@hapi/joi');
let bcrypt = require('bcryptjs');
let auth = require('../../middleware/user.auth');
;


router.post('/userloginauth',async(req,res)=>{
        let {error}=ValidationError(req.body);
        if(error){return res.status(403).send(error.details[0].message)};
        let user = await U.Userinfo.findOne({"userlogin.UserEmail":req.body.userlogin.UserEmail});
        if(!user){return res.status(403).send({message:"Invalid Email Id please try again"})};
        let upassword = await bcrypt.compare(req.body.userlogin.UserPassword,user.userlogin.UserPassword);
        if(!upassword){return res.status(403).send({message:"Invalid Password !"})};
        let token = user.Generatetoken();
        res.header('x-auth-token',token).send({message:"Login Successfull",UserIdentity:token });
    });




function ValidationError(error){   
    let Schema = Joi.object({
        userlogin:{
            UserEmail:Joi.string().required().email(),
            UserPassword:Joi.string().required()
        }
    });

   return Schema.validate(error);
};


module.exports = router;
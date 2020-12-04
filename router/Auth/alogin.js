let express=require('express');
let router = express.Router();
let Joi = require('@hapi/joi');
let bcrypt = require('bcryptjs');
let A = require('../../db/Schemas/ARegister');



router.post('/adminloginauth',async(req,res)=>{
    let {error}=ValidationError(req.body);
    if(error){return res.status(403).send(error.details[0].message)};
    let admin = await A.Admininfo.findOne({"Adminlogin.AdminEmail":req.body.Adminlogin.AdminEmail});
    if (!admin){return res.status(403).send({message:"Invalid Email Id please try again"})};
    let apassword = await bcrypt.compare(req.body.Adminlogin.AdminPassword,admin.Adminlogin.AdminPassword);
    if (!apassword){return res.status(403).send({message:"Invalid password !"})};
    let atoken = admin.Generatetoken();
    res.header('x-auth-atoken',atoken).send({message:"Login Successfull",AdminIdentity:atoken});
});

function ValidationError(error){   
    let Schema = Joi.object({
        Adminlogin:{
            AdminEmail:Joi.string().required().email(),
            AdminPassword:Joi.string().required()
        }
    });

   return Schema.validate(error);
};


module.exports = router;
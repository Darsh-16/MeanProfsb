let express = require('express');
let router = express.Router();
let A = require('../db/Schemas/ARegister');
let bcrypt = require('bcryptjs');



// get admin
router.get('/admin/:id',async(req,res)=>{
    let data = await A.Admininfo.findById(req.params.id);
    if (!data){return res.status(404).send({message:'Invalid admin Id'})}
    res.send(data);
});

//register admin
router.post('/ARegister',async(req,res)=>{
try{
    let {error} = A.validationerror(req.body);
    if(error){return res.status(403).send(error.details[0].message)}
    let loginadmin = await A.Admininfo.findOne({"Adminlogin.AdminEmail":req.body.Adminlogin.AdminEmail});
    if (loginadmin){return res.status(402).send({message:"This Email Id is already exists"})}
    let data = new A.Admininfo({
        AFirstname:req.body.AFirstname,
        ALastname:req.body.ALastname, 
        Adminlogin:req.body.Adminlogin,
        resetPasswordToken:req.body.resetPasswordToken,
        resetPasswordExpires:req.body.resetPasswordExpires,
        recordDate:req.body.recordDate,
        updateDate:req.body.updateDate   
    });

    // encrypt passwordby bcrypt
    let salt = await bcrypt.genSalt(10);
    data.Adminlogin.AdminPassword = await bcrypt.hash(data.Adminlogin.AdminPassword,salt);

    let result = await data.save();
    let atoken = result.Generatetoken();
    res.header('x-auth-atoken',atoken).send({message:"Successfully Registered now lets's go back to Login page",
    data:result});
}
catch(ex){
    res.send(ex.message);
}
     
});


module.exports = router;
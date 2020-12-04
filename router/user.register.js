let express = require('express');
let router = express.Router(); 
let U = require('../db/Schemas/Register');
let bcrypt = require('bcryptjs');
let  auth = require('../middleware/user.auth');
let admin = require('../middleware/admin');


router.get('/me',auth,async(req,res)=>{
  let data = await U.Userinfo.findById(req.Register._id).select(["Firstname","Lastname","newslettercheck","termsAcceptCheck"]);
  res.send(data);
});

 //get user
router.get('/Getuser/:id', async (req,res)=>{
    let data = await U.Userinfo.findById(req.params.id);
    if(!data){return res.status(404).send({message:'Invalid user Id'})}
      res.send(data);
});  

//representation state transfer   interface = methods
//register user
router.post('/Register',async(req,res)=>{
  try{
   let {error} = U.validationerror(req.body);
   if(error){return res.status(403).send(error.details[0].message)}
   let loginuser = await U.Userinfo.findOne({"userlogin.UserEmail":req.body.userlogin.UserEmail});
   if(loginuser){return res.status(402).send({message:"This Email Id is already exits "})}
     let data = new U.Userinfo({
         Firstname:req.body.Firstname,
         Lastname:req.body.Lastname, 
         newslettercheck:req.body.newslettercheck,
         userlogin:req.body.userlogin,
         termsAcceptCheck:req.body.termsAcceptCheck,
         resetPasswordToken:req.body.resetPasswordToken,
         resetPasswordExpires:req.body.resetPasswordExpires,
         isAdmin:req.body.isAdmin,
         recordDate:req.body.recordDate,
         updateDate:req.body.updateDate 
          });
 
        //encrypt password by bcrypt
          let salt = await bcrypt.genSalt(10);
          data.userlogin.UserPassword = await bcrypt.hash(data.userlogin.UserPassword, salt);
          // bcrypt code end here
         let result = await data.save();
         let token = result.Generatetoken();
     res.header('x-auth-token',token).send({message:"Successfully Registered now lets's go back to Login page",
     data:result});
        }
        catch(ex){
          res.send(ex.message);
        }
     });
    
    //IEP = information expert principle


// Get User
router.get('/AllUsers',async(req,res)=>{
  let ViewUser = await U.Userinfo.find();
  if (!ViewUser){return res.status(404).send({message:"Something went wrong"})};
  res.send(ViewUser);
});


// delete User
router.delete('/removecustomer/:id',async(req,res)=>{
  let data = await U.Userinfo.findByIdAndRemove(req.params.id);
  if(!data) {return res.status(403).send({message:"Invalid Id"})}
  res.send({message:" User Deleted Succesfully !!! "  });
});

module.exports=router;
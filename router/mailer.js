let nodemailer = require('nodemailer');
let express = require('express');
let router = express.Router();
let crypto = require('crypto');
let model = require('../db/Schemas/Register');

router.post('/mailer',async(req,res)=>{
    try{
    let token = crypto.randomBytes(32).toString('hex'); //genarating token
    let User = await model.Userinfo.findOne({
        "userlogin.UserEmail":req.body.userlogin.UserEmail
    });  //checking emailid
     if(!User){return await res.status(401).send({message:'Invalid MailId'})};
     User.resetPasswordToken = token;
     User.resetPasswordExpires = Date.now() + 3600000 ;//1hour
     User = await User.save();

     //create reusable transporter object using the default SMTP transport
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
     let transporter = nodemailer.createTransport({
         host:'smtp.gmail.com',
         port:465, 
         secure:true, //true or 465 only, fasle for other ports
         auth:{
             user:'darshprajapati.krb@gmail.com', // generated ethernal user
             pass:'darshsaloni16' // generated ethernal password
         }
        });

        if(!transporter) res.status(401).send({
            message:'something went wrong'
        }); 

        // setup email data with unicode symbols
        let mailOptions = {
            from:'"SuperMarkeT.India" <darshprajapati.krb@gmail.com>', // sender address
            to: User.userlogin.UserEmail, //list of receivers
            subject:'Reset Your Password',  // subject line :smile:
            text:'open this link to change your password http://localhost:4200/updatepassword' + 
            token // plain text body
        };
  
        // send  mail with defined transport object
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                return console.log(error);
            }
            console.log('Message sent :%s',info.messageId);
                });
                res.header('x-auth-token',token).status(200).send({
                    'message':'message send',
                    'token':token,
                    'data':User
                });
            } catch(ex){
                res.status(401).send(ex);
            }
   });

module.exports = router;
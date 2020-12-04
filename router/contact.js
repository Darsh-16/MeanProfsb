let express = require('express');
let router = express.Router();
let ContactS = require('../db/Schemas/Contact');
let nodemailer = require("nodemailer");


router.post("/Contactus", async (req, res) => {
    try {
      let { error } = ContactS.ValidationError(req.body);
      if (error) {
        return res.status(403).send(error.details[0].message);
      }
      let data = await new ContactS.Contact({
        Firstname: req.body.Firstname,
        Lastname:req.body.Lastname,
        Email: req.body.Email,
        Phone:req.body.Phone,
        Message: req.body.Message
      });
      let result = await data.save();
      console.log(result)
      //res.send(result);

      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "darshprajapati.krb@gmail.com", // generated ethereal user
          pass: "darshsaloni16" // generated ethereal password
        }
      });
      if (!transporter)
        res.status(401).send({
          message: "Something Went Wrong"
        });
      let mailOptions = {
        from: '"SuperMarkeT.India" <darshprajapati.krb@gmail.com>', // sender address
        to: data.Email, // list of receivers
        subject: "Thank You For Contacting Us", // Subject line:smile:
        text: "Thank you for Contacting us.We will resolve your query as soon as possible.Till then please continue shopping."
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });
      res.send({
        message: "message sent"
      });
    } catch (ex) {
      res.send(ex.message);
    }
  });
  module.exports = router;
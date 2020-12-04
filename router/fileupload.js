let express = require('express');
let router = express.Router();
let multer = require('multer');
//new command
let fileS = require('../db/Schemas/fileupload');
const bodyParser = require('body-parser');
const cors = require("cors");
//new command ended
let file = require('../db/Schemas/Product');
// let path = require('path');
// let pathDir = path.join(__dirname+"./uploads/");
let port = 'http://localhost:4416';

// router.use(express.static(__dirname+"./uploads/"));
//new command
// router.use(bodyParser.json());
//new command ended

 let storage = multer.diskStorage({ 
     destination:function(req,file,callBack) {
         callBack(null, './uploads')
     },
     filename:function(req,file,callBack) {
         callBack(null,Date.now()+file.originalname);
     },
 });

//new command
// const storage = multer.diskStorage({
//     destination:(req,file,callBack) => {
//         callBack(null,'uploads')
//     },
//     filename:(req,file,callBack) => {
//         callBack(null,Date.now()+file.originalname)
//     }
// })
//new command ended


let fileFilter = (req,file,callBack)=> {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
        callBack(null,true);
    }
    else{
        callBack(null,false);
    }
};

// let fileStorage = multer({
    let upload = multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:fileFilter
});


 router.post('/file',upload.single('image'),async(req,res) => {
     try{
         console.log(req.file);
         let data = new fileS({
             image:port + '/uploads/' +req.file.filename
         });
         if(!data) {
             return res.status(403).send({message:'not found file'})
         }
         let saveImages  = await data.save();
         res.send({message:'file uploaded',data:saveImages});
     }
     catch(ex){
         res.send(ex.message);
     }
 });

// router.post('/file',upload.single('image'),async(req,res) => {
//         let file = new Model({
//             image:port+'/uploads/'+req.file.filename
//         });
//         if(!fileModel){
//             return res.status(403).send('not found file')
//         }
//         let data = await file.save();

//         res.send({
//             message:'fileuploaded',
//             data:data
//         });
// });

//New command

// router.post('/file',upload.single('file'),(req,res,next) => {
//     const file = req.file
//     console.log(file.filename);
//     if (!file) {
//         const error = new Error("Please upload a file")
//         error.httpStatusCode = 400
//         return next(error)
//     }
//     res.send(file);
// })

//new command ended




module.exports=router;


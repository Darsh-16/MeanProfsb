let express = require('express');
let router = express.Router();
let ProductS = require('../db/Schemas/Product');
let CategoryS = require('../db/Schemas/Category');
let auth = require('../middleware/user.auth');
let admin = require('../middleware/admin');
let Order = require('../db/Schemas/Order');
let multer = require('multer');

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







// Add Products   
router.post('/AddProduct', upload.single('image'), async(req,res)=>{
    try{
        console.log(req.file);
let {error} = ProductS.ValidationError(req.body);
if (error){return res.status(403).send(error.details[0].message)};
let data = new ProductS.Productinfo({
    Name:req.body.Name,
    image:req.body.image,
    Brand:req.body.Brand,
    Ratings:req.body.Ratings,
    Description:req.body.Description,
    TotalPrice:req.body.TotalPrice,
    OfferPrice:req.body.OfferPrice,
    IsAvailable:req.body.IsAvailable,
    Category:req.body.Category,
});
let result = await data.save();
res.send({message:'Product Added SuccessFully !!!',data:result})
  
    }
    catch(ex){
        res.send(ex.message);                                          
    }
});

//Store order
// router.post('/Sorder',async(req,res)=>{
//     let data = new 
// })


//Remove Product By Id                                  //S
router.delete('/removeproduct/:id',async(req,res)=>{
    let productd = await ProductS.Productinfo.findByIdAndRemove(req.params.id);
    if(!productd){return res.status(404).send({message:"Invalid Product id"})};
    res.send({message:"Product Deleted Succesfully !!!"});
});



//Get All The Product                                   //S
router.get('/AllProduct',async(req,res)=>{
    let ViewProduct = await ProductS.Productinfo.find();
    if (!ViewProduct){return res.status(404).send({message:"SomeThing went wrong"})};
    res.send(ViewProduct);
});


//get  Products by Id                               //S
router.get('/Product/:id',async(req,res)=>{
    let ViewProductbyId = await ProductS.Productinfo.findById(req.params.id);
    if(!ViewProductbyId){return res.status(404).send({message:"Invalid Product Id"})};
    res.send(ViewProductbyId);
});

// Update Product By  Id  old method                             // M
// router.put('/ProductUpdate/:id',async(req,res)=>{
//     let result = await ProductS.Productinfo.findByIdAndUpdate(req.params.id);
//     if(!result){return res.status(404).send({message:"Invalid Id"})};
//     let results=await result.save();
//     res.send(results)
// });

//testing fro CRUD
router.put("/ProductUpdate/:id",async(req,res) => {
    try{
        const product = {
            Name:req.body.Name,
            // image:req.body.file,
            Brand:req.body.Brand,
            Ratings:req.body.Ratings,
            Description:req.body.Description,
            TotalPrice:req.body.TotalPrice,
            OfferPrice:req.body.OfferPrice,
            IsAvailable:req.body.IsAvailable,
            Category:req.body.Category,
        };
        const updatedProduct = await ProductS.Productinfo.findByIdAndUpdate(
            {_id:req.params.id},
            product
            );
            res.json(updatedProduct);
    }catch(error){
        res.json({message:error });
    }
});


//Get the Latest Product
router.get('/LatestProduct',async(req,res)=>{
let Viewlatestproduct = await ProductS.Productinfo.find();
if(!Viewlatestproduct){return res.status(404).send({message:"Something went wrong"})};
res.send(Viewlatestproduct);
});
 

//Get the Today Offers Products
router.get('/TodayOffers',async(req,res)=>{
    let ViewTodayOffer = await ProductS.Productinfo.find();
    if(!ViewTodayOffer){return res.status(404).send({message:"Something went wrong"})};
    res.send(ViewTodayOffer);
});

//pagination of product
router.get('/Page/:PageIndex',async(req,res)=>{
    let perPage = 6;
    let CurrentPage = req.params.PageIndex || 1;
    let data = await CategoryS.Categoryinfo
                                        .find({})
                                         .skip((perPage*CurrentPage)-perPage)
                                         .limit(perPage);
    let dataCount = await CategoryS.Categoryinfo.find().count();
    let PageSize = Math.ceil(dataCount/perPage);
    res.send({
        perPage: perPage,
        CurrentPage: CurrentPage,
        dataSize: data,
        PageSize: PageSize
    });
});


module.exports = router;
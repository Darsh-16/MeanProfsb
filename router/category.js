let express = require('express');
let router = express.Router();
let Categorydata = require('../db/Schemas/Category');
let SubCat = require('../db/Schemas/SubCategory');


//add the category 

router.post('/AddCategory',async(req,res)=>{
    let {error} = Categorydata.ValidationError(req.body);
    if (error){return res.status(403).send(error.details[0].message)};
    let SubcategoryId = await SubCat.SubCategoryinfo.findById(req.body.SubcategoryId);
    if (!SubcategoryId){return res.status(404).send('Invalid Subcategory Id')};
    let Categorys = new Categorydata.Categoryinfo({
        categoryname:req.body.categoryname,
        SubcategoryId:{
            _id:SubcategoryId._id,
            subcategoryname:SubcategoryId.subcategoryname
        }
    });
    let data = await Categorys.save();
res.send({message:'SuccessFully Added Category',item:data});
});


//Get all Category
router.get('/AllCategory',async(req,res)=>{
    let viewCategory = await Categorydata.Categoryinfo.find();
    res.send(viewCategory);
});

//Get Category by  Id
router.get('/CategorybyId/:id',async(req,res)=>{
    let data = await Categorydata.Categoryinfo.findById(req.params.id);
    if(!data){return res.status(404).send({message:'Inavlid Category Id Plz Try Again'})}
    res.send(data);
});


// Delete
router.delete('/DeleteCategory/:id',async(req,res)=>{
    let data = Categorydata.Categoryinfo.findByIdAndRemove(req.params.id);
    if(!data){return res.status(404).send({message:'Invalid Category Id'})};
    res.send({message:'Category Deleted '});
});




module.exports = router;
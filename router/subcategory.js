let express = require('express');
let router = express.Router();
let SubCategorydata = require('../db/Schemas/SubCategory');

//Add SubCategory
router.post('/AddSubCategory',async(req,res)=>{
    let {error} =SubCategorydata.ValidationError(req.body);
    if(error){ return res.status(403).send(error.details[0].message)}
    let SubCategorys = new SubCategorydata.SubCategoryinfo({
        subcategoryname:req.body.subcategoryname
    });
    let data = await SubCategorys.save();
    res.send ({message:'Successfully Added Subcategory',item:data});
});


router.get("/AllSubCategory",async(req,res)=>
{
    let {error}=SubCategorydata.ValidationError(req.body);
    if(error){return res.status(403).send(error.details[0].message)};
    let ViewSubCategory = await SubCategorydata.SubCategoryinfo.find();
    res.send(ViewSubCategory);
});
module.exports=router;
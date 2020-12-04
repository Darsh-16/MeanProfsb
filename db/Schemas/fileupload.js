let mongoose=require('mongoose');
let Joi = require('@hapi/joi');

// Product Schema

let ProductSchema = new mongoose.Schema({
    image:{type:String}
});

let fileinfo = mongoose.model('fileuploads',ProductSchema);

module.exports= fileinfo;



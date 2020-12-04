let mongoose = require('mongoose');


//Order Schema

let Order = new mongoose.Schema({
    user :{type:mongoose.Schema.Types.ObjectId, ref: 'Userinfos' },
    cart : {type:Object,required:true},
    address : {type:String ,required:true},
    name : {type:String ,required:true},
    payment : {type:String ,required:true}
});

module.exports = mongoose.model('Order',Order);
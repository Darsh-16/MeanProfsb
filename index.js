let express = require('express');
let app=express();
let cors=require('cors');
app.use(express.json());
app.use(cors());
let uregister = require('./router/user.register');
let login = require('./router/Auth/login'); 
let alogin = require('./router/Auth/alogin');
let mongoose = require ('mongoose');
let port = process.env.PORT || 4416;
let config = require('config');
let mailer = require('./router/mailer');
let forgotpassword = require('./router/forgotpassword');
let category = require('./router/category');
let subcategory = require('./router/subcategory');
let product = require('./router/product');
let cart = require('./router/cart');
let aregister = require('./router/admin.register');
let upload = require('./router/fileupload');
let contactus = require('./router/contact');
let addtocart = require('./router/cart');

app.use('/uploads',express.static(__dirname + '/uploads'));

console.log(`production:${process.env.NODE_ENV}`);
console.log(`development:${app.get('env')}`); 
console.log(`development:${config.get('info')}`);
console.log(`production:${config.get('projectapp')}`);
if(process.env.NODE_ENV==='production'){
console.log(`password:${config.get('password')}`);
console.log(`production:${config.get('user')}`);
}

mongoose.connect("mongodb://localhost/Project",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => console.log("Connection SuccessFull"))
.catch(ex => console.log( `Something went Wong ${ex.message}`));


if(!config.get('projectapp')){
    console.log('FATAL ERROR: SET ENVIRONMENT VARIABLES');
    process.exit(1);
}


app.use("/api/register/",uregister);
app.use("/api/aregister/",aregister);
app.use("/api/user/",login);
app.use("/api/admin/",alogin);
app.use("/api/usermailer",mailer);
app.use("/api/fp/",forgotpassword);
app.use("/api/categories/",category);
app.use("/api/subcategories/",subcategory);
app.use("/api/product/",product);
app.use("/api/cart/",cart);
app.use("/api/upload/",upload);
app.use("/api/file",upload);
app.use("/api/contactus",contactus);
app.use("/api/atc",addtocart);
app.listen(port,()=>console.log(`this app is working on port number ${port}`));




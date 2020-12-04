let jwt = require('jsonwebtoken');
let config = require('config');
function AdminAuth(req,res,next) {
    try {
        let atoken = req.header('x-auth-token');
        if(!atoken) {return res.status(402).send( {message:'Admin Not Exist (ACCESS DENIED, there is no token)'})}
        let dcode = jwt.verify(atoken,config.get('projectapp'));
        req.ARegister = dcode;
        next();
    }
    catch(ex) {
        res.status(401).send({message:'Invalid adminid' + ex.message});
    }

};

module.exports = AdminAuth;
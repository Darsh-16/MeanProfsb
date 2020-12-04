let jwt = require('jsonwebtoken');
let config = require('config');
function UserAuth(req,res,next) {
    try {
        let token = req.header('x-auth-token');
        if(!token) {return res.status(402).send( {message:'User Not Exist (ACCESS DENIED, there is no token)'})}
        let dcode = jwt.verify(token,config.get('projectapp'));
        req.Register = dcode;
        next();
    }
    catch(ex) {
        res.status(401).send({message:'Invalid userid' + ex.message});
    }

};

module.exports = UserAuth;
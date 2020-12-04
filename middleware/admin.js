function Admin(req,res,next){
    if(!req.Register.isAdmin) {
        return res.status(403).send({message:' Your are not an Admin (ACCESS DENIED)'})
    };
    next();
};

module.exports = Admin; 
const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');
    try{
        const verified = jwt.verify(token,process.env.SECRET);
        req.user = verified;
        next();
    }
    catch(err){
        res.status(400).send('Invalid token')
    }
}

const verifyTokenAndAuthorization = (req,res,next)=>{
    auth(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json("You're not allowed to do that!");
        }
    });
}
const verifyTokenAndAdmin= (req,res,next)=>{

    auth(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json("You're not allowed to do that!");
        }
    });
}


module.exports = {auth,verifyTokenAndAuthorization,verifyTokenAndAdmin};
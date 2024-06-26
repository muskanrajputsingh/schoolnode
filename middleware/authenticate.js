const jwt = require("jsonwebtoken");
const Login = require("../model/loginSchema");

const Authenticate = async(req,res,next)=>{
    try{
     const token = req.cookies.jwtoken;
     const verifyToken = jwt.verify(token,process.env.SECRET_KEY);

     const rootUser = await Login.findOne({_id:verifyToken._id,"tokens.token":token});

     if(!rootUser){
        throw new Error('user not found') 
      }

      req.token = token;
      req.rootUser=rootUser;
      req.userId = rootUser._id;

      next();
    }
    catch(err){
        res.status(401).send('unauthorized:no token provided');
      console.log(err);
    }
}

module.exports = Authenticate;
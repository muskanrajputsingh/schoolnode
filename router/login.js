const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/authenticate");

require('../db/conn');
const Login = require("../model/loginSchema");

//registration dashboard
//post request

router.post('/regdashboard',async(req,res)=>{
    const {name,phone,city,state,email,password} = req.body;

  if(!name||!phone||!city||!state||!email || !password){
    return res.status(422).json({error : "plz filled the field properly"});
  }

  try{
    const userExist = await Login.findOne({email:email});

    if(userExist){
        return res.status(422).json({error :"email already exist"});
    }

    const user = new Login({name,phone,city,state,email,password});
    const userRegister = await user.save();
    
    if(userRegister){
        res.status(201).json({message:"user registerd successfuly"});
    }
    else{
        res.status(500).json({error :"failed to registered"});
    }
  }catch(err){
    console.log(err);
  }
});

router.get("/regdashboard",async(req,res)=>{
  try{
      const studentData = await Login.find();
      res.send(studentData);
  }catch(err){
      res.send(err);
  }
})

//login route dashboard

router.post('/logindashboard',async(req,res)=>{
    try{
     let token;
     const {email,password} = req.body;
      if(!email || !password){
        return res.status(400).json({error:"plz fill the data"})
     }
     const studentLogin = await Login.findOne({email:email});

     if(studentLogin){
        const isMatch = await bcrypt.compare(password,studentLogin.password);
         const token = studentLogin.generateAuthToken();
         console.log(token);

         res.cookie("jwtoken",token,{
           expires:new Date(Date.now()+25892000000),
           httpOnly:true
         });

        if(!isMatch){
            res.status(400).json({error:"invalid credientials"});
        }
        else{
            res.json({message:"user signin successfully"});
        }
    }else{
       res.status(400).json({error:"invalid credientials"});
    }
    }catch(err){
      console.log(err);
    }
});

router.get("/logindashboard",async(req,res)=>{
  try{
      const studentData = await Login.find();
      res.send(studentData);
  }catch(err){
      res.send(err);
  }
})
//about us ka page by token auth
router.get('/about',authenticate,(req,res)=>{
  res.send(req.rootUser);
})

module.exports = router;

// https://schoolnode-2uw8.onrender.com
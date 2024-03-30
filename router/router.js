const express = require('express');
const router = express.Router();

require('../db/conn');
const User = require("../model/userSchema");

//post request

router.post('/register',async(req,res)=>{
    const {name,fname,mname,birth_day,birth_month,birth_year,email,phone,gender,image,address,pin,state,city,pschool,previousclass,percent,yrofpass,course} = req.body;

  if(!name || !fname || !mname || !birth_day || !birth_month || !birth_year || !email || !phone || !gender || !image || !address ||!pin || !state || !city || !pschool || !previousclass || !percent || !yrofpass || !course){
    return res.status(422).json({error : "plz filled the field properly"});
  }

  try{
    const userExist = await User.findOne({email:email});

    if(userExist){
        return res.status(422).json({error :"email already exist"});
    }

    const user = new User({name,fname,mname,birth_day,birth_month,birth_year,email,phone,gender,image,address,pin,state,city,pschool,previousclass,percent,yrofpass,course});

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

//getAll request

router.get("/register",async(req,res)=>{
    try{
        const studentData = await User.find();
        res.send(studentData);
    }catch(err){
        res.send(err);
    }
})

//getId request

router.get("/register/:id",async(req,res)=>{
 try{
    const _id = req.params.id;
    const studentData = await User.findById(_id);
    console.log(studentData);

    if(!studentData){
        return res.status(404).send();
    }else{
        res.send(studentData);
    }
 }catch(e){
    res.send(e);
 }
})

//patch request

router.patch("/register/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const updateStudent = await User.findByIdAndUpdate(_id,req.body,{
            new:true
        });
        res.send(updateStudent);
    }catch(err){
        res.status(400).send(err);
    }
})

//delete request

router.delete("/register/:id" ,async(req,res)=>{
    try{
        const deleteStudent = await User.findByIdAndDelete(req.params.id);

        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deleteStudent);
    }catch(e){
        res.status(500).send(e);
    }
})


module.exports = router;



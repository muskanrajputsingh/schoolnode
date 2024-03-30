const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const loginSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[
       {
        token:{
            type:String,
            required:true
        }
       }
    ]
})


/////hashing password

loginSchema.pre('save',async function(next){
 if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password,12);
 }
 next();
});

///generating token
loginSchema.methods.generateAuthToken = async function (){
    try{
     let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
     this.tokens=this.tokens.concat({token:token});
     await this.save();
     return token;
    }catch(err){
        console.log(err);
    }
}

const Login = mongoose.model("LOGINREG",loginSchema);
module.exports = Login;
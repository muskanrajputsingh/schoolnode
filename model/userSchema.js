const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    fname:{
        type:String,
        required:true,
        trim:true
    },
    mname:{
        type:String,
        required:true,
        trim:true
    },
    birth_day:{
        type:Number,
        required:true
    },
    birth_month:{
        type:String,
        required:true
    },
    birth_year:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
   address:{
    type:String,
    required:true
   },
   pin:{
    type:Number,
    required:true
   },
   state:{
    type:String,
    required:true
   },
   city:{
    type:String,
    required:true
   },
   pschool:{
    type:String,
    required:true
   },
   previousclass:{
    type:String,
    required:true
   },
   percent:{
    type:Number,
    required:true
   },
   yrofpass:{
    type:Number,
    required:true
   },
   course:{
    type:String,
    required:true
   }

})

const User=mongoose.model('STUDENT',userSchema);
module.exports=User;








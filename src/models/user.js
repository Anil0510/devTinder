const mongoose=require('mongoose');
const validator = require('validator');
const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:4,
        maxlength:50,
    },
    lastName:{
       type:String 
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true ,  // for  no space
        validate(value){
      if(!validator.isEmail(value)){
throw new Error("Invalid email adress:"+value)
      }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
               throw new Error("Enter a strong password! "+value) 
            }
        }
    },
    age:{
        type:Number,
        min:18,
        
    },
    gender:{
type:String,
validate(value){//custom validate functions and it is called only new document is called by default
    if(!["male","female","others"].includes(value)){
throw new Error("gender data is not valid")
    }
},

    },
    photoUrl:{
        type:String,
        default:"https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?t=st=1732613370~exp=1732616970~hmac=97f18d8838a2484a79c59e128bbf29e9d1b00b5607669d435261441fab801294&w=740",
   validate(value){
    if(!validator.isURL(value)){
        throw new Error("Invalid photo URL:"+value)
    }
   }
    },
    about:{
        type:String,
        default:"this is the default of the user!",
    },
    skills:{
type:[String]
    },
    

    
},{
    timestamps:true // for storing the registerd value
})
const User=mongoose.model("User", userSchema);
module.exports=User;
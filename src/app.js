const express=require('express');
const connectDB=require("./config/database")
require("./config/database")
const app= express();
const User=require("./models/users")
//creating a new instance of the user model
app.post("/signup", async(req,res)=>{
    const user = new User({
        firstName:"Anil",
        lastName:"Dayyala",
        emailId:'anilmunna623@gmail.com',
        password:"anil@123"
    });
    try{  
        await  user.save();//return  a promise
res.send("user added sucessfully");
} catch(error){
   res.status(400).send("Error saving the user:" + error.message)
}

});




connectDB().then(()=>{
    console.log("data base connection established.....");
    app.listen(3000,()=>{
        console.log("server is sucessfully listening on port 3000")
    });
    
 })
 .catch((error)=>{
     console.error("Dtabase  cannot be connected")
 
 });



const express =require ('express');
//import express from "express"
//import connectDB from "./config/database.js";
const connectDB=require("./config/database")

//require("./config/database")
const app= express();
const User=require("./models/user.js");
app.use(express.json());//middleware
//creating a new instance of the user model
app.post("/signup", async(req,res)=>{
    const userObj = new User({
        firstName:"Anil",
        lastName:"D",
        emailId:'anilmunna623@gmail.com',
        password:"anil@123"
    }
// creating a new instance of the user model

);
    try{  
        await  user.save();//return  a promise
res.send("user added sucessfully");
} catch(error){
   res.status(400).send("Error saving the user:" + error.message)
}

});

app.delete("/users",async(req,res)=>{
   const userId= req.body.userId
   try {
  const user=  await user.findByIddelete(userId)
  res.send("userdeleted sucessfully")
    
   } catch (error) {
    res.status(400).send("something went wrong")  
   }

})
//update thr user
app.fetch("/users", async(req,res)=>{
   const userId= req.body.userId;
   const data=req.body;
   try {
    user.findByIUpdate
    
   } catch (error) {
    
   }

})



connectDB().then(()=>{
    console.log("data base connection established.....");
    app.listen(3000,()=>{
        console.log("server is sucessfully listening on port 3000...")
    });
    
 })
 .catch((error)=>{
     console.error("Database  cannot be connected")
 
 });



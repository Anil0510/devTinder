const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const{validateSignUpData}=require("./utils/validation")
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken");
const {userAuth}=require("./middlewares/auth")


const app = express();
app.use(express.json()); // Middleware to parse JSON requests
app.use(cookieParser());
// Signup route
app.post('/signup', async (req, res) => {
//valiadting of data is requried
try {
validateSignUpData(req)


const { firstName,lastName,emailId,password}=req.body
//Encrypt the password
const passwordHash= await bcrypt.hash(password,10)
console.log(passwordHash);

    //creating a new instance of the uer model
        const user = new User({
            firstName,lastName,emailId,password:passwordHash
        });
        await user.save();
        res.status(201).send('User added successfully!');
    } catch (error) {
        res.status(400).send('ERROR: ' + error.message);
    }
});

// Get user by email

//creating a login page
app.post("/login",async(req,res)=>{
    try {
     const{emailId,password}  =req.body; 
     const user=await User.findOne({emailId:emailId})
     if(!user){
        throw new Error("Invalid credentials")
     }
      const ispasswordValid= await user.valiadtepassword(password)
      if(ispasswordValid){
//creating a jwt token 
//const token=await  jwt.sign ({_id:user._id},"DEV@Tinder$123")
//expiresIn="7d"
const token=await user.getJwt();
//add the token to cookie and send the response to the user
res.cookie("token",token,{expires:new Date(Date.now()+8*360000)})



        res.send("login sucessfully!")
      }
      else{
        throw new Error("Invalid credentails")
      }
        
    } catch (error) {
        res.status(400).send("ERROR:"+error.message)
        
    }
})


app.get("/profile",userAuth,async(req,res)=>{
    const cookies=req.cookies;
const{token}=cookies
if(!token){
    throw new Error("Invalid Token")
}
//validate my token

const decodedMessage=await jwt.verify(token,"DEV@Tinder$123")
console.log(decodedMessage);
const{_id}=decodedMessage;
console.log("logged In user is"+ _id)
const user=await User.findById(_id);
if(!user){
    throw new Error("User does not exist")

} 

    console.log(cookies)
    res.send(user)
})

app.post('./sendConnectionRequest',userAuth,async(req,res)=>{
    const user=req.user;
    console.log("Sending Connection Request")
    res.send(user.firstName+"sent the connection request")
})


// Connect to the database and start the server
const PORT = 3100;
connectDB()
    .then(() => {
        console.log('Database connection established...');
        app.listen(PORT, () => {
            console.log(`server is running on port::${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database cannot be connected:', error.message);
    });

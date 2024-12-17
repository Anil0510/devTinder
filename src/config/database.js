const mongoose= require('mongoose')
const connectDB=async()=>{
  await   mongoose.connect("mongodb+srv://anilmunna623:anil@cluster0.utau6.mongodb.net/anil/devTinder");
}

module.exports=connectDB


//MONGO_URI = "mongodb+srv://anilmunna623:anil@cluster0.utau6.mongodb.net/anil?retryWrites=true&w=majority&appName=Cluster0"
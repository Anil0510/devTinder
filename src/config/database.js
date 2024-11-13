const mongoose= require('mongoose')
const connectDB=async()=>{
  await   mongoose.connect("/devTinder");
}

module.exports=connectDB



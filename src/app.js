const express=require('express');

const app= express();
// this will only call handle  get call to /user
app.get("/user",(req,res)=>{
    res.send({
        firstName:'anil',
        secondName:'d',
        location:'Hyderbad'
    })

})
app.post((req,res)=>{
    res.send("data save from database sucessfully")

})
app.delete((req,res)=>{
    res.send("Deleted sucessfulyy")

})
// this method will match all the HTTP methods API call to /test
app.use("/helo",(req,res)=>{
    res.send("hello hello")// if we give /  insted of /hello routing it will over ride

})
app.use("/test",(req,res)=>{
    res.send("heloo from the server")
    
})

app.listen(3000,()=>{
    console.log("server is sucessfully listening on port 3000")
})

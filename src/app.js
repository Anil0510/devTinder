const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/requests", requestRouter);
app.use("/user", userRouter);
// app.get('/',(req,res)=>{
//   res.status(200).json({message:"Hello World...!"})
// })

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3300, () => {
      console.log("Server is successfully listening on port 3300...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
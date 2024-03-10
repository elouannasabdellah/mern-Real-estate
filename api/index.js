import express from "express";
import mongoose from "mongoose";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

import dotenv from "dotenv";
dotenv.config();

// Connect to database -----------------------------------------------
mongoose.connect(process.env.MONGODB_URL).then( ()=>{
    console.log('Connected to Database successfully');
} ).catch( (err)=>{
    console.log(err);
} );

const app= express();

app.use(express.json());

//  Routes -------------------------------------------------------
app.use("/api/user", userRouter);
app.use('/api/auth', authRouter);

app.listen( 3500, ( )=>{
    console.log("Server runing in server 3500!!");
})


// middelware for handel error -----------------------
app.use( (err, req, res, next)=>{
    const statusCode= err.statusCode || 500;
    const message= err.message ||"Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
} )

// app.get("/", (req, res)=>{
//     res.send('hello world port 3500');
// })
// app.get("/test", (req, res)=>{
//     res.send('Test Route 3500');
// })
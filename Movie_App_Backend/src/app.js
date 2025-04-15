
const express = require('express');
const app = express();
const cors=require("cors")
const {rateLimit}=require("express-rate-limit")
const {MovieRouter}=require("./Routes/movie.router.js")

// Set up CORS
app.use(cors({
    origin:"*",
    methods:['GET','POST']
}))

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, 
	limit: 3,
})

app.use(express.json());


// Routers
//app.use(limiter)
app.use("/api",MovieRouter)


module.exports = app;
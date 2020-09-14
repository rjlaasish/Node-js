const express =require('express')
const mongoose= require('mongoose')
require("./model/User")
require("./model/post")



mongoose.connect("mongodb://localhost:27017/Instagram",{ useNewUrlParser: true , useUnifiedTopology: true },()=>{
    console.log("mongo connected")
})

const app =express()
app.use(express.json())
 
app.use(require('./Route/UserRoutes'))
app.use(require('./Route/postRoutes'))

app.listen(5000,()=>{
    console.log("Server started at port 5000");
})
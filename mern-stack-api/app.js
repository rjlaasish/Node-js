const express =require('express');
const app=express();
const bodyParser =require('body-parser');
app.use(bodyParser.json());
require('./db');


// Import Routes
const postRoute=require('./routes/posts');

// MiddleWares
app.use('/posts',postRoute);






app.listen(5000,()=>{console.log("Listening to port 5000")});
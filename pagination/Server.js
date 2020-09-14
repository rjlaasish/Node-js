const express = require("express");
const mongoose=require('mongoose');
const User =require('./users');
const app = express();


mongoose.connect('mongodb://localhost:27017/pagination',{ useNewUrlParser: true ,useUnifiedTopology: true},()=>{
  console.log("mongodb Connected!");
})

const db=mongoose.connection

db.once('open',async ()=>{
  if(await User.countDocuments().exec() > 0) return

Promise.all([
  User.create({name: "User 1"}),
  User.create({name: "User 2"}),
  User.create({name: "User 3"}),
  User.create({name: "User 4"}),
  User.create({name: "User 5"}),
  User.create({name: "User 6"}),
  User.create({name: "User 7"}),
  User.create({name: "User 8"}),
  User.create({name: "User 9"}),
  User.create({name: "User 10"}),
  User.create({name: "User 11"}),
  User.create({name: "User 12"}),
  User.create({name: "User 13"}),
  User.create({name: "User 14"}),
]).then(()=>console.log("Users added"))

})




app.get("/users",paginatedResult(User), (req, res, next) => {
 
});

app.get("/posts",paginatedResult(User),(req,res)=>{
res.json(res.paginatedResult);
})

function paginatedResult(model){
  return async (req,res,next)=>{
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
  
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
  
    const data = {};
  
    if (startIndex > 0) {
      data.prev = {
        page: page - 1,
        limit: limit,
      };
    }
  
    if (endIndex < await model.countDocuments().exec()) {
      data.next = {
        page: page + 1,
        limit: limit,
      };
    }
  try{
    data.results = await model.find().limit(limit).skip(startIndex).exec();
    res.paginatedResult= data;
    next();
  }catch(e){
    res.status(500).json({error: e.message})
  }
  }
}

app.listen(2000, () => {
  console.log("app started");
});

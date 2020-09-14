const express =require('express');
const router= express.Router();
const mongoose =require('mongoose')
const bcrypt =require('bcrypt')
const User = mongoose.model("User")
const jwt=require('jsonwebtoken')

const requirelogin =require('../middleware/requirelogin')


const {JWT_SECRET}=require('../keys')

router.post('/signup',(req,res)=>{
    const {email,name,password} =req.body;

     if(!email || !name || !password){
          return res.status(422).json({error:"Please input all the fields"})
     }

     User.findOne({email:email})
     .then(savedUser=>{
         if(savedUser){
           return res.status(422).json({error:"Email already exists!"})
         }
            bcrypt.hash(password,10)
            .then(hashedPassword=>{
                const user = new User({
                    email,
                    name,
                    password:hashedPassword
                })
                user.save()
                .then(user =>{
                    res.json({message:"User Sucessfully saved"})})
                 .catch(err=>{
                 console.log(err)
                })
            })
     })
     .catch(err=>{
        console.log(err)
    })
    
    
 });

 router.post('/signin',(req,res)=>{
    const {email,password} =req.body;
    if(!email || !password){
        return res.status(422).json({error:"Please fill up all the fields"})
   }

   User.findOne({email:email})
   .then(savedUser=>{
       if(!savedUser){
         return res.status(422).json({error:"Invalid email or password"})
       }

       bcrypt.compare(password,savedUser.password)
       .then(doMatch=>{
              if(doMatch){

                  const token =jwt.sign({_id:savedUser._id},JWT_SECRET)
                 const {_id,email,name}=savedUser;
                  res.json({token,user:{_id,email,name}});
                }else{
                  return res.status(422).json({error:"Invalid email or password!"})
              }
           })
    }).catch(
        err=>{
            console.log(err);
        }
    )

 });


 module.exports = router;
 
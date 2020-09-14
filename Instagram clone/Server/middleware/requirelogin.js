const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../keys')
const mongoose=require('mongoose')
const User=mongoose.model('User')

module.exports = (req,res,next)=>{
    const {authorization}=req.headers;

    if(!authorization){
      return   res.status(421).json({error:"You must log in !"})
    }

    jwt.verify(authorization,JWT_SECRET,(error,payload)=>{
        if(error){
            return res.status(421).json({error:"You must log in error!"});
        }
        const {_id}=payload;

        User.findById(_id)
        .then(userdata=>{
            req.user=userdata;
            next();
        })
    })
    

}
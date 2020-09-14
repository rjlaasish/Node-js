const express =require('express');
const router= express.Router();
const mongoose =require('mongoose');
const requirelogin=require('../middleware/requirelogin')
const Post=mongoose.model('Post')

router.post('/createpost',requirelogin,(req,res)=>{
    const {title,body,photo}=req.body;

    if(!title || !body || !photo){
        return res.status(422).json({error:"Please input all fields !"});
    }
    req.user.password=undefined
    const post =new Post({
        title,
        body,
        photo,
        postedBy:req.user
    })

    post.save()
    .then(savedPost=>{
          res.json({savedPost})
        })
    .catch(err=>{
        res.status(422).json({error:err})
    })


})

router.get('/allpost',requirelogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/mypost',requirelogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router;
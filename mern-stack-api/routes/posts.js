const express=require('express');
const router =express.Router();
const Post=require('../models/Post');


// Getall posts
router.get('/',async(req,res)=>{
   try{
       
const posts=await Post.find();
res.json(posts);

   }catch(err){
    res.json({error: err})
}
});

// GetSpecific posts
router.get('/:id',async(req,res)=>{
    try{
        const getSpecificPost =await Post.findById(req.params.id);
        if(getSpecificPost===null){
            res.json({error: "Couldnot find Id ",id: req.params.id})
        }else{
            res.json(getSpecificPost);
        }
        
    }catch(err){
        res.json({error: err});
    }
    
    // console.log(req.params.id);
})


// POsting posts data
router.post('/',async (req,res)=>{

    const post=new Post({
    title: req.body.title,
    description: req.body.description,
    });
try{
const savedPost =await post.save();
res.send(savedPost);
}catch(err){
    res.json({error: err})
}
});


// Delete Specific posts
router.delete('/:id',async(req,res)=>{
    try{
        const findPost=await Post.findById(req.params.id);
       if(findPost===null){
           res.json({error: "Couldnot find id "+req.params.id})
       }else{
        const deletedPost = await Post.deleteOne({_id: req.params.id});
        res.json({deleted: "true",findPost});
       }
    }catch(err){
        res.json({error: "Couldnot delete an information for id:"+req.params.id})
    }
    
    // console.log(req.params.id);
})

// Updating posts
router.patch('/:id',async (req,res)=>{

    try{
        var uptitle,updescription;
        const getSpecificPost =await Post.findById(req.params.id);
        // uptitle =getSpecificPost.title;
        // updescription =getSpecificPost.description;
        
        if(req.body.title == null){
            uptitle = getSpecificPost.title;
           
        }else{
            uptitle = req.body.title;
            
        }
        if(req.body.description == null){
            updescription = getSpecificPost.description;
            
        }else{
            updescription = req.body.description;
        }
        const updatedPost= await Post.updateOne({_id: req.params.id},
            {$set :
                {title: uptitle,
                description: updescription}
            
    });
    res.json(updatedPost);
        }catch(err){
            res.json({error: err})
        }

})


module.exports =router;
const mongoose =require('mongoose')

const UserSchema =mongoose.Schema({

     email:{
        type:String,
        required:true
     },
    name:{
        type: String,
        min:5
    },
    password:{
        type: String,
        min:5
    }
})

mongoose.model("User",UserSchema,"User");
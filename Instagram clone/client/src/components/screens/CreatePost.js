import React,{useState, useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'

export default function CreatePost() {
    const [title,setTitle]=useState("")
    const [body,setBody]=useState("")
    const [image,setImage]=useState("")
    const [url,setUrl]=useState("")
    const history=useHistory();


    useEffect(()=>{   
        if(url){
            fetch('/createpost',{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    body,
                    photo:url
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                    console.log(data.error)
                    M.toast({html: "Error occured",classes:"#ef5350 red lighten-1"})
                 }else{
                     M.toast({html:"Created post sucessfully",classes:"#43a047 green darken-1"})
                  history.push('/')
                 }
            }).catch(error=>{
                console.log(error)
            })
        }

    },[url])



const postDetails=()=>{
    const data =new FormData()
    data.append("file",image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","aasish")

fetch("https://api.cloudinary.com/v1_1/aasish/image/upload",{
    method:"post",
    body:data
}).then(res=>res.json())
.then(data=>setUrl(data.url))
.catch(err=>{console.log(err)})
}



    return (
        <div className="card input-field" style={{
            maxWidth:"500px",
            margin:"10px auto",
            padding:"20px",
            textAlign:"center"
        }}>
            <input 
            type="text" 
            placeholder="Title"
            value={title}
            onChange={e=>setTitle(e.target.value)}/>
            <input 
            type="text" 
            placeholder="Body"
            value={body}
            onChange={e=>setBody(e.target.value)}/>
            <div className="file-field input-field">
      <div className="btn #64b5f6 blue darken-1">
        <span>Upload Image</span>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>
    <button className="btn waves-effect waves-light #64b5f6 blue darken-1" type="submit" name="action" onClick={()=>postDetails()}>Submit Post</button>
        </div>
    )
}

import React, { useState } from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';


export default function SignUp() {

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const history=useHistory();

    const PostData =()=>{

        if(!email || !password || !email){
            M.toast({html: "Please input all fields",classes:"#ef5350 red lighten-1"})
            return
        }
       
       if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        M.toast({html:"Invalid email",classes:"#43a047 red lighten-1"})
        return
       }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"#ef5350 red lighten-1"})
             }else{
                 M.toast({html:data.message,classes:"#43a047 green darken-1"})
              history.push('/signin')
             }
        }).catch(error=>{
            console.log(error)
        })
    }

    return (
        <div className="my-card">
            <div className="card auth-card input-field">
                <h2 className="brand-logo">Instagram</h2>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e=>setName(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" type="submit" onClick={()=>PostData()} name="action">SignUp</button>
                <h6><Link className="card-last" to="/signin">Already have an account ?</Link></h6>
            </div>
            
        </div>
    )
}

import React, { useState,useContext } from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import { userContext } from '../../App'

export default function SignIn() {

    const {state,dispatch} =useContext(userContext);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const history=useHistory();
const PostData=()=>{
    fetch('/signin',{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email,
            password
        })
    }).then(res=>res.json())
    .then(data=>{
        if(data.error){
            M.toast({html: data.error,classes:"#ef5350 red lighten-1"})
         }else{
            
             localStorage.setItem('jwt',data.token)
             localStorage.setItem('user',JSON.stringify(data.user))
             dispatch({type:"USER",payload:data.user})
             M.toast({html:"Signedin Sucessfully",classes:"#43a047 green darken-1"})
          history.push('/')
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
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>PostData()} type="submit" name="action">Login</button>
                <h6><Link className="card-last" to="/signup">Don't have an account ?</Link></h6>
            </div>
        </div>
    )
}

import React, { useContext, } from 'react'
import {Link, useHistory} from 'react-router-dom';
import { userContext } from '../App';
import M from 'materialize-css'


export default function Navbar() {
  const history=useHistory()
const {state,dispatch}=useContext(userContext);
const renderNav=()=>{
  if(state){
    return[
<li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/createpost">Create Post</Link></li>,
        <button onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push('/signin')
          M.toast({html:"Logout Sucessfully"})
        }} className="btn #c62828 red darken-3 mr-10">Logout</button>
    ]
  }else{
    return[<li><Link to="/signin">Login</Link></li>,
    <li><Link to="/signup">SignUp</Link></li>]
  }
}


    return (
        <div>
<nav>
    <div className="nav-wrapper white">
      <Link to={state?"/":"/signin"} className="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" className="right">
        {renderNav()}
        
      </ul>
    </div>
  </nav>
        </div>
    )
}


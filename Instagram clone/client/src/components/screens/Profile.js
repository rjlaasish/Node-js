import React, { useEffect,useState, useContext } from 'react'
import { userContext } from '../../App'

export default function Profile() {
const {state,dispatch}=useContext(userContext);
    const [data,setData]=useState([])
useEffect(()=>{
    fetch('/mypost',{
        headers:{
            "Authorization":localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
      setData(result.posts)
    
    })
},[])


    return (
        <div style={{maxWidth:"650px",margin:"0px auto"}}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px"
                ,borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px",objectFit:"cover"}} src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/>
                </div>
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <div style={{
                        display:"flex",
                        justifyContent:"space-between",
                        width:"108%"
                    }}>
                        <h6>40 posts</h6>
                        <h6>40 followers</h6>
                        <h6>40 following</h6>
                    </div>
                </div>
            </div>
       
<div className="gallery">
    {data.map(item=>{
       return(
        <img className="item" src={item.photo} alt="myimages" key={item._id}/>
       )
    })}
    
</div>

        </div>
    )
}

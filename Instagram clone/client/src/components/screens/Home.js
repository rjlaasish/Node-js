import React, { useState, useEffect } from 'react'

export default function Home() {
const [data,setData]=useState([])

useEffect(()=>{

    fetch('/allpost',{
        headers:{
            "Authorization":localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        setData(result.posts)
    
    })

},[]);

    return (
        <div className="home">
           {
               data.map(item=>{
                   return(
                    <div className="card home-card" key={item._id}>
                    <h5 className="card-name">{item.postedBy.name}</h5>
                    <div className="card-image">
                        <img src={item.photo} alt="postimg"/>
                    </div>
                    <div className="card-content">
                    <i className="material-icons">favorite</i>
                        <h6>{item.title}le</h6>
                        <p>{item.body}</p>
                        <input type="text" placeholder="add a comment"/>
                    </div>
                </div>
                   )
               })
           }
                        </div>
    )
}

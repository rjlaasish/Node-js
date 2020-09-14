import React, { createContext, useReducer, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Route, useHistory } from 'react-router-dom';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import SignIn from './components/screens/SignIn';
import SignUp from './components/screens/SignUp';
import CreatePost from './components/screens/CreatePost';
import { reducer, initialState } from './reducres/userReducer';


export const userContext=createContext();




function App() {

useEffect(()=>{
  const user=JSON.parse(localStorage.getItem("user"));
  dispatch({type:"USER",payload:user})
  if(user){
    
  }else{
    history.push('/signin')
  }
 
},[])


const history =useHistory()
const [state,dispatch]=useReducer(reducer,initialState);
  return (
       <>
       <userContext.Provider value={{state,dispatch}}>
        <Navbar/>
        <Route path="/" exact><Home/></Route>
        <Route path="/profile"><Profile/></Route>
        <Route path="/signin"><SignIn/></Route>
        <Route path="/signup"><SignUp/></Route>
        <Route path="/createpost"><CreatePost/></Route>
        </userContext.Provider>
       </>

  );
}

export default App;

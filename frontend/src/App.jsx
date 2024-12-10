import Sidebar from './Components/Sidebar';
import Signup from './Pages/Signup';
import './style.css/pages_common.css';
import { Router, Route, Routes, useNavigate, json } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar  from './Components/Navbar';
import Teachers from './Pages/Teachers';
import { useEffect, useState  } from 'react';


import Student from './Pages/Student';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';


import 'rsuite/dist/rsuite.min.css';
import axios from 'axios';
import Loading from './Components/Loading';
import { Loader } from 'rsuite';
import { ProfileProvider } from './context/profilecontext';
import  PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Courses from './Pages/Courses';
import Video from './Pages/Video';
import Course_Detail from './Pages/Course_Detail';
import Qr from './Pages/Qr';
import Profile from './Components/Profile';
import Header from './Components/Header';
import Dashboard1 from './Pages/Dashboard1';
import url from './misc/url';
function App() {
let [userinfo, setUserInfo] = useState();
let [login, setLogin] = useState(false);
let [user, setUser] = useState(false);
let location = useNavigate();
let [title, setTitle] = useState();


 useEffect(()=>{
  
  let item = document.getElementsByClassName("item");
 Array.from(item).forEach(Element =>{
    Element.addEventListener("mouseover", function(e){
       let id = e.target.getAttribute("item_id");
       document.getElementById(id).style.display = "block";
       Element.style.backgroundColor = "rgba(45, 136, 212, 1)";
    })
    Element.addEventListener("mouseleave", function(e){
        let id = e.target.getAttribute("item_id");
        document.getElementById(id).style.display = "none";
        Element.style.backgroundColor = "rgba(21, 34, 89, 1)";
     })
 })
 let userid = JSON.parse(localStorage.getItem('token'));
 if(userid){
   let email = userid.email;
  

   let result = axios.post(`${url}role`, {email: email}).then(function(result){
      setUserInfo(result.data[0]);
      console.log(userinfo)
      
   })
   let array = userid.name.split(" ");
let string = array[0];
let title =  string.slice(0, 1);
setTitle(title);
  
  
 }
  

setUser(JSON.parse(localStorage.getItem('token')));
setTimeout(()=>{
  setLogin(false);
  localStorage.removeItem("token");
  location('/');
  window.location.reload();
  



},3600000)



 

 },[])
 function next(e){
      
   let form = document.querySelector(".form-item");
   let email = form.email.value;
   let password = form.password.value;
   let data = {
       email: email,
       password: password
   }

   let result = axios.post(`${url}Signin`,  data).then(function (result){
       localStorage.setItem("token", JSON.stringify({token:result.data.token, email: result.data.email, name: result.data.name} ));
       alert(result.data.success);
       let userid = JSON.parse(localStorage.getItem("token"));

       axios.get(`${url}token`, {token:  userid.token});
       if(result.data.success == "signin Success"){
          
        setUser(JSON.parse(localStorage.getItem('token')));
            setLogin(true);
            console.log(login);
          
         
         
            location('/');
          

          window.location.reload();
         

         
       }
       
       

       
   }).catch((err)=>{
       console.log(err.Message);
   })
 
  
}
 function Profile_Modal(){
 document.getElementById("profile-modal").style.display = "block";
 document.getElementById("profile_icon").classList.remove("fa-caret-down");
 document.getElementById("profile_icon").classList.add("fa-caret-up")
 
 
 }
 function Profile_close(){
  document.getElementById("profile-modal").style.display = "none";
  document.getElementById("profile_icon").classList.add("fa-caret-down");
 document.getElementById("profile_icon").classList.remove("fa-caret-up")
 

 }
 function logout(){
  localStorage.removeItem('token');
  setUser(false);
  location('/');
  
 
}
  
  return (

    <>
    
   
   
    <Loading/>
    <Header Profile_Modal = {Profile_Modal} user = {user} title={title}/>
    <ProfileProvider>
    <Profile Profile_close={Profile_close} user = {user} logout={logout} role= {userinfo?userinfo.role:''}/>
    <Routes>
    <Route element = {<PrivateRoute/>}>

    
   <Route path='/Video' element={<Video role={userinfo?userinfo.role:''}/>}></Route>
   <Route path='/Course-Detail' element={<Course_Detail role={userinfo?userinfo.role:''} user = {user}/>}></Route>
   <Route path='/Qr' element={<Qr/>}></Route>
   <Route path='/Dashboard1' element={<Dashboard1/>}></Route>
   <Route path='/Teachers' element={<Teachers role={userinfo?userinfo.role:''}/>}></Route>
   <Route path='/Student' element={<Student  role={userinfo?userinfo.role:''}/>}></Route>
  <Route path='/Dashboard' element={<Dashboard role={userinfo?userinfo.role:''}/>}></Route>
    <Route path='/Courses' element={<Courses role={userinfo?userinfo.role:''}/>}></Route>
   
  


    </Route>
     <Route element = {<PublicRoute/>}>
     <Route path='/' element={<Home user = {user}/>}></Route>
     
     <Route path='/Login' element={<Login  next = {next}/>}></Route>
     <Route path='/Signup' element={<Signup/>}></Route>

     </Route>

     
    
      
      
   </Routes>
     

    </ProfileProvider>
   
    </>
  
  )
}

export default App

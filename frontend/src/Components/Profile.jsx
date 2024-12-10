import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Profile({Profile_close, logout, user, role}){

    let navigate = useNavigate();
   function admin(){
        if(role == "Student"){
            
            return;
        }
        else{
            
        navigate('/Dashboard');
    

        }
   
   }

    return(
        <>
         <div className='profile-modal max-w-60 bg-white p-3 border modal mt-20 h-fit ' style={{marginLeft: "70%"}} id = "profile-modal" onMouseLeave={Profile_close}>
         <div className='font-bold text-xl border-b-2 mt-3'>
            {user?user.name:'Hello'}
         </div>

         <div className='mt-3 text-gray-500 font-bold'>
         <Link to ="/">Home</Link> 

         </div>
         <div className='mt-3  text-gray-500 font-bold'>
         <Link to ="/">My Application</Link> 

         </div>
         <div className='mt-3  text-gray-500 font-bold'>
         <div onClick={admin} className= {`hover:${role == 'Student'?'cursor-not-allowed':'cursor-pointer'}`} >Admin</div> 

         </div>
         <div className='mt-3  text-gray-500 font-bold'>
         <Link to ="/Dashboard1">Dashboard</Link> 

         </div>
         <div className='mt-6  text-gray-500 font-bold'>
         <Link to ="/Signup">Sign up</Link> 

         </div>
         <div className='mt-3  text-gray-500 font-bold'>
        {user?<Link to ="#" onClick={logout}>Log out</Link>:<Link to ="/Login">Sign in</Link> } 
         </div>
       

         </div>
        </>
    )
}
export default Profile;
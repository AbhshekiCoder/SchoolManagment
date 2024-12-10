import  { useEffect } from 'react';

import 'rsuite/dist/rsuite.min.css';
import {Message, Loader} from 'rsuite';
import axios from  'axios';
const jwt = import('jsonwebtoken')
import { useNavigate, Link } from 'react-router-dom';


function Login({next}){
    useEffect(()=>{
        document.getElementById('Navbar').style.display = "none";

       },[])
   
  
    return(
        <>
          <div className='signup main-container  fixed' id = "main-container1">
        <h2 className=' max-sm:text-xl'>Welcome, Login to your Account</h2>
      
        
        <div> 
     
        <div className='signup-form'>
        <form className='form-item'>
        <p>its our great pleasure to have  you on board</p>
        <div className='admin-name form-item'>
            <input type = "email" placeholder='Enter the  email' name = "email" required className=''/>
        </div>
      
        <div className='email form-item'>
            <input type = "password" placeholder='Enter the password' name = "password" required className=''/>
        </div>
        
        <div className='form-item'>
            <div type='submit' onClick={next} className='w-full h-9 text-white flex justify-center items-center'style={{backgroundColor:"rgba(45, 136, 212, 1)"}}>Login</div>
        </div>
        <div className='flex justify-center  mt-5'>
            Already not have account?<Link to = "/Signup">Sign up</Link>
        </div>
        <div>

        </div>

        </form>

        </div>
       


        </div>

        </div>

        </>
    )
}

export default  Login;
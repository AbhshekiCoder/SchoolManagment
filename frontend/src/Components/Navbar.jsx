import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar({login}){
    let [userid, setUserId] = useState(false);
    useEffect(()=>{
        let user = localStorage.getItem("token");
        if(user){
            setUserId(true);
            console.log("user")
        }
      
        

    },[])
    let num = 1;
    function sidebar(){
        num++;
        if(num % 2 == 0){
            document.querySelector(".sidebar").style.display = "block";
            document.querySelector(".sidebar").classList.add("sidebar_open");

        }
        else{
            document.querySelector(".sidebar").style.display = "none";
            
         
             

        }
     

    }
    function logout(){
        localStorage.removeItem('token');
        window.location.reload();
    }
    return(
        <>
        
        <div className="  h-16 sticky-top z-10 text-gray-500  items-center   bg-white max-w-7xl ml-56  max-[1024px]:ml-0 max-[1024px]:w-full" id = "navbar"> 
         <div className="flex  h-full items-center justify-between">
         
         <div className="pl-3  h-full hidden " id = "sidebar_icon">
          <i class="fa-solid fa-bars text-2xl  h-full flex items-center  " onClick={sidebar}></i>

         </div>
         <div className=" max-[1250px]:hidden">
            
         </div>
         
         <div className="flex  navbar " style={{paddingRight: "10%"}} >
         <i class="fa-solid fa-bell text-gray-500 text-2xl"></i>
         <div className="ml-5">
         {userid == true?<a href = "#" onClick={logout}>Log out</a>:<Link to = "/Login">Log in</Link> }
           
         </div>
            
         </div>

         </div>
      

        </div>
        
        </>
    )
}
export default Navbar;
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

function Dashboard({role}){
    let [data, setData] = useState([]);
    const array = [];
    let navigate = useNavigate();
    useEffect(()=>{
      
        document.getElementById("navbar").style.display = "none";
        document.querySelector(".sidebar").style.display = "block";
        if(role == "Student"){
            document.querySelector('.container1').style.display = "none";
            document.querySelector('.student-dashboard').style.display = "block";
            let user = JSON.parse(localStorage.getItem('order'));
            setData(user);
           
        }
         document.getElementById('Navbar').style.display = "none";

       
    },[]);
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
    function syllabus(id){
        localStorage.setItem("topic_id", id);
        navigate('/Video');


    }
    
    return(
        <>

       <Sidebar/>
       <Navbar/>
<div className='modal w-44 h-16 btn z-10'>
        <button  className='flex  justify-around w-full h-full text-white items-center'><i class="fa-solid fa-headset"></i><div>Support</div><i class="fa-solid fa-angle-up"></i></button>

    </div>
       
      
      

    <div className="   ">
    <div className = "header3 ">
        <div className="header flex  justify-between  h-24 items-center header1 ">
       
        <div className="hidden pl-3 " id = "sidebar_icon">
        <i class="fa-solid fa-bars text-2xl  h-full flex  " onClick={sidebar} ></i>

        </div>

        
        <div className=" max-w-lg font-sans text-gray-500 header1-items max-md:hidden" >
        Learn how to launch faster watch our webinar for tips from our experts and get a limited time offer.
        </div>
        <div className="flex justify-between mr-16">
        <div>
        <i class="fa-solid fa-bell text-2xl text-gray-500 "></i> 

        </div> 
        <button className=" w-32 text-white rounded-lg ml-11" style={{backgroundColor: "rgba(80, 156, 219, 1)"}}>
            logout
        </button>

        </div>
        
       

        </div>
        
     </div>
     <div className="container1   mt-16">
        <div className="w-fit m-auto ">
        <div className=" text-4xl font-sans font-semibold text-gray-600 max-md:text-3xl max-[479px]:text-2xl text-center" >
        Welcome to your dashboard, Udemy school
        </div>
        <div className="mt-3  ml-9 text-2xl font-semibold text-gray-600 max-[479px]:text-xl">
        Uyo/school/@teachable.com
        </div>
        <div className = "mt-16">
        <div className="row max-w-lg ">
         <div className="col-1 flex items-start w-fit max-md:m-auto">
         <i class="fa-solid fa-user text-blue-900 p-2 " style={{backgroundColor: "rgba(239, 243, 250, 1)"}}></i>

         </div>
         <div className="col-md">
         <div className=" text-2xl font-medium max-md:w-fit max-md:m-auto">
         Add other admins
         

         </div>
         <div className=" max-w-96 text-xs mt-3 flex  max-md:w-fit max-md:m-auto max-md:text-center">
         Create rich course content and coaching products for your students. When you give them a pricing plan, they’ll appear on your site!
         </div>

         </div>

        </div>
        <div className="row max-w-lg mt-3 ">
         <div className="col-1 flex items-start w-fit max-md:m-auto">
         <i class="fa-solid fa-building-columns text-blue-900 p-2 " style={{backgroundColor: "rgba(239, 243, 250, 1)"}}></i>

         </div>
         <div className="col-md">
         <div className=" text-2xl font-medium max-md:w-fit max-md:m-auto">
          Add Classes

         </div>
         <div className=" max-w-96 text-xs mt-3 flex  max-md:w-fit max-md:m-auto max-md:text-center">
         Create rich course content and coaching products for your students. When you give them a pricing plan, they’ll appear on your site!
         </div>

         </div>

        </div>
        <div className="row max-w-lg mt-3">
         <div className="col-1 flex items-start w-fit max-md:m-auto">
         <i class="fa-brands fa-google-scholar text-blue-900 p-2 " style={{backgroundColor: "rgba(239, 243, 250, 1)"}}></i>

         </div>
         <div className="col-md">
         <div className=" text-2xl font-medium max-md:w-fit max-md:m-auto">
         Add Students
         

         </div>
         <div className=" max-w-96 text-xs mt-3 flex  max-md:w-fit max-md:m-auto max-md:text-center">
         Create rich course content and coaching products for your students. When you give them a pricing plan, they’ll appear on your site!
         </div>

         </div>

        </div>

        </div>

        </div>
        
     </div>
     <div className="student-dashboard hidden max-w-3xl m-auto border p-3">
     <table className="w-full">
        <tr>
            <th className=" font-bold text-lg">
                name
            </th>
           
            
            <th className=" font-bold text-lg">
                go to training
            </th>
        </tr>
        {data?data.map((Element)=>(
            <tr className="mt-3 p-3 h-10 border-b-2">
                <td className="font-bold">{Element.name}</td>
              
                <td><button className=" w-36 h-9 bg-blue-500 text-white rounded-xl" onClick={()=>syllabus(Element.id)}>Go to Training</button></td>
            </tr>

        )):''}
     </table>
        
     </div>
 

    </div>
        


      

        </>
    )
}
export default Dashboard;
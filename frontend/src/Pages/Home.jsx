

import 'rsuite/dist/rsuite.min.css';
import {Message, Loader} from 'rsuite';
import { useEffect,useState } from 'react';
import wave_hand from '../Assets/waving-hand.svg';
import trending_img from '../Assets/Screenshot_27-7-2024_122136_internshala.com.jpeg';
import java from '../Assets/java.png';
import react from '../Assets//react.png';
import persoinality_devlopment from '../Assets/personality devlopment.jpeg';
import bussiness_training from '../Assets/bussiness training.jpeg';

import project from '../Assets/projectm.jpeg';
import finanancle from '../Assets/financwle busjjd.jpeg';
import webdevlopment from '../Assets/web devlopment.jpeg';
import '../style.css/Home.css';
import {SwiperSlide, Swiper} from 'swiper/react';
import {Navigation, Pagination, Scrollbar} from 'swiper/modules';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import 'swiper/css/pagination';
import axios from 'axios';
import { useLocation, useNavigate, useNavigation, Link } from 'react-router-dom';
import Header from '../Components/Header';
import url from '../misc/url'




function Home({user}){
   
    let [input, setInput] = useState();
    let navigate = useNavigate();
    useEffect(()=>{
        document.querySelector('.btn').style.display = "block";
        console.log(user);
        document.getElementById("Navbar").style.display = "flex";
     
            
    },[])

    function Input(e){
        let title = e.target.value;
      
       setInput(title);

    }
    function Search(){
        let user = JSON.parse(localStorage.getItem("token"));
       if(user){
        let obj = {
            email: user.email,
            input: input
        }
        let result = axios.post(`${url}search`, obj).then(result =>{
            console.log(result.data);
             if(result.data == false){
                localStorage.removeItem("data");
                navigate('/Course-Detail');
             }
                
             else{
              
                let obj = {
                    detail: result.data.data.detail,
                    name: result.data.data.name,
                    price: result.data.data.price,
                    _id: result.data.data._id,
                    buy: result.data.buy
                }
                localStorage.setItem("data", JSON.stringify(obj));
                navigate('/Course-Detail');

             }

             
                
    

            
          
          
         })
       }
}

    function course(e){
        
        if(e.key == "Enter"){
            let user = JSON.parse(localStorage.getItem("token"));
            let obj = {
                email: user.email,
                input: input
            }
        let result = axios.post(`${url}search`, obj).then(result =>{
                
                  if(result.data == false){
                    localStorage.removeItem("data");
                    navigate('/Course-Detail');
                 }
                    
                 else{
                  
                    let obj = {
                        detail: result.data.data.detail,
                        name: result.data.data.name,
                        price: result.data.data.price,
                        _id: result.data.data._id,
                        buy: result.data.buy
                    }
                    localStorage.setItem("data", JSON.stringify(obj));
                    navigate('/Course-Detail');
    
                 }
    
            

          })

        }
    }

    function left(){
        document.querySelector('.course-container').scrollLeft += 390;

    }
    function right(){
        document.querySelector('.course-container').scrollLeft -= 390;


    }
    let courses = document.getElementsByClassName("course-item")
   


    
    
    
  
    return(
        <>
         
        <div className='w-full h-full '>
        <div className='modal w-44 h-16 btn z-10'>
             <button  className='flex  justify-around w-full h-full text-white items-center'><i class="fa-solid fa-headset"></i><div>Support</div><i class="fa-solid fa-angle-up"></i></button>

        </div>
       
        <div className='  max-[786px]:pl-0 mt-3'>
        <div className=' max-w-6xl m-auto mt-36  '>
         {user?<h1 className=' text-3xl font-bold grid justify-center mt-16 font-serif max-md:text-2xl max-sm:text-xl text-center'>Hii, {user.name}<p className='font-light text-xl mt-3'>Let’s help you land your dream career</p></h1>:<h1 className=' text-5xl font-bold flex justify-center mt-16 font-serif max-md:text-3xl max-sm: text-2xl text-center'>Make your dream career a reality</h1>} 
        <div className='search max-w-96 mt-10 h-10 flex bg-gray-100 '>
        <input type='text'  placeholder='search like butterfly' className='w-full  h-full bg-gray-100' onChange = {Input}  onKeyDown={course} /><i class="fa-solid fa-magnifying-glass flex items-center text-2xl  p-2 " onClick={Search}></i>

        </div>

        <div className='mt-16'>
        <div className='flex w-fit m-auto '>
        <div className='flex'>
        <p className='text-2xl font-bold'>Trending on Edureta</p> <img src = {trending_img} className='ml-3' style={{backgroundColor: "#e3fafa"}}/> 

        </div>
          
        

        </div>
       
        

        </div>

        <div className='courses '>
        
        
        <div className='course-container   '>
        <div className='left-arrow  rounded-circle' onClick={left}>
        <i class="fa-solid fa-arrow-right text-xl rounded-circle  "></i>
        </div>
        <div className='right-arrow rounded-circle ' onClick={right}>
        <i class="fa-solid fa-arrow-left text-xl rounded-circle"></i>
        </div>
        

        <div className='course-item  rounded-xl' >
        <img className = ' rounded-xl' src = {react} />

        </div>
        <div className='course-item  rounded-xl'>
        <img className = ' rounded-xl' src = {webdevlopment} />

        </div>
        <div className='course-item  rounded-xl' >
        <img className = ' rounded-xl' src = {java}/>

        </div>
        <div className='course-item  rounded-xl'>
        <img className = ' rounded-xl' src = {bussiness_training} />

        </div>
        <div className='course-item  rounded-xl' >
        <img className = ' rounded-xl' src = {finanancle} />

        </div>
        <div className='course-item  rounded-xl' >
        <img className = ' rounded-xl' src = {persoinality_devlopment} />

        </div>






        </div>
       
        </div>
      
      

        </div>

        </div>

       

        </div>
        

        
        

          
        </>
    )
}
export default Home;
import { useEffect, useState } from "react";
import '../style.css/course_detail.css';
import axios from "axios";
import {loadStripe} from  '@stripe/stripe-js';
import Header from "../Components/Header";
import { Link, useNavigate } from "react-router-dom";
import url from "../misc/url";
function Course_Detail({role, user}){
    let [data, setData] = useState();
    let [title, setTitle] = useState(false);
   
    let [topicid, setTopicId] = useState();
    let [data1, setData1] = useState();

    let navigate = useNavigate();
    useEffect(()=>{
        let data2 = JSON.parse(localStorage.getItem("data"));
        
        if(data2){
            setData(data2);
            setTitle(data2.buy)
            let id = data2._id
            setTopicId(id);
          
        let result1 = axios.post(`${url}course_syllabus_details`,{id}).then(result2 =>{
           
    
            
            let array = result2.data;
            let array1 = [];
            let prv  = 0;
            console.log(result2.data)
           
            let name = -1;
            for(let i = 0; i< array.length; i++){
                if(array[i].topic_id != prv){
                    name++;
                    let obj = {
                        title: [],
                        name: array[i].topic_id
                    }
                    array1.push(obj);
                    array1[name].title.push(array[i].name);
                    
                 
                    console.log(name)
                    
                }
                else{
                     array1[name].title.push(array[i].name)
                    

                }
                prv = array[i].topic_id;
               
            }
            setData1(array1);
            console.log(array1);
            console.log(data1)
          
    
            
           
        })
        
        }

        
     
        


       
       
        
      

    },[])
     

    function read_more(){
      
        document.getElementById("content-hide").style.maxHeight = "200px";
        document.querySelector('.read-more').style.display = "none";
        document.querySelector('.read-less').style.display = "block";
    }
    function read_less(){
        document.getElementById("content-hide").style.maxHeight = "35px";
        document.querySelector('.read-more').style.display = "block";
        document.querySelector('.read-less').style.display = "none";

    }
 
    let num = 1;
    let prev;
    let next;
    function syllabus(name){
        num++;
        if(num % 2 == 0){
            
       
                document.getElementById(name).style.height = "fit-content";





        }
        else{
           
                document.getElementById(name).style.height = "0px";

            
            

        }
        
       
    }
  
    let payment = async()=>{
        if(role == 'Teacher' || role == 'Admin'){
            return;
        }
        if(!user){
            console.log(user)
            navigate('/Login');
            
        }
       
        let data = JSON.parse(localStorage.getItem("data"));
        let user1 =JSON.parse(localStorage.getItem("token"));
        let training = new Date();
        console.log(training.getMonth())
        let stripe =  await loadStripe("pk_test_51PauGq2Lcv7rdblxzjzMQaPLB5U41MemRItHaWFLUh3L9WkuYkkt4PUnxJTUDnmsY4brCiJcKBP8FOi0O1KNYEDj00LjmU5Y9H")
        let obj = {
            name: data.name,
            price: data.price,
            detail: data.detail,
            email: user1.email,
            id:  topicid

        }
        const response = await axios.post("http://localhost:5000/payment", obj).then((result1)=>{
            console.log(result1.data);
            stripe.redirectToCheckout({
              sessionId: result1.data.id
           
             })
             console.log(result1.data.data)
             
             let obj = {
                email: result1.data.data,
                name: result1.data.name,
                id: topicid
                
             }
             let array = JSON.parse(localStorage.getItem("order"))||[];
             array.push(obj)
             localStorage.setItem("order", JSON.stringify(array));
             
          });
    }

    return(
        <>
     
        {data?<div className="maincontainer h-full w-full">
        <div className=" max-w-5xl m-auto ">
        <div class="course-intro mt-9">
            
            <div class="heading row">
                <div class="intro-detail col-md">
                    <h5>Certified Training</h5>
                    <div class="tarining-heading">
                         {data.name}                   </div>
                    <div class="course-detail">
                       {data.detail}                 </div>
                    <div class="language">
                        <i class="fa fa-volume-up rounded-circle"></i>  hindi                    </div>
                    <div class="rating row">
                        <div class="col-md" id="rating">
                            <i class="fa fa-star"></i> 5                        </div>
                        <div class="col-md" id="students">
                            <i class="fa fa-user"></i> 4000students
                        </div>
                        <div class="col-md" id="placement">
                            <i class="fa fa-handshake-o"></i> Placement Assistance 
                        </div>
                    </div>
                    <div class="schedule">
                        <i class="fa fa-calendar-check-o"></i> 4 weeks, 1hr/day(flexible schedule)
                    </div>
                    <div class="offer">
                        <b>1+1 Offer:</b>
                        Get Internship &amp; Job Preparation training <b>FREE</b> on purchase of Android APP Devlopment Training!
                    </div>
                </div>
                <div class="col-md price flex justify-end">
                 {title == true?<div className=" w-60 h-fit bg-white rounded-md p-3">
                 <h1 className="font-bold text-xl">Continue to Dashboard</h1>
                 <button className="p-2 bg-blue-500 rounded-xl text-white h-9 w-full mt-3 font-bold"><Link to = "/Dashboard1">Go To Dashboard</Link></button>
                    
                 </div>:
                 <div class="price-input">
                       
                          
                       <h5>Training Price</h5>
                     <div class="cost">{data.price}</div>
                     <button onClick={payment}>Pay now</button>

                       
                        
                         
                     
                    
                 </div>}
                    

                </div>
                

            </div>
            
        </div>
        <div class="course-highlight">
            <h1 className="text-2xl">Course highlight</h1>
            <div class="input-label row">
                <div class="col-md">
                    <div class="input-group row">
                       <div class="input-icon col-1 ">
                        <i class="fa fa-play-circle"></i>
                       </div>
                        <div class="input-type left-5 border-solid col-8">
                            <b>Learn Online</b>
                            <p>At Your Own Sechdule</p>

                        </div>

                    </div>
                    <div class="input-group row">
                        <div class="input-icon col-1 ">
                         <i class="fa fa-commenting-o"></i>
                        </div>
                         <div class="input-type left-5 border-solid col-8">
                             <b>Doubt Clearining </b>
                             <p>Trough Q&amp;Fourms</p>
 
                         </div>
 
                     </div>
                     <div class="input-group row">
                        <div class="input-icon col-1 ">
                         <i class="fa fa-download"></i>
                        </div>
                         <div class="input-type left-5 border-solid col-8">
                             <b>Download Content</b>
                             <p>With Life Time Access</p>
 
                         </div>
 
                     </div>
                   
                </div>
                <div class="col-md">
                    <div class="input-group row">
                        <div class="input-icon col-1 ">
                         <i class="fa fa-mobile"></i>
                        </div>
                         <div class="input-type left-5 border-solid col-8">
                             <b>Mobile Friendly</b>
                             <p>At Your Own Sechdule</p>
 
                         </div>
 
                     </div>
                     <div class="input-group row">
                        <div class="input-icon col-1 ">
                         <i class="fa fa-cog"></i>
                        </div>
                         <div class="input-type left-5 border-solid col-8">
                             <b>Building 4 Projects</b>
                             <p>To Help You To Practicing</p>
 
                         </div>
 
                     </div>
                     <div class="input-group row">
                        <div class="input-icon col-1 ">
                         <i class="fa fa-line-chart"></i>
                        </div>
                         <div class="input-type left-5 border-solid col-8">
                             <b>Beginer Friendly</b>
                             <p>No Prior Knowledge Required</p>
 
                         </div>
 
                     </div>



                    
                    
                </div>
                <div class="col-md">
                    <div class="input-group row">
                        <div class="input-icon col-1 ">
                         <i class="fa fa-handshake-o"></i>
                        </div>
                         <div class="input-type left-5 border-solid col-8">
                             <b>Placement Assistance</b>
                             <p>To Build a Carrier</p>
 
                         </div>
 
                     </div>
                     <div class="input-group row">
                        <div class="input-icon col-1 ">
                         <i class="fa fa-volume-up"></i>
                        </div>
                         <div class="input-type left-5 border-solid col-8">
                             <b>Learn In English/Hindi</b>
                             <p>As Your Per Choice</p>
 
                         </div>
 
                     </div>
                     <div class="input-group row">
                        <div class="input-icon col-1 ">
                         <i class="fa fa-calendar-o"></i>
                        </div>
                         <div class="input-type left-5 border-solid col-8">
                             <b>4 weeks Duration</b>
                             <p>1hr/Day (flexible Sechdule)</p>
 
                         </div>
 
                     </div>
                   

                </div>
                
            </div>
        </div>
        <div class="coursedetail row">
            <div class="col-md">
                <h2 class="heading"><b className="text-2xl"> Learn {data.name}?</b></h2>
                <div class="point">
                    <p class="sub-heading">Popularity</p>
                    <p class="description">With 2.6Mn apps on Play Store and 75 Billion downloads a year, Android App Development is one of the most popular skills today.</p>
                </div>
                <div class="point">
                    <p class="sub-heading">Build your own app</p>
                    <p class="description">Imagine an app on Play Store under your name. There is nothing more exciting than that!</p>
                </div>
                <div class="point">
                    <p class="sub-heading">Lucrative salary</p>
                    <p class="description">The Android Developers earn as high as 9 LPA+ according to Glassdoor.</p>
                </div>

            </div>
            <div class="col-md">
                <img src="pictures/Android App Development Course_ Learn Android Online with Certificate and 4 more pages - Personal - Microsoft&ZeroWidthSpace; Edge 2_20_2024 5_51_36 PM (1).png"/>
            </div>
        </div>
        <div class="syllabus-conatiner">
        <h1>{data.name} Training Syllabus</h1>
       <div class="syllabus-content">
        <div class="syllabus-input">
        
           <div class="content-icon"> <i class="fa fa-play-circle"></i> </div><b>
                        28 video Content</b>
        </div>
        <div>
            <div class="content-icon"><i class="fa fa-cog"></i> </div><span><b>4 + projects</b></span>
        </div>
       </div>
       <h5>After completed an this syllabus you can download videos</h5>
       <div class="syllabus">
             {
                data1?data1.map((Element)=>(
                    <div class="introduction"  syllabus_id="1" onClick={() =>syllabus(Element.name)}>
            <div class="intro row">
                <div class="col-5">
                     {Element.name}
                </div>
                <div class="col-6" id="icon1">
                    <i class="fa fa-chevron-down" ></i>
                    
                </div>
               


            </div>
            <div class="syllabus-content">
                                <div class="syllabus-input">
                   
                   <div class="content-icon"> <i class="fa fa-file-text-o"></i> </div>{Element.title.length} topics
                    
                
                </div>
                <div>
                   
                    <div class="content-icon"><i class="fa fa-play-circle"></i> </div><span>2 video inside</span>
                </div>
            </div>
            <div class="syllabus-list  " id = {Element.name}>
                <ol type = "circle">
                   
                    {Element.title.map((Element)=>(
                       
                       <li className="mt-2 font-medium  text-lg   ">{Element}</li>

                       
                ))}
                   
                    
                                        
                </ol>
            </div>
          
                   </div>

                )):<h1>loading...</h1>
             }
               
                
       </div>
       
    </div>
        <div class="course-overview ">
        <h1>Android APP DevlopmentCourse Overview</h1>
        <div class="course-content ">
        <p>In a digitally dominated world, people spend more time on mobile applications than on web pages or website searches. Android-based applications like e-commerce, social media communications, and gaming are the most popular. A study says that the number of app downloads exceeded 142 billion and is expected to reach 200 billion by 2025. As a result, Android development has emerged as one of the most in-demand skills in the job market.&nbsp;</p>
       <p>&nbsp;</p>
      
       <p>To gain expertise in this field, taking an Android Development course is ideal. Internshala’s course on Android development is a unique government-certified online training from NSDC (National Skill Development Corporation) &amp; Skill India. This course will equip learners with the right skills required to land their dream Android development job.</p>    
        </div>
        <div class="max-h-9 overflow-hidden" id="content-hide">
            <h1>Android APP Devlopment Online Course Outien</h1>
            <p>The course outline covers all the knowledge areas and skills that are required for enthusiastic learners to become skilled Android developers. It starts with a basic understanding of what Android is, its working environment, and the tools that are used to develop an Android application. Learners will also gain a logical understanding of writing code using the most important Android programming language, Kotlin.&nbsp;</p>
            Moving ahead, the participants will discover a comprehensive understanding of setting up an environment to develop an app with all the necessary components. It will walk you through the advanced concepts associated with Android development and its functionalities. The course will end with final completion only when the participants successfully submit a final project of their choice, that is, building an Android application from scratch.      
        </div>
        <div className="">
            <button className="text-blue-600 read-more" onClick={read_more}>read more</button>
            <button className="text-blue-600 read-less hidden" onClick={read_less}>read less</button>
        </div>
      
        </div>

        </div>

        </div>:<div className="flex justify-center font-bold text-3xl mt-60">This Course is not Avaliable</div>}
      
      
        </>
    )
}

export default Course_Detail;
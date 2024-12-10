import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "rsuite";
import '../style.css/video.css';
function Video(){
    let [modules, setModules] = useState();
    let [topic, setTopic] = useState();
    let [video, setVideo] = useState();
    useEffect(()=>{
        let id = localStorage.getItem("topic_id");
       
      
        let result = axios.post('http://localhost:5000/modules',{id}).then(result =>{
            setModules(result.data);
            console.log(result.data)
            
           
        })

        setTimeout(()=>{
            document.querySelector('.arrow').style.display = "block";

        },2000)

        setTimeout(()=>{
            document.querySelector('.arrow').style.display = "none";

        },9000)
      
        
    
        },[] )

     
        function select_topic(e){
            console.log(e.target.value);
           let name = e.target.value;
           document.querySelector(".loading3").style.display = "block";
           let result = axios.post('http://localhost:5000/topics', {name}).then(result =>{
        
            setTopic(result.data);
         
           
            console.log(result.data)
           
            
           
           })

           
     

        }
        useEffect(()=>{
           
                
                document.querySelector(".loading3").style.display = "none";
           

          
                
            

        },[topic]);
       function fetch_video(e) {
        setVideo("");
            let id = e;
            console.log(id)
            let result = axios.post('http://localhost:5000/video', {id}).then(result =>{
        
                setVideo(result.data);
                console.log(result.data);             
               
                
            })
         
        }
    return(
        <>
        <div className=" absolute z-10 ml-36 mt-16 hidden arrow" style={{color: "rgb(232, 190, 172)"}}>
        <i class="fa-solid fa-hand-middle-finger text-3xl"></i>
       </div>   
        <div className="container1  h-full border row "  >
        <div className="col-md max-w-64 border  overflow-y-auto p-6" style={{height: "650px"}}>
        <h5 className="font-bold text-gray-500 text-xl  ">Module</h5>
        <select className="w-full h-10 mt-3" onChange={select_topic}>
            <option value="default">select modules</option>
            {modules?modules.map((Element)=>(
                <option value={Element.name} className={Element.name} id ={Element._id}>{Element.name}</option>

            )): <option className="flex justify-center items-center"><Loader speed="normal" /></option>}
           
        </select>
        <h5 className="font-bold text-gray-500 text-xl mt-6">Topics</h5>
        {topic?topic.map((Element)=>(
        <div className="topics mt-3 p-3 border" id = {Element._id} onClick={()=>fetch_video(Element._id)}>
        <div className="">
        <div>{Element.name}</div>
       

        </div>
        <div className="flex mt-3">
         {Element.type.includes("image")?<i class="fa-solid fa-file"></i>:<i class="fa-brands fa-youtube"></i>}
        
        <div className="ml-3">{Element.name}</div>
        </div>

        </div>
        
            

        )):<div><Loader speed = "normal"/></div>}
       
        


        </div>
        <div className="col-md border p-3   flex justify-center">
        {video? video.map((Element)=>(
            <> 
            {Element.type.includes("image")?<img src ={`data:${Element.type};base64,${Element.file}`} className=" max-w-4xl h-full"/>: <video src = {`data:${Element.type};base64,${Element.file}`} className="max-w-4xl h-full " controls></video>}
           
           
            </>


        )):<div className="flex justify-center w-full h-full items-center"><Loader speed = "normal"/></div>}
       
        </div>

        </div>
       <div className=" loading3 modal border flex  ">
       <div className="w-full h-full flex justify-center items-center">
       <Loader speed="normal"/> 

       </div>
     
       </div>  
         

        </>
    )
}


export default Video;
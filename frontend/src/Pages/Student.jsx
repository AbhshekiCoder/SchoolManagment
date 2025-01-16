import { useEffect, useState } from 'react';
import axios from 'axios';
import '../style.css/teachers.css';
import bg from '../Assets/teac.png';

import { Loader } from 'rsuite';
import { Message } from 'rsuite';

import '../style.css/student.css';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';


function Student({role}){
    let [data, setData] = useState();
    let [file, setFile] = useState();
    let [profile, setProfile] = useState();
    useEffect(()=>{
        document.getElementById('navbar').style.display = "block";
        document.getElementById('Navbar').style.display = "none";

    
        },[] )
       
    
    let count = 1;
    function form(){
        if(role == "Student"){
            alert("only teacher can add students ");
            return;
        }

        count++;
        if(count % 2 == 0){
            document.querySelector(".stu-form").style.display = "block";

        }
        else{
            document.querySelector(".stu-form").style.display = "none";
        }
       
    }
    function array(){
        let result = axios.post('http://localhost:5000/Students').then(result =>{
            setData(result.data);
            console.log(result.data)
            
           
        })
    }
     
    
    function submit(e){
        
        e.preventDefault();
        let form = document.forms['form'];
        let name = form.name.value;
        
        let email = form.email.value;
        let address = form.address.value;
        let Class = form.class.value;
        let subject = form.subject.value;
        let gender = form.gender.value;
        let password = form.password.value;
        let phone = form.phone.value;
        let formData = new FormData();
       formData.append('file', file);

       formData.append('name', name);
       formData.append('email', email);
       formData.append('password', password);
       formData.append('address', address);
       formData.append('Class', Class);
       formData.append('subject', subject);
       formData.append('gender', gender);
       formData.append('phone', phone);

        document.querySelector(".form").style.display = "none";
        document.getElementById("loading").style.display = "block";
        let result = axios.post("http://localhost:5000/Student", formData).then((result)=>{
            
           setTimeout(()=>{
           
          
            document.getElementById("message").innerText = "updated";
            document.querySelector('.message').style.display = "block";
            setTimeout(()=>{
                document.querySelector('.message').style.display = "none";

            },2000)
            document.getElementById("loading").style.display = "none";
            document.querySelector('.stu-form').style.display = "none";
            setData(result.data.data);
            
            
            
           },2000)
        })
       
    }
    function filter(e){
        
        let data = e.target.value;
        if(data == "default"){
            array();
            return;
        }
        let result = axios.post('http://localhost:5000/filter', {data} ).then(result =>{
            
            setData(result.data);
            console.log(data);
           
        })


    }
  function filter1(e){
    let data = e.target.value;
    if(data == "default"){
        array();
        return;
    }
    let result = axios.post('http://localhost:5000/filter1', {data} ).then(result =>{
        
        setData(result.data);
        console.log(data);
       
    })

  }
 
  function search_filter(e){
    setTimeout(()=>{
        search_data(e.target.value);

    },2000)
    
  

  }
  function search_data(data){
    let result = axios.post('http://localhost:5000/filter2', {data} ).then(result =>{
        
        setData(result.data);
        console.log(data);
       
    })

  }

    useEffect(()=>{
        document.querySelector('.btn').style.display = "block";
        array();
       
      
      

    },[]);
    const handleFileChange = (e) => {
        
        setFile(e.target.files[0]);
      };

  
function content(e){
    document.querySelector('.support').style.display = 'none';
   
    let id =  e.target.getAttribute('itemid');
    let result = axios.post('http://localhost:5000/profile', {id}).then(result =>{
        setProfile(result.data);
        console.log(profile)
        document.querySelector('.student-profile').style.display = 'block';
       
        
       
    })



}
function profilemodal(){
    document.querySelector('.student-profile').style.display = 'none';
    document.querySelector('.support').style.display = 'block';
   


}
function register_modal(){
    document.querySelector('.stu-form').style.display = 'none';
}


   
  
    return(
        <>
         <Sidebar/>
         <Navbar />
        <div className=' absolute w-fit   z-10  mt-6 message hidden  ' style={{marginLeft: "45%"}} >
        <Message type="success">
            <strong id = "message"></strong>
         </Message>;
     

        </div>
        <div className='modal w-44 h-16 btn z-10 support'>
        <button  className='flex  justify-around w-full h-full text-white items-center'><i class="fa-solid fa-headset"></i><div>Support</div><i class="fa-solid fa-angle-up"></i></button>

        </div>
       
        <div className="containerss">
        <div className="headbar pl-3 flex ">
        <div className="text-grey-400 w-fit text-gray-500 flex items-center ">
            Students
        </div>
        <div className="flex justify-end w-full ">
        <button className=" border-none pr-3 text-sky-500 ml-5">
            Export csv
        </button>
        <button className="rounded-xl ml-3 p-2 text-white bg-sky-500" onClick={form}>
            Add Students
        </button>

        </div>

        </div>
        <div className='search  flex max-[378px]:flex-wrap'>
            <div className='w-fit flex items-center'  style={{backgroundColor: "rgba(252, 250, 250, 1)"}}>
                <select className=' w-40 max-[479px]:w-24' onChange={filter}  style={{backgroundColor: "rgba(252, 250, 250, 1)"}}>
                    <option value="default">filter by gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <div className='w-fit flex items-center ml-3' style={{backgroundColor: "rgba(252, 250, 250, 1)"}}>
                <select className=' w-40 bg-gray-100 max-[479px]:w-24' onChange={filter1} style={{backgroundColor: "rgba(252, 250, 250, 1)"}}>
                    <option value="default">filter by class</option>
                    <option value="frontend">frontend</option>
                    <option value="backend">backend</option>
                    <option value="fullstack">fullstack</option>
                    <option value="tester">tester</option>
                    <option value="manager">manager</option>
                  
                </select>
            </div>
            <div className='w-full flex bg-gray-100 h-10 items-center pl-3 ml-3 max-[378px]:m-auto max-[378px]:mt-3' style={{backgroundColor: "rgba(252, 250, 250, 1)"}}>
            <i class="fa-solid fa-magnifying-glass text-gray-300"></i><input type='text' className='w-full border-none bg-gray-100 ml-3 h-full' placeholder='search for a student by name or email' onInput={search_filter} style={{backgroundColor: "rgba(252, 250, 250, 1)"}}/>
               
            </div>
        </div>
        <div className='content h-fit '>
        {
          data? <table className='w-full'>
         <tr className='  h-10' style={{backgroundColor: 'white'}}>
       
         <th className=' font-bold '>
                Name
         </th>
         <th className=' font-bold'>
                Student ID
        </th>
         <th className=' font-bold'>
               Email address
          </th>
         <th className=' font-bold '>
             Class
         </th>
         <th className=' font-bold '>
                Gender
         </th>

         </tr>
         {data?data.map((Element, count)=>(
            <tr className= ' h-10 font-sans text-gray-600 font-bold items content hover:bg-sky-600 hover:text-white' id = "items" itemid = {Element._id} onClick = {content} >
                <td  itemid = {Element._id}><div className='flex  items-center'  itemid = {Element._id}>{Element.img?<img src =  {`data:$image/png;base64,${Element.img}`} className='  w-7 h-7 mr-3 object-cover rounded-circle'/>:''} {Element.name}</div></td>
                <td  itemid = {Element._id}>{Element._id}</td>
                <td  itemid = {Element._id}>{Element.email}</td>
                <td  itemid = {Element._id}>{Element.Class}</td>
                <td itemid = {Element._id}>{Element.gender}</td>
            </tr>
            
         )):<div className='loading1'><Loader speed="normal"/></div>}
            
         </table>:  <div  Name=''>
        <div className=' max-w-64 m-auto  h-40 '>
            <img src = {bg} className='w-full h-full'/>
        </div>
        
        <div class="data1">
        No Students at this time
        </div>
        <div className='flex justify-center'>
        <Loader speed="normal" />

        </div>
       
        <div className='data2'>
        Students will appear here after they enroll in your school.
        </div>

        </div>
      


       
        }
       
        
       
   
        </div>
        
      
       

        </div>
       
       


        <div className = "stu-form  border modal  w-screen h-screen" >
        <form name = "form" onSubmit={submit} className=' max-w-4xl  h-fit p-3  z-10  bg-white form mt-0 m-auto'>
        <din className = "flex justify-end "><i className='fa-solid fa-circle-xmark hover:text-xl' onClick={register_modal}></i></din>
        <div className='flex justify-between '>
            <div className=' text-4xl text-gray-400 font-semibold  max-[768px]:text-2xl'>Add Students</div>
            <div className=' max-w-64'>
            <label>Designation</label>
            <input  className='w-full border h-10' name = "address"/>
            </div>

        </div>
        <div className='flex max-w-60 font-semibold justify-between'>
        <div className=' text-gray-400 '> Manually</div>
        <div className='text-gray-400'>Import Csv</div>

        </div>
     
        <div className='name max-w-2xl mt-5'>
        <label className=''>Full Name</label>
        <input type = "text" className='w-full border h-10' name = "name" required/>

        </div>
        <div className='flex justify-between   mt-6 max-[768px]:flex-wrap max-[768px]:mt-3'>
        <div className=' max-w-80 '>
            <label className=''>Email Address</label>
            <input type = "email" className = "w-full border h-10" name = "email" required/>
        </div>
        <div className=' w-44  flex items-end '>
        <select className=' w-full border h-10 ' name='class' required>
        <option >
            Class
        </option>
        <option value="frontend"> frontend</option>
                    <option value="backend">backend</option>
                    <option value="fullstack">fullstack</option>
                    <option value="tester">tester</option>
                    <option value="manager">manager</option>
                  
        </select>

        </div>
        <div className='w-44 flex items-end '>
        <select className='w-full border h-10 ' name = "gender" required>
        <option>Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="another">Another</option>

        </select>

        </div>

        </div>
        <div className='mt-5 flex justify-between max-w-xl max-[768px]:flex-wrap max-[768px]:mt-3'>
        <div className='password max-w-80'>
            <label className='' >Password</label>
            <input type = "password "  className='w-full  border h-10' name = "password" required/>
        </div>
        <div className='max-w-80'>
        <label className=''>Number</label>
        <input type = "number" className='w-full border h-10' name = "phone" required/>

        </div>

        </div>
        <div className=' max-w-80 mt-3'>
        <select  className='w-full border h-10' name='subject' required >
        <option>Age</option>
        <option value="18">18</option>
        <option value ="19">19</option>
        <option value ="20">20</option>
        <option value = "21">21</option>
        <option value = "22">22</option>
        <option value = "23">23</option>
        <option value = "24">24</option>
        <option value="25">25</option>
        <option value="26">26</option>
        <option value="27">27</option>
        <option value="28">28</option>
        <option value="29">29</option>
        <option value="30">30</option>
        </select>

        </div>
        <div className=' max-w-fit  flex justify-between items-center mt-3'>
        <div className='flex'>
        <div>
        <i className="fa-solid fa-circle-plus text-gray-200 text-xl"></i>
        </div>
        <div className='ml-3  text-gray-400'>
        <input type = "file" className='' onChange={handleFileChange} required/>
       
        </div>

        </div>
        <div className='w-40'>
            <button type='submit' className = " bg-gray-100 w-full h-10 rounded-md" > Add  Students</button>
        </div>


        </div>


        </form>
        
        </div>
       
        <div className='student-profile  z-10 font-sans modal'>
         <div className='flex justify-end p-3 '><i class="fa-solid fa-circle-xmark" onClick={profilemodal}></i></div>
         {profile?profile.map((Element)=>(
            <div>
         <div className=' flex justify-center mt-3'>
           {Element._id}

         </div>
         <div className='flex justify-center mt-3'>
          
           {Element.img?<img src = {`data:$image/png;base64,${Element.img}`} className=' w-32 h-32 rounded-circle'/>:''} 
         </div>
         <div className=' flex justify-center text-xl font-bold mt-3'>
          {Element.name}

         </div>
         <div className='flex justify-center mt-3 text-gray-400 font-semibold'>
          {Element.Class}
         </div>
       
         <div className='profile-items flex justify-between  max-w-40 m-auto mt-3 '>
        <div className='  w-11  h-11  flex justify-center items-center'>
        <i class="fa-solid fa-graduation-cap text-2xl text-gray-300"></i>
        
        </div>
        <div className='  w-11  h-11  flex justify-center items-center'>
        <i class="fa-solid fa-phone text-2xl text-gray-300"></i>
        
        </div>
        <div className=' w-11  h-11  flex justify-center items-center'>
       
        <i class="fa-solid fa-message text-2xl text-gray-300"></i>
        
        </div>

        </div>
           
      
         <div className='flex font-bold mt-3 ml-9'>
          About
         </div>
         <div className='flex justify-between  mt-32 max-w-40 ml-9'>
         <div className=''>
            <div className=' font-bold'>
            Age

            </div>
            <div className='mt-2 text-gray-400 font-semibold'>
            21

            </div>
         </div>
         <div className=''>
            <div className=' font-bold'>
            Gender

            </div>
            <div className='mt-2 text-gray-400 font-semibold'>
            {Element.gender}

            </div>
         </div>
            
         </div>

         </div>
     

         )):<div className='loading1'><Loader speed="normal"/></div>}
        

         </div>
      
        </>
    )
}
export default Student;

import {  useState, useEffect } from 'react';
import '../style.css/teachers.css';
import { useNavigate } from 'react-router-dom';
import { Loader, Message } from 'rsuite';
import bg from '../Assets/teac.png';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import url from '../misc/url';

function Teachers({role}){
    let location = useNavigate();
    useEffect(()=>{
    document.getElementById('navbar').style.display = "block";
    document.getElementById('Navbar').style.display = "none";

    if(role == 'Student'){
       location('/Student');

    }

    },[] )
   

   let counts = 1;
    function form(){
        if(role == 'Teacher'){
            alert('you do not add teacher ');
            return;
        }
        counts++;
        if(counts % 2 == 0){
            document.querySelector(".form").style.display = "block";

        }
        else{
            document.querySelector(".form").style.display = "none";
        }
       
    }
    useEffect(()=>{
        document.querySelector('.btn').style.display = "block";
    },[])

    let [data, setData] = useState();
    let [file, setFile] = useState();
    let [profile, setProfile] = useState();
    useEffect(()=>{
        document.getElementById('navbar').style.display = "block";
        
    
        },[] )
       
    
    let count = 1;
    function form(){

        count++;
        if(count % 2 == 0){
            document.querySelector(".teachers-form").style.display = "block";

        }
        else{
            document.querySelector(".teachers-form").style.display = "none";
        }
       
    }
    function array(){
        let result = axios.post(`${url}Teachers`).then(result =>{
            setData(result.data);
            
           
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
        let result = axios.post(`${url}Teacher`, formData).then((result)=>{
            
           setTimeout(()=>{
           
            document.getElementById("message").innerText = "updated";
            document.querySelector('.message').style.display = "block";
            setTimeout(()=>{
                document.querySelector('.message').style.display = "none";

            },2000)
            document.getElementById("loading").style.display = "none";
            setData(result.data.data);
            document.querySelector('.teachers-form').style.display = 'none';
            
            
           },2000)
        })
       
    }
    function t_filter(e){
        
        let data = e.target.value;
        if(data == "default"){
            array();
            return;
        }
        let result = axios.post(`${url}t_filter`, {data} ).then(result =>{
            
            setData(result.data);
            console.log(data);
           
        })


    }
  function t_filter1(e){
    let data = e.target.value;
    if(data == "default"){
        array();
        return;
    }
    let result = axios.post(`${url}t_filter1`, {data} ).then(result =>{
        
        setData(result.data);
        console.log(data);
       
    })

  }
 
  function t_search_filter(e){
    setTimeout(()=>{
        t_search_data(e.target.value);

    },2000)
    
  

  }
  function t_search_data(data){
    let result = axios.post(`${url}t_filter2`, {data} ).then(result =>{
        
        setData(result.data);
        console.log(data);
       
    })

  }

    useEffect(()=>{
        document.querySelector('.btn').style.display = "block";
        array();
       
      
      

    },[]);
    const handleFileChange_t = (e) => {
        
        setFile(e.target.files[0]);
      };

  
function t_content(e){
    document.querySelector('.support').style.display = 'none';
   
    let id =  e.target.getAttribute('itemid');
    let result = axios.post(`${url}t_profile`, {id}).then(result =>{
        setProfile(result.data);
        document.querySelector('.profile').style.display = 'block';
       
        
       
    })



}
function profilemodal(){
    document.querySelector('.student-profile').style.display = 'none';
    document.querySelector('.support').style.display = 'block';
   


}
function register_modal(){
    document.querySelector('.teachers-form').style.display = 'none';
}

    
  
    
    return (
        <>  
        <Sidebar/>
        <Navbar />
        <div className=' absolute w-fit   z-10  mt-6 message hidden  ' style={{marginLeft: "45%"}}>
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
            Teachers
        </div>
        <div className="flex justify-end w-full ">
        <button className=" border-none pr-3 text-sky-500 ml-5">
            Export csv
        </button>
        <button className="rounded-xl ml-3 p-2 text-white bg-sky-500" onClick={form}>
            Add Teachers
        </button>

        </div>

        </div>
        <div className='search  flex max-[378px]:flex-wrap'>
            <div className='w-fit flex items-center'  style={{backgroundColor: "rgba(252, 250, 250, 1)"}}>
                <select className=' w-40 max-[479px]:w-24' onChange={t_filter}  style={{backgroundColor: "rgba(252, 250, 250, 1)"}}>
                    <option value="default">filter by gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <div className='w-fit flex items-center ml-3' style={{backgroundColor: "rgba(252, 250, 250, 1)"}}>
                <select className=' w-40 bg-gray-100 max-[479px]:w-24' onChange={t_filter1} style={{backgroundColor: "rgba(252, 250, 250, 1)"}}>
                    <option value="default">filter by class</option>
                    <option value="frontend">frontend</option>
                    <option value="backend">backend</option>
                    <option value="fullstack">fullstack</option>
                    <option value="tester">tester</option>
                    <option value="manager">manager</option>
                  
                </select>
            </div>
            <div className='w-full flex bg-gray-100 h-10 items-center pl-3 ml-3 max-[378px]:m-auto max-[378px]:mt-3' style={{backgroundColor: "rgba(252, 250, 250, 1)"}}>
            <i class="fa-solid fa-magnifying-glass text-gray-300"></i><input type='text' className='w-full border-none bg-gray-100 ml-3 h-full' placeholder='search for a student by name or email' onInput={t_search_filter} style={{backgroundColor: "rgba(252, 250, 250, 1)"}}/>
               
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
                Teacher ID
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
            <tr className= ' h-10 font-sans text-gray-600 font-bold items content hover:bg-sky-600 hover:text-white' id = "items" itemid = {Element._id} onClick = {t_content} >
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
        No Teachers at this time
        </div>
        <div className='flex justify-center'>
        <Loader speed="normal" />

        </div>
       
        <div className='data2'>
        Teachers will appear here after they enroll in your school.
        </div>

        </div>
      


       
        }
       
        
       
   
        </div>
        
      
       

     </div>
       
       
     <div className = "teachers-form  border modal w-screen h-screen z-10" >
        <form name = "form" onSubmit={submit} className=' max-w-4xl  h-fit p-3  z-10  bg-white form mt-0 m-auto'>
        <din className = "flex justify-end "><i className='fa-solid fa-circle-xmark hover:text-xl' onClick={register_modal}></i></din>
        <div className='flex justify-between '>
            <div className=' text-4xl text-gray-400 font-semibold  max-[768px]:text-2xl'>Add Teachers</div>
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
        <input type = "file" className='' onChange={handleFileChange_t} required/>
       
        </div>

        </div>
        <div className='w-40'>
            <button type='submit' className = " bg-gray-100 w-full h-10 rounded-md" > Add  Teachers</button>
        </div>


        </div>


        </form>
        
     </div>
        <div className='  pt-9 hidden m-auto profile z-10 '>

       {profile?profile.map((data)=>(
        <div className=' row   mt-52   bg-white z-10 max-w-5xl m-auto'>
        <div className='col-md grid justify-center bg-white '>
        <div className='profile-img w-64  h-64 rounded-circle '>
          {data.img?  <img className='rounded-circle w-full h-full  object-cover' src =  {`data:$image/png;base64,${data.img}`} />:''}
        <div className='profil-name text-gray-800  font-bold flex justify-center mt-9'>
        {data.name}

        </div>
        <div className='text-gray-400 flex justify-center'>
         {data.Class} Teacher
        </div>
        <div className='profile-items flex justify-between mt-3 bg-white '>
        <div className=' w-16  h-16  flex justify-center items-center'>
        <i class="fa-solid fa-graduation-cap text-2xl text-gray-300"></i>
        
        </div>
        <div className=' w-16  h-16  flex justify-center items-center'>
        <i class="fa-solid fa-phone text-2xl text-gray-300"></i>
        
        </div>
        <div className=' w-16  h-16  flex justify-center items-center'>
       
        <i class="fa-solid fa-message text-2xl text-gray-300"></i>
        
        </div>

        </div>
        </div>
        </div>
        <div className='col-md'>
        <div className=''>
            About
        </div>
        <p className='text-gray-500 mt-3 max-w-xs'>
        Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.
        </p>

        <div className='flex justify-between mt-6 max-w-xs'>
        <div>
        <div className='text-gray-900 font-semibold'>Age</div>
        <div className='text-gray-500 mt-3'>{data.subject}</div>
        </div>
        <div>
        <div className='text-gray-900 font-semibold'>Gender</div>
        <div className='text-gray-500 mt-3'>{data.gender}</div>
        </div>
        </div>
            
        </div>

        </div>
      

       )):''}
       
        </div>

      
   
        </>
    )

}
export default Teachers;                                                
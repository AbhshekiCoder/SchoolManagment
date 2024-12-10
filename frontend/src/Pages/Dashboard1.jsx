import axios from 'axios';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import url from '../misc/url';
function Dashboard1(){
    let [data, setData] = useState([]);
    let navigate = useNavigate();
    function syllabus(id){
        localStorage.setItem("topic_id", id);
        navigate('/Video');


    }
    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem("token"))
        console.log(user.email)
        let email = user.email;
        let result = axios.post(`${url}cart`, {email} ).then(result =>{
            setData(result.data);

        })
    },[])
    return(
        <>
         <div className=" max-w-3xl m-auto p-3 mt-56">
     <table className="w-full mt-16">
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
       
        </>
    )
}
export default Dashboard1;
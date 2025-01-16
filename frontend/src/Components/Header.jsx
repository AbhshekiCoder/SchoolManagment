import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from '../Assets/logo.jpeg';
function Header({Profile_Modal, user, title}){

    
   
    const [i_hovered_div, setI_hovered] = useState(false);
    
    const handleMouseEnter = () =>{
        setI_hovered(true);
        document.getElementById('c-hover').style.backgroundColor = 'lightblue';
        document.getElementById('icon').classList.remove('fa-caret-down');
        document.getElementById('icon').classList.add('fa-caret-up');
    }

    const handleMouseLeave = () =>{
        setI_hovered(false);
        document.getElementById('c-hover').style.backgroundColor = 'white';
        document.getElementById('icon').classList.remove('fa-caret-up');
        document.getElementById('icon').classList.add('fa-caret-down');
    }
    

    return (
    <div id = "Navbar" className = "sticky-top">
                <div id="logo">
                    <div className="">
                       <Link to = "/"><img src={logo} alt=""  className="  h-16 w-36"/></Link> 
                    </div>
                </div>
                <div id="pages" >
                    <div id="page" >
                        <div id = "c-hover" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <p>Courses</p>
                        <i class="fa-solid fa-caret-down " id = "icon" ></i>
                        {i_hovered_div && (
                            <div id = "c-hovered" className=" p-5 z-10" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

                                <div className="pl-2">
                                    <p className='text-xl' id = "heading">Certification Courses</p>
                                </div>

                                <div className="courses-sections">
                                    <p>Python Programming</p>
                                </div>  

                                <div className="courses-sections">
                                    <p>Web Development</p>
                                </div>

                                <div className="courses-sections">
                                    <p>Auto Cad</p>
                                </div>

                                <div className="courses-sections ">
                                    <p>UI/UX</p>
                                </div>

                                <div className="courses-sections ">
                                    <p>Advanced Excel</p>
                                </div>

                                <div className="courses-sections ">
                                    <p>Video Editing</p>
                                </div>

                                <div className="courses-sections ">
                                    <p>Digital Marketing</p>
                                </div>

                                <div className="courses-sections ">
                                    <p>Machine Learning</p>
                                </div>
                            </div>
                        )}
                        </div>

                        <div>
                        <p>Jobs</p>
                        <i class="fa-solid fa-caret-down"></i>
                        </div>

                        
                    </div>
                    <div id = "search">
                        <input type="text" placeholder = "Search" />
                    </div>
                    <div id = "users" className=" mr-9">
                      {user?<div className="rounded-circle  h-9 w-9 flex justify-center  text-xl font-bold border items-center  hover:bg-sky-200  ml-2 hover:text-blue-500"  onMouseOver={Profile_Modal}>{title?title:''}</div>:<i class="fa-solid fa-user-circle text-4xl  hover:bg-sky-200  ml-2" onMouseOver={Profile_Modal}></i>}  <i className="fa-solid fa-caret-down hover:bg-sky-200  ml-2" style={{fontSize: "15px"}} id = "profile_icon"></i>
                    </div>
                </div>
    </div>
    )
}
export default Header;
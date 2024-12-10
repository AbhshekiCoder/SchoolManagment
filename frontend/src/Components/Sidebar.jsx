import img from '../Assets/sidebar_Prof.png';
import { Link } from 'react-router-dom';
function Sidebar(){
 
     
    
    return (
        <>
            <div className="sidebar fixed h-full w-56 z-10 ">
            <div className="profile_img pb-9 border-b-2">
                <div className="profile_image flex justify-center mt-5">
                <img src={img} alt = "..."/>

                </div>
                <div className='flex justify-center font-bold mt-4'>
                    Udemy Inter School
                </div>
            </div>
            <div className='side_middle_content m-auto w-56 mt-3 '>
                <div className='flex w-52 m-auto h-9 items-center p-3 mt-3 item '  item_id = "d" >
                <div>
                    <i className='fa fa-home'></i>
                </div>
                <div className='ml-3   '   >
                    <Link to = "/Dashboard">Dashboard</Link>
                </div>
                <div className='w-full flex justify-end  '  >
                <i class="fa-solid fa-angle-right hidden" id = "d"></i>

                </div>
              
                </div>
                <div className='flex w-52 m-auto h-9 items-center p-3  item mt-3' item_id = "t"   >
                <div>
                    <i className='fa fa-home'></i>
                </div>
                <div className='ml-3 ' >
                   <Link to ="/Teachers">Teachers</Link> 
                </div>
                <div className='w-full flex justify-end  '  >
                <i class="fa-solid fa-angle-right hidden" id = "t" ></i>

                </div>
                
                </div>
                <div className='flex w-52 m-auto h-9 items-center p-3 mt-3 item'  item_id = "s"  >
                <div >
                <i class="fa-solid fa-graduation-cap"></i>
                </div>
                <div className='ml-3 w-fit '  >
                  <Link to = "/Student" > Students/Classes</Link>
                </div>
                <div className=' w-1/6 flex justify-end '  >
                <i class="fa-solid fa-angle-right hidden " id = "s" ></i>

                </div>
               
                

                </div>
                <div className='flex w-52 m-auto  h-9 items-center p-3 item mt-3' item_id = "p"   >
                <div>
                    <i className= "fa-solid fa-gear"></i>
                </div>
                <div className='ml-3  '   >
                   Setting and Profile
                </div>
                <div className='w-fit flex justify-end  pl-3'>
                <i class="fa-solid fa-angle-right hidden" id = "p" ></i>

                </div>
             
                </div>
                <div className='flex w-52 m-auto hover: h-9 items-center p-3 mt-3 item' item_id = "e" >
                <div className=''>
                    <i className='fa fa-home'></i>
                </div>
                <div className='ml-3 item'  >
                  <Link to = "/" >Home</Link>
                </div>
                <div className='w-full flex justify-end '  >
                <i class="fa-solid fa-angle-right hidden"> </i>

                </div>

              

                </div>
                <div className='flex w-52 m-auto hover: h-9 items-center p-3 mt-3 item' item_id = "e" >
                <div className=''>
                    <i className='fa fa-home'></i>
                </div>
                <div className='ml-3 item'  >
                  <Link to = "/Courses" >Courses</Link>
                </div>
                <div className='w-full flex justify-end '  >
                <i class="fa-solid fa-angle-right hidden"> </i>

                </div>

              

                </div>
               
            </div>
            <div className='flex   mt-36 justify-center '>
            <div className='ml-3'>
            <i className='fa-solid fa-gear'></i>

            </div>
      
            <div className='ml-3 item'>Features</div>
            <button className=' rounded-xl ml-6 border  w-16'>New</button>

            </div>

            </div> 
        </>
    )
}
export default Sidebar;
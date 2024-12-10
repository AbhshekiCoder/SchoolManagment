import { Sidebar } from "rsuite";
import Navbar from "../Components/navbar";
import { useEffect } from "react";
useEffect(()=>{
    document.getElementById('Navbar').style.display = "none";


},[])
function Admin(){
    return(
        <>
         <Navbar login={login}/>
         <Sidebar/>
        </>
    )
}
export default Admin;
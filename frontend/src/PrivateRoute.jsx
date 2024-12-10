import React from 'react'
import { Outlet, Navigate, Route } from 'react-router-dom';
import  {useProfile}  from './context/profilecontext';
function PrivateRoute(){
    const user = useProfile();
    return user?<Outlet/>: <Navigate to ='/Login'/>
}  

export default PrivateRoute;
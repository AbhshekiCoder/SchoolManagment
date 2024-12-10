import React from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom';
 

function PublicRoute(){
   return <Outlet/>
}
export default PublicRoute;
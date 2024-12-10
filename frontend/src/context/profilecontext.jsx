import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
const ProfileContext = createContext();




export const ProfileProvider = ({children})=>{
  let [user, setUser] = useState(true);
 
  useEffect(()=>{
    let profile = localStorage.getItem('token');
  
    if(profile){
      setUser(true);
      console.log(user);
    }
    else{
      setUser(false);
      console.log(user);
    }
  
  
  },[user])
   

 
   
    return(
        <ProfileContext.Provider value={user}>
            {children}
        </ProfileContext.Provider>
    )
    

} 

export const useProfile = ()=> useContext(ProfileContext);
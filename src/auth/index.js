
export const isLoggedIn=()=>{
  
    let data = localStorage.getItem("data");
    if(data !=null)
    return true;
    
    else
     return false;
    
}


export const doLogin=(data,next)=>{
localStorage.setItem("data",JSON.stringify(data))
next();
}

// Do logout => remove from local storage
export const doLogout =(next)=>{
    localStorage.removeItem("data");
    next();
}

// get Current User
export const getCurrentUserDetail =() =>{

if(isLoggedIn())
  return  JSON.parse(localStorage.getItem("data")) ;
else
  return undefined;

}
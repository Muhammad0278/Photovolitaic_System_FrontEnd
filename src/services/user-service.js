import { myAxios } from "./helper";

export const signUp=(user)=> {
   // return myAxios.post('/api/User',user).then((response) => 
   return myAxios.post('/api/User/InsertUser',user).then((response) => 

    {
        console.log(response)
       // response.data
    });
}
export const login=(loginDetail)=>{
        return myAxios.post('/api/User/Login',loginDetail).then((response)=> response.data);    
    }

    
//    return myAxios.post('/api/User',user).then((response) => {
    
//        console.log('get data')
//    //  // setPost(response.data);
//     });
   

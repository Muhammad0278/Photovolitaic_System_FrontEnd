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
    export const UpdateUser=(data)=>{
        return myAxios.put('/api/User/UpdateUser',data).then((response)=> response.data);    
    }
    export const DeleteUser=(id)=>{
        return myAxios.delete('/api/User/DeleteUser',{
            params: {
               ID: id
            }
          }).then((response)=> response.data);    
    }


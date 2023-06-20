import {  myAxios } from "./helper";

// Project Service
export const AddProduct=(data)=>{
    return myAxios.post('/api/ProductAssignment/InsertProducts',data).then((response)=> response.data);    
}
export const GetAllProjects=(data)=>{
    return myAxios.get('/api/Products/GetProject',{
        params: {
           UserID: data
        }
      }).then((response)=> response.data);    
}
export const GetSelectedProducts=(data)=>{
    return myAxios.get('/api/ProductAssignment/GetSelectedProducts',{
        params: {
            UserID: data
        }
      }).then((response)=> response.data);    
}
export const GetProductsByProjectsID=(data)=>{
    return  myAxios.get('/api/Products/GetProducts').then((response)=> response.data);    

}
export const UpdateProjects=(data)=>{
    return myAxios.put('/api/Projects/UpdateProject',data).then((response)=> response.data);    
}
export const DeleteProducts=(data)=>{
    return myAxios.delete('/api/ProductAssignment/DeleteSelectedProducts',{
        params: {
            ID: data
        }
      }).then((response)=> response.data);    
}
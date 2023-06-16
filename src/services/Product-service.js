import {  myAxios } from "./helper";

// Project Service
export const AddProduct=(data)=>{
    return myAxios.post('/api/Products/InsertProducts',data).then((response)=> response.data);    
}
export const GetAllProjects=(data)=>{
    return myAxios.get('/api/Products/GetProject',{
        params: {
           UserID: data
        }
      }).then((response)=> response.data);    
}
export const GetAllProducts=(data)=>{
    return myAxios.post('/api/Projects/GetProjects',data).then((response)=> response.data);    
}
export const GetByProjectsID=(data)=>{
    return  myAxios.get('/api/Projects/GetbyProject',{
        params: {
            _ProjectID: data
        }
      }).then((response)=> response.data);    

}
export const UpdateProjects=(data)=>{
    return myAxios.put('/api/Projects/UpdateProject',data).then((response)=> response.data);    
}
export const DeleteProjects=(data)=>{
    return myAxios.delete('/api/Projects/DeleteProject',{
        params: {
            _ProjectID: data
        }
      }).then((response)=> response.data);    
}
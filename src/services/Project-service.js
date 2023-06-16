import {  myAxios } from "./helper";

// Project Service
export const AddProject=(data)=>{
    return myAxios.post('/api/Projects/InsertProject',data).then((response)=> response.data);    
}
export const GetAllProjects=(data)=>{
    return myAxios.post('/api/Projects/GetProjects',data).then((response)=> response.data);    
}
export const GetByProjectsID=(data)=>{
    return  myAxios.get('/api/Projects/GetbyProject',{
        params: {
            _ProjectID: data
        }
      }).then((response)=> response.data);    

      
    // try {
    //     let res = await axios({
    //          url: 'https://jsonplaceholder.typicode.com/posts/1',
    //          method: 'get',
    //          timeout: 8000,
    //          headers: {
    //              'Content-Type': 'application/json',
    //          }
    //      })
    //      if(res.status == 200){
    //          // test for status you want, etc
    //          console.log(res.status)
    //      }    
    //      // Don't forget to return something   
    //      return res.data
    //  }
    //  catch (err) {
    //      console.error(err);
    //  }
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
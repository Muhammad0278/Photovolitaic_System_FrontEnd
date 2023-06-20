import {  myAxios } from "./helper";
export const GetMapProducts= async (Active,data)=> {
   
    const response = await myAxios.get('/api/MapData/GetMapProductsByProID',{
        params: {
            UserID: data.UserID,
            ProjectID: data.ProjectID,
            Status: Active
        }, }).then((resp)=> resp.data)
     const json = await response;
    return json;
     // Update state after receiving the response
    // return myAxios.get('/api/MapData/GetMapProductsByProID',{
    //     params: {
    //         UserID: data.UserID,
    //         ProjectID: data.ProjectID,
    //         Status: Active
    //     },
      
    //   }).then((response)=> response.data);    
}
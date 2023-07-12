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
  
}
export const GetAllProductsBYProject= async (Active,data)=> {
   
    const response = await myAxios.get('/api/MapData/GetAllProductByPID',{
        params: {
            UserID: data.UserID,
            ProjectID: data.ProjectID,
            Status: Active
        }, }).then((resp)=> resp.data)
     const json = await response;
    return json;
  
}
export const ManualReporing= async (data)=> {
   
    const response = await myAxios.get('/api/FetchWeather/GenerateManualReport',{
         params: {
        UserID: data.UserID,
        ProjectID: data.ProjectID,
      
    }, }).then((resp)=> resp.data)
    const json = await response;
    return json;
  }
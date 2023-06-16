import axios from "axios";

//export const BASE_URL='https://localhost:7024';
export const BASE_URL='https://localhost:44324';

export const myAxios=axios.create({
    baseURL:BASE_URL
});
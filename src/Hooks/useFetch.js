import axios from "axios"

export const useFetch=async(url)=>{
    const {data}= await axios.get(`https://fakestoreapi.com/${url}`);
    return data;
};
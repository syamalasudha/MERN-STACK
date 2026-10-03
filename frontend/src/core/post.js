import axios from "axios";
const API = import.meta.env.VITE_API_URL
const postApi = axios.create({
    baseURL:API,
    withCredentials:true,//sends the JWT cookie
    headers:{
        Accept:"application/json",
        "Content-Type": "application/json",
    },
    
})
export const getPosts = async()=>{
    return await fetch(`${API}/api/posts`,{
        method:"GET",
        credentials:"include",//As we are using cookies
        headers :{
            Accept:"application/json",
            "content-Type":"application/json",
        },
    })
    .then((res)=>res.json())
    .catch((res)=>console.log(error));
};
export const getPostById = async()=>{
    return await fetch(`${API}/api/posts/${id}`,{
        method:"GET",
        credentials:"include",
        headers :{
            Accept:"application/json",
            "content-Type":"application/json",
        },
        
    })
    .then((res)=>res.json())
    .catch((res)=>console.log(error));

};
export const createPost = async(post)=>{
    return await postApi
    .post("/api/posts",post)
    .then((res)=>res.data)
    .catch((error)=>console.log(error));
};
export const updatePost = async(id,post)=>{
    return await postApi
    .post(`/api/posts/${id}`,post)
    .then((res)=>res.data())
    .catch((error)=>console.log(error));
};



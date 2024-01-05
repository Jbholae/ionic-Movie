import { QueryFunctionContext } from "react-query";
import { API } from "./api"

interface PostBodyProps{
    id:string,
    userId:string,
    title:string,
    body:string,
}

export const fetchPhoto = ({queryKey}:QueryFunctionContext) =>{
    const id = queryKey[1];
    return API.get(`/photos/${id}`)
}
export const updatePhoto = ({id,data}:any) =>{
    
    return API.put(`/photos/${id}`,data)
}

export const fetchPosts = () =>{
    return API.get('/posts');
}

export const fetchPostDetail = ({queryKey} : QueryFunctionContext) =>{
    const id = queryKey[1];
    return API.get(`/posts/${id}`);
}

export const updatePostDetail = ({userId,payload}:any) =>{
    return API.put(`/posts/${userId}`,payload);
}

export const fetchComment = ({queryKey} : QueryFunctionContext)  => {
    const id = queryKey[1];
    return API.get(`/posts/${id}/comments`);
}

export const createPost=(payload : PostBodyProps) => {
    const data = payload;
    return API.post(`/posts`,data)
    
}
import { QueryFunctionContext } from "react-query";
import { API } from "./api"

interface PostBodyProps{
    id:string,
    userId:string,
    title:string,
    body:string,
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
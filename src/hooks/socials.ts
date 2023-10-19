import { QueryFunctionContext } from "react-query";
import { API } from "./api"

export const fetchPosts = () =>{
    return API.get('/posts');
}

export const fetchPostDetail = ({queryKey} : QueryFunctionContext) =>{
    const id = queryKey[1];
    return API.get(`/posts/${id}`);
}

export const fetchComment = ({queryKey} : QueryFunctionContext)  => {
    const id = queryKey[1];
    return API.get(`/posts/${id}/comments`);
}
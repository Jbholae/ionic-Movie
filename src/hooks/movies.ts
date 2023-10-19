import { QueryFunctionContext } from "react-query";
import { API } from "./api"
import { SearchResult } from "./useapi"
import axios from "axios";

let baseUrl = "https://www.omdbapi.com/";
let apiKey = "b6c7515b";


/* export const fetchMovies = async (queryKey:any) : Promise<SearchResult[]> =>{
    const searchQuery = queryKey[1]
    const type = queryKey[2]
    return API.get(`?s=${searchQuery}&${type}&apikey=${apiKey}`,{params:{
        searchQuery,
        type,
    }})
}  */

export const fetchMovies =  ({queryKey} : QueryFunctionContext):any  => {
    const searchQuery : any = queryKey[1]
    const type = queryKey[2]
    return axios.create({baseURL : baseUrl,
headers:{'content-type':'application/json',}}).get(`${baseUrl}?s=${encodeURI(searchQuery)}&${type}&apikey=${apiKey}`)
    // return '∂'
} 

export const movieDetails = ({queryKey} : QueryFunctionContext) :any => {
    const id = queryKey[1]
    return axios.create({baseURL : baseUrl,
headers:{'content-type':'application/json',}}).get(`${baseUrl}?i=${id}&plot=full&apikey=${apiKey}`)
}
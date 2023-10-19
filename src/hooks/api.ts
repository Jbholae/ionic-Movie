import axios from 'axios';

let baseUrl = "https://www.omdbapi.com/";


export const API = axios.create({baseURL : baseUrl,
headers:{'content-type':'application/json',}});
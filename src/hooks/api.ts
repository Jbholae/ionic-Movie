import axios from 'axios';

// let baseUrl = "https://www.omdbapi.com/";
let baseUrl = "https://jsonplaceholder.typicode.com/";

export const API = axios.create({baseURL : baseUrl,
headers:{'content-type':'application/json',}});
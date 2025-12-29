import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const API = process.env.API_BASE_URL;
export const api = axios.create({
    baseURL: API
})
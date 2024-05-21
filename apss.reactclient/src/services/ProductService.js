import axios from "axios";
import { apiUrl } from "../models/app-constants";

export async function getBikeDtos(){
    return await axios.get(`${apiUrl}/api/Products/DTO/1`);
}
export async function getBikeDetails(){
    return await axios.get(`${apiUrl}/api/Products/Details/Of/1`);
}
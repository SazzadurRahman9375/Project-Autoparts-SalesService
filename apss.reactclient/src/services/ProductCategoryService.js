import axios from "axios";
import { apiUrl } from "../models/app-constants";

export async function getCategories(){
    return await axios.get(`${apiUrl}/api/ProductCategories`);
}
export async function getCategoriesDTOs(){
    return await axios.get(`${apiUrl}/api/ProductCategories/DTO`);
}


export async function postCategories(data){
    return await axios.post(`${apiUrl}/api/ProductCategories`, data); 
}

export async function getVehicleTypes(){
    return await axios.get(`${apiUrl}/api/VehicleTypes`);
}


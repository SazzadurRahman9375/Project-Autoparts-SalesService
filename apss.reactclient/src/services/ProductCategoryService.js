import axios from "axios";
import { apiUrl } from "../models/app-constants";

export async function getCategories(){
    return await axios.get(`${apiUrl}/api/ProductCategories`);
}
export async function getCategoryById(id){
    return await axios.get(`${apiUrl}/api/ProductCategories/${id}`);
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

export async function putCategories(id, data){
    console.log(data)
    return await axios.put(`${apiUrl}/api/ProductCategories/${id}`, data); 
}

export async function deleteCategory(id){
    //console.log('delp', id);
    return await axios.delete(`${apiUrl}/api/ProductCategories/${id}`);  
}

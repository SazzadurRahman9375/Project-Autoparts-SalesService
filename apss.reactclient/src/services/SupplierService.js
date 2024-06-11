import axios from "axios";
import { apiUrl } from "../models/app-constants";

export async function getSuppliers(){
    return await axios.get(`${apiUrl}/api/Suppliers`);
}
export async function getSuppliersById(id){
    return await axios.get(`${apiUrl}/api/Suppliers/${id}`);
}

export async function getCategoriesDTOs(){
    return await axios.get(`${apiUrl}/api/ProductCategories/DTO`);
}


export async function postSuppliers(data){
    return await axios.post(`${apiUrl}/api/Suppliers`, data); 
}

export async function getVehicleTypes(){
    return await axios.get(`${apiUrl}/api/VehicleTypes`);
}

export async function putSuppliers(id, data){
    console.log(data)
    return await axios.put(`${apiUrl}/api/Suppliers/${id}`, data); 
}

export async function deleteSuppliers(id){
    //console.log('delp', id);
    return await axios.delete(`${apiUrl}/api/Suppliers/${id}`);  
}

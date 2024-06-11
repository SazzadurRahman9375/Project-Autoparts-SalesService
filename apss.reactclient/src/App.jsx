
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
//import NavBarComponent from './components/NavBarComponent';
import HomeComponent from './views/HomeComponent';
import './App.css'
import NavBarComponent from './components/NavBarComponent';
import ProductList from './views/Bike/ProductList';
import BikeCreateForm from './views/Bike/BikeCreateForm';
import ProductCategory from './views/Category/ProductCategory';
import CategoryCreateForm from './views/Category/CategoryCreateForm';
import  PartEditForm  from "./views/Bike/PartEditForm";
import ServiceRequestList from './views/ServiceRequest/ServiceRequest';
import ServiceRequestCreateForm from './views/ServiceRequest/ServiceRequestCreateForm';
import ServiceRequestEditForm from './views/ServiceRequest/ServiceRequestEditForm';
import OrderList from './views/Order/OrderList';
import OrderCreateForm from './views/Order/OrderCreateForm';
import OrderEditForm from './views/Order/OrderEditForm';
import CategoryEditForm from './views/Category/CategoryEditForm';
import SupplierList from './views/Supplier/SupplierList';
import SupplierCreateForm from './views/Supplier/SupplierCreateForm';
import SuppplierEditForm from './views/Supplier/SupplierEditForm';

function App() {
  return (
      <>
          { <NavBarComponent></NavBarComponent> }
          
          <Box sx={{ px: 2, py: 1 }}>
              <Routes>
                  <Route path="/" element={<HomeComponent />} />
                  <Route path="/Bikes" element={<ProductList />} />
                  <Route path="/bike-create" element={<BikeCreateForm />} />
                  <Route path="/part-edit/:id" element={<PartEditForm/>} />
                  <Route path="/Categories" element={<ProductCategory />} />
                  <Route path="/category-create" element={<CategoryCreateForm />} />
                  <Route path="/category-edit/:id" element={<CategoryEditForm/>} />
                  <Route path="/ServiceRequests" element={<ServiceRequestList/>} />
                  <Route path="/serviceRequest-create" element={<ServiceRequestCreateForm />} />
                  <Route path="/serviceRequest-edit/:id" element={<ServiceRequestEditForm/>} />
                  <Route path="/OrderList" element={<OrderList/>} />
                  <Route path="/order-create" element={<OrderCreateForm/>} />
                  <Route path="/order-edit/:id" element={<OrderEditForm/>} /> 
                  <Route path="/SupplierList" element={<SupplierList/>} />
                  <Route path="/Supplier-create" element={<SupplierCreateForm/>} />
                  <Route path="/Supplier-edit/:id" element={<SuppplierEditForm/>} /> 


              </Routes>
          </Box>
    </>
  )
}

export default App

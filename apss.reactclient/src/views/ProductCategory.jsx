import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import AddIcon from '@mui/icons-material/Add';
import {  IconButton } from "@mui/material";
import { getCategoriesDTOs } from "../services/ProductCategoryService";
const ProductCategory = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const { data } = await getCategoriesDTOs();
      console.log(data);
      setCategories(data);
    } 
      catch (e) {
      console.log(e);
    }
  };
  const columns = [
    {
      name: "productCategoryName",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "vehicleTypeName",
      label: "Vehicle Type",
      options: {
        filter: true,
        sort: true,
      },
    },

  ];
  return (
    <MUIDataTable title={"Category List"} data={categories} columns={columns}
      options={{
        selectableRows: false, hover: false,
        customToolbar: () => <IconButton color="primary"href="/category-create"><AddIcon /></IconButton>,

      }}
       />
  );
  }

export default ProductCategory;

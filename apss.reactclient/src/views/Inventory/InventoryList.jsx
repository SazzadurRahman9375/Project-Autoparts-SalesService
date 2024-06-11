import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {  IconButton } from "@mui/material";
import { deleteCategory, getCategoriesDTOs } from "../../services/ProductCategoryService";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Snackbar } from "@mui/material";
import { green } from "@mui/material/colors";
const InventoryList = () => {
  const [categories, setCategories] = useState([]);
  const [delId, setDelId] = useState('');
  const [alertOpen, setAlertOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [message, setMessage] = useState("");


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

  const handleAlretClose = ()=>{
    setAlertOpen(false)
  }
  const handleYes = ()=>{
    doDeleteCategory();
  }
  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };


  const doDeleteCategory = async ()=>{
    try
    {
      console.log(delId);
      const {res} = await deleteCategory(delId);
      const b = categories.filter(x=> x.productCategoryId == delId);
      console.log(b);
      setDelId('');
      setAlertOpen(false);
      setMessage('Service Request is deleted');
      setNotificationOpen(true);
    }
    catch(e){
      console.log(e);
    }
    
  }

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
    {
      name: 'productCategoryId',
      label: 'Edit',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value,tableMeta, updateValue)=>{
            return (
                // <Button href={`/part-edit/${value}`} color="primary"  variant="contained"><EditIcon sx={{mr:1}}/></Button>
                <Fab sx={{ml: 1}} variant="extended" size="medium" href={`/category-edit/${value}`} ><EditIcon sx={{ color: green }}/></Fab>
                
            )
        }
      },

    },    {
      name: 'productCategoryId',
      label: 'Delete',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value,tableMeta, updateValue)=>{
            return (
                <IconButton color="warning"
                onClick={()=> {
                  setDelId(value);
                  setAlertOpen(true)
                }}
                  ><DeleteIcon /></IconButton>
            )
        }
      },
    }


  ];
  return (
    <>
    <MUIDataTable title={"Category List"} data={categories} columns={columns}
      options={{
        selectableRows: false, hover: false,
        customToolbar: () => <IconButton color="primary"href="/category-create"><AddIcon /></IconButton>,

      }}
      
       />
       <Dialog
       open={alertOpen}
       onClose={handleAlretClose}
       aria-labelledby="alert-dialog-title"
       aria-describedby="alert-dialog-description"
     >
       <DialogTitle id="alert-dialog-title">
         {"Delete item?"}
       </DialogTitle>
       <DialogContent>
         <DialogContentText id="alert-dialog-description">
           Are you sure to delete this item?
         </DialogContentText>
       </DialogContent>
       <DialogActions>
         <Button onClick={handleAlretClose}>No</Button>
         <Button onClick={handleYes} autoFocus>
           Yes
         </Button>
       </DialogActions>
     </Dialog>
     <Snackbar
       open={notificationOpen}
       autoHideDuration={2000}
       message={message}
       action={"DISMISS"}
       onClose={handleNotificationClose}
     />
     </>

  );
  }

export default InventoryList;

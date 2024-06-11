import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {  IconButton } from "@mui/material";
import {  deleteSuppliers, getSuppliers } from "../../services/SupplierService";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Snackbar } from "@mui/material";
import { green } from "@mui/material/colors";
const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [delId, setDelId] = useState('');
  const [alertOpen, setAlertOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [message, setMessage] = useState("");


  useEffect(() => {
    fetchSuplliers();
  }, []);
  const fetchSuplliers = async () => {
    try {
      const { data } = await getSuppliers();
      console.log(data);
      setSuppliers(data);
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


  const doDeleteSupplier = async ()=>{
    try
    {
      console.log(delId);
      const {res} = await deleteSuppliers(delId);
      const b = suppliers.filter(x=> x.supplierId == delId);
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
      name: "companyName",
      label: "Company Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "contactName",
      label: "Contact Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
        name: "contactNo",
        label: "Contact No",
        options: {
          filter: true,
          sort: true,
        },
      },
  
    {
      name: 'supplierId',
      label: 'Edit',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value,tableMeta, updateValue)=>{
            return (
                // <Button href={`/part-edit/${value}`} color="primary"  variant="contained"><EditIcon sx={{mr:1}}/></Button>
                <Fab sx={{ml: 1}} variant="extended" size="medium" href={`/Supplier-edit/${value}`} ><EditIcon sx={{ color: green }}/></Fab>
                
            )
        }
      },

    },    {
      name: 'supplierId',
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
    <MUIDataTable title={"Suppliers List"} data={suppliers} columns={columns}
      options={{
        selectableRows: false, hover: false,
        customToolbar: () => <IconButton color="primary"href="/supplier-create"><AddIcon /></IconButton>,

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

export default SupplierList;

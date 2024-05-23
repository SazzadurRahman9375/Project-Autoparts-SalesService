import { useEffect, useState } from "react";
import { getBikeDetails, getBikeDtos } from "../services/ProductService";
import MUIDataTable from "mui-datatables";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { apiUrl } from "../models/app-constants";
import "./ProductList.css"
import { Button, Dialog, DialogActions, DialogTitle, Fab, Icon, IconButton } from "@mui/material";
import { blueGrey, green } from "@mui/material/colors";
const ProductList = () => {
  const [bikes, setBikes] = useState([]);
  const [details, setDetails]= useState([]);
  const [detailOpen, setDetailOpen] = useState(false)
  useEffect(() => {
    fetchBikes();
  }, []);
  const fetchBikes = async () => {
    try {
      const { data } = await getBikeDtos();
      console.log(data);
      setBikes(data);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchBikeDeatils =async (id)=>{
    try {
        const { data } = await getBikeDetails(id);
        console.log(data);
        setDetails(data);
      } catch (e) {
        console.log(e);
      }
  }
  const getPictureUrl = (pic) => {
    return `${apiUrl}/Images/${pic}`;
  };
  const showDetailClick=(id)=>{
    fetchBikeDeatils(id);
    setDetailOpen(true);
  }
  const handleClose = () => {
    setDetailOpen(false);
  };
  const columns = [
    {
      name: "productPicture",
      label: "Picture",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
            console.log(getPictureUrl(value))
          return (
           
              <img className="circle-image" src={getPictureUrl(value)} />
            
          );
        },
      },
    },
    {
      name: "productName",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "price",
      label: "Price",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "productCategoryName",
      label: "Category",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "shortDescription",
      label: "Short Description",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
        name:'productId',
        label:'Details',
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value,tableMeta, updateValue)=>{
                return (
                    <Button onClick={()=>showDetailClick(value)} variant="text">Details</Button>
                )
            }
          },

    },
    {
      name: 'productId',
      label: 'Edit',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value,tableMeta, updateValue)=>{
            return (
                // <Button href={`/part-edit/${value}`} color="primary"  variant="contained"><EditIcon sx={{mr:1}}/></Button>
                <Fab sx={{ml: 1}} variant="extended" size="medium" href={`/part-edit/${value}`} ><EditIcon sx={{ color: green[700] }}/></Fab>
                
            )
        }
      },

    }
  ];
  const detailsColumns=[
    {
        name: 'label',
        label: 'label',
        options:{
            filter:true,
            sort:true
        }
    },
    {
        name: 'value',
        label: 'VALUE',
        options:{
            filter:false,
            sort:false
        }
    }
  ]
  return (
    <>
      <MUIDataTable title={"Bike List"} data={bikes} columns={columns}
      options={{
        selectableRows: false, hover: false,
        customToolbar: () => <Fab sx={{ml: 1}} variant="extended" size="medium" href="/bike-create" color="primary"><AddIcon sx={{mr:1}} /> Add New</Fab>,

      }}
       />
      <Dialog open={detailOpen} fullWidth={true}>
        <DialogTitle>Parts details</DialogTitle>
        <MUIDataTable title={'Details'} columns={detailsColumns} data={details}
        options={{
          selectableRows: false,
          elevation: 0 
        }}
        />
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
  }

export default ProductList;

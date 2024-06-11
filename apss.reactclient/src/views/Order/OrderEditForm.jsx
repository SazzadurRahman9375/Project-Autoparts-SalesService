import {
    Button,
    Container,
    FormHelperText,
    Grid,
    IconButton,
    MenuItem,
    Snackbar,
    TextField,
    Typography,
  } from "@mui/material";
  import AddIcon from "@mui/icons-material/Add";
  import DeleteIcon from "@mui/icons-material/Delete";
  import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
  import { useEffect, useState, useRef } from "react";
  import * as Yup from "yup";
  import { getCustomers,getProducts,putOrder,getOrderById } from "../../services/OrderService";
  import { useParams } from "react-router-dom";
  import { format } from "date-fns/format";

  const OrderEditForm = () => {
    //States
    ////////////////////////////////////////////////
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState([]);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [message, setMessage] = useState("");
    //Form validation & initial values
    ///////////////////////////////////////////////

    //Route params
    /////////////////////////////////
    const { id } = useParams();


    const validationSchema = Yup.object({
        orderDate: Yup.date().required("Order date is requred"),
        customerId: Yup.number().required("Customer is required"),
        orderDetails: Yup.array().of(
        Yup.object().shape({
            productId: Yup.number().required("Product name is required"),
            quantity: Yup.number().required("quantity is required"),
        })
      ),
    });
    const initialValues = {
        ...order
    };
    // Form hooks
    const fileInputRef = useRef(null);
    ////////////////////////
    // Data hooks
    //////////////////////////////////////////
    useEffect(() => {
        fetchserviceTypes();
        fetchProducts();
        fetchOrder();
    }, []);
    const fetchserviceTypes = async () => {
      const { data } = await getCustomers();
      setCustomers(data);
      console.log(data);
    };

    const fetchProducts = async () => {
        const { data } = await getProducts();
        setProducts(data);
        console.log(data);
      };

      const fetchOrder = async () => {
        // console.log(id);
   
     
         const { data } = await getOrderById(id);
         data.orderDate = format(data.orderDate,"yyyy-MM-dd")
         setOrder(data);
         console.log("order", data);
       };
   
  
    //Handlers
    ////////////////////////////////////
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
      // console.log(values);
    //   let part = {
    //     customerId: values.customerId,
    //     orderDate: values.orderDate,
        
    //     orderDetails: [...values.orderDetails],
    //   };
    //   console.log(part);
      const { data } = await putOrder(order.orderId,{
        orderId:order.orderId,
        customerId: values.customerId,
        orderDate: values.orderDate,
        
        orderDetails: [...values.orderDetails],

      });
    //   resetForm();
      setMessage("Data saved successfully");
      setNotificationOpen(true);
  
    };
  
    const handleClose = () => {
      setNotificationOpen(false);
    };
    return (
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}

        >
          {({ isSubmitting, setFieldValue, values, handleChange }) => {
            return (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h3">Order Edit Form</Typography>
                  </Grid>
  
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      fullWidth={true}
                      name="orderDate"
                      placeholder="Order Date"                    
                      type="date"
                      variant="standard"
                      helperText={<ErrorMessage name="orderDate" />}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    {/* <InputLabel id='catId'>Category</InputLabel> */}
                    <Field
                      as={TextField}
                      fullWidth={true}
                      name="customerId"
                      label="Customer Name"
                      variant="standard"
                      defaultValue={""}
                      value={values.customerId ?? ""}
                      select
                      onChange={(e) =>
                        (values.customerId = e.target.value ?? "")
                      }
                    >
                      {customers?.map((cat, index) => {
                        return (
                          <MenuItem key={index} value={cat.customerId}>
                            {cat.customerName}
                          </MenuItem>
                        );
                      })}
                    </Field>
                    <FormHelperText>
                      <ErrorMessage name="customerId" />
                    </FormHelperText>
                  </Grid>

                  <FieldArray name="orderDetails">
                    {(arrayHelpers) => {
                      return (
                        <>
                          <Grid item xs={12}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "10px",
                              }}
                            >
                              <Typography variant="h5">Details</Typography>
                              <Button
                                type="button"
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() =>
                                  arrayHelpers.push({ quantity: "", productId: ""})
                                }
                              >
                                Add
                              </Button>
                            </div>
                          </Grid>
                          {values.orderDetails?.map((pd, index) => {
                            return (
                              <Grid
                                container
                                key={index}
                                spacing={4}
                                paddingLeft={2}
                              >
                                <Grid item xs={5}>
                                  <Field
                                    as={TextField}
                                    fullWidth={true}
                                    name={`orderDetails.${index}.quantity`}
                                    label="Quantity"
                                    type="number"
                                    variant="standard"
                                    helperText={
                                      <ErrorMessage
                                        name={`orderDetails.${index}.quantity`}
                                      />
                                    }
                                  />
                                </Grid>
                                <Grid item xs={6}>
                    {/* <InputLabel id='catId'>Category</InputLabel> */}
                    <Field
                      as={TextField}
                      fullWidth={true}
                      name={`orderDetails.${index}.productId`}
                      label="Product"
                      variant="standard"
                      defaultValue={""}
                      value={values.orderDetails[index].productId?? ""}
                      select
                      onChange={(e) =>
                        (values.orderDetails[index].productId=e.target.value )
                      }
                    >
                      {products?.map((cat, index) => {
                        return (
                          <MenuItem key={index} value={cat.productId}>
                            {cat.productName}
                          </MenuItem>
                        );
                      })}
                    </Field>
                    <FormHelperText>
                      <ErrorMessage name={`orderDetails.${index}.productId`} />
                    </FormHelperText>
                  </Grid>
                                <Grid item xs={1}>
                                  <IconButton
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Grid>
                              </Grid>
                            );
                          })}
                        </>
                      );
                    }}
                  </FieldArray>
                  <Grid
                    item
                    xs={11}
                    style={{ justifyContent: "flex-end", display: "flex" }}
                  >
                    <Button type="submit" color="primary" variant="contained">
                      Submit
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{ justifyContent: "flex-start", display: "flex" }}
                  >
                    <Button
                      type="button"
                      color="primary"
                      variant="contained"
                      href="/OrderList"
                    >
                      Back to List
                    </Button>
                  </Grid>
                </Grid>
                {/* <input
                  multiple
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => onFilechange(e, setFieldValue)}
                  style={{ display: "none" }}
                /> */}
              </Form>
            );
          }}
        </Formik>
        <Snackbar
          open={notificationOpen}
          autoHideDuration={2000}
          message={message}
          action={"Undo"}
          onClose={handleClose}
        />
      </Container>
    );
  };
  export default OrderEditForm;
  
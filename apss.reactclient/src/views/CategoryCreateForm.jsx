import {
    Button,
    Container,
    Grid,
    TextField,
    Typography,
    Snackbar,
    FormHelperText,
    MenuItem
  } from "@mui/material";
  import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
  import { useEffect, useState, useRef } from "react";
  import * as Yup from "yup";
  import { postCategories,getVehicleTypes } from "../services/ProductCategoryService";

  const CategoryCreateForm = () => {


    const [vehicleTypes, setvehicleTypes] = useState([]);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [message, setMessage] = useState("");




    const validationSchema = Yup.object({
      productCategoryName: Yup.string().required("Product Category name is requred"),

    });
    const initialValues = {
      productCategoryName: "",
      vehicleTypeId:""
    };

    useEffect(() => {
      fetchVehicleTypes();
  }, []);
  const fetchVehicleTypes = async () => {
    const { data } = await getVehicleTypes();
    setvehicleTypes(data);
    console.log(data);
  };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
      let part = {
        productCategoryId: values.productCategoryId,
        productCategoryName: values.productCategoryName,
        vehicleTypeId:values.vehicleTypeId

      }
      console.log(part);
      await postCategories(part);
      resetForm();
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
        >
          {({ isSubmitting, setFieldValue, values, handleChange }) => {
            return (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6">Products Category form</Typography>
                  </Grid>
  
                  <Grid item xs={7}>
                    <Field
                      as={TextField}
                      fullWidth={true}
                      name="productCategoryName"
                      label="Product Category"
                      variant="standard"
                      helperText={<ErrorMessage name="productCategoryName" />}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    {/* <InputLabel id='catId'>Category</InputLabel> */}
                    <Field
                      as={TextField}
                      fullWidth={true}
                      name="vehicleTypeId"
                      label="Vehicle Type"
                      variant="standard"
                      select
                      onChange={(e) =>
                        (values.vehicleTypeId = e.target.value)
                      }
                    >
                      {vehicleTypes.map((cat, index) => {
                        return (
                          <MenuItem key={index} value={cat.vehicleTypeId}>
                            {cat.vehicleTypeName}
                          </MenuItem>
                        );
                      })}
                    </Field>
                    <FormHelperText>
                      <ErrorMessage name="customerId" />
                    </FormHelperText>
                  </Grid>


                  <Grid item xs={7} style={{justifyContent:"flex-end",display:"flex"}}>
                    <Button type="submit" color="primary" variant="contained">
                      Submit
                    </Button>
                  </Grid>
                  <Grid item xs={12} style={{justifyContent:"flex-start",display:"flex"}}>
                  <Button type="button" color="primary" variant="contained" href="/Categories">
                      Back to List
                    </Button>


                  </Grid>




                </Grid>
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
  export default CategoryCreateForm;
  
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Snackbar,
  FormHelperText,
  MenuItem,
} from "@mui/material";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useEffect, useState, useRef } from "react";
import * as Yup from "yup";
import { postSuppliers } from "../../services/SupplierService";

const SupplierCreateForm = () => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [message, setMessage] = useState("");

  const validationSchema = Yup.object({
    companyName: Yup.string().required("CompanyName is requred"),
    contactName: Yup.string().required("ContactName is requred"),
    contactNo: Yup.string().required("ContactNo is requred"),
  });
  const initialValues = {
    companyName: "",
    contactName: "",
    contactNo: "",
  };

  //     useEffect(() => {
  //       fetchVehicleTypes();
  //   }, []);
  //   const fetchVehicleTypes = async () => {
  //     const { data } = await getVehicleTypes();
  //     setvehicleTypes(data);
  //     console.log(data);
  //   };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    let part = {
      supplierId: values.supplierId,
      companyName: values.companyName,
      contactName: values.contactName,
      contactNo: values.contactNo,
    };
    console.log(part);
    await postSuppliers(part);
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
                  <Typography variant="h6">Suppliers Create Form</Typography>
                </Grid>

                <Grid item xs={7}>
                  <Field
                    as={TextField}
                    fullWidth={true}
                    name="companyName"
                    label="Company Name"
                    variant="standard"
                    helperText={<ErrorMessage name="companyName" />}
                  />
                </Grid>

                <Grid item xs={7}>
                  <Field
                    as={TextField}
                    fullWidth={true}
                    name="contactName"
                    label="Contact Name"
                    variant="standard"
                    helperText={<ErrorMessage name="contactName" />}
                  />
                </Grid>
                <Grid item xs={7}>
                  <Field
                    as={TextField}
                    fullWidth={true}
                    name="contactNo"
                    label="Contact No"
                    variant="standard"
                    helperText={<ErrorMessage name="contactNo" />}
                  />
                </Grid>


                <Grid
                  item
                  xs={7}
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
                    href="/SupplierList"
                  >
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
export default SupplierCreateForm;

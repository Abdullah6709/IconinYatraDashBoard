import React from "react";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";

const titles = ["Mr", "Mrs", "Ms", "Dr"];
const roles = ["Admin", "Manager", "Executive"];
const countries = ["India", "USA"];
const states = {
  India: ["Maharashtra", "Delhi", "Karnataka"],
  USA: ["California", "New York", "Texas"],
};
const cities = {
  Maharashtra: ["Mumbai", "Pune"],
  Delhi: ["New Delhi"],
  Karnataka: ["Bangalore"],
  California: ["Los Angeles", "San Francisco"],
  "New York": ["New York City"],
  Texas: ["Houston"],
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  mobile: Yup.string().required("Required"),
  alternateContact: Yup.string(),
  designation: Yup.string().required("Required"),
  userRole: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email"),
  title: Yup.string(),
  dob: Yup.date().nullable(),
  country: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  address1: Yup.string(),
  address2: Yup.string(),
  address3: Yup.string(),
  pincode: Yup.string(),
});

const StaffDetailForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      alternateContact: "",
      designation: "",
      userRole: "",
      email: "",
      title: "",
      dob: null,
      country: "",
      state: "",
      city: "",
      address1: "",
      address2: "",
      address3: "",
      pincode: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Data:", values);
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = formik;

  return (
    <Box p={3}>
      <Typography variant="h6" gutterBottom>
        Staff Detail Form
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Personal Details */}
        <Box border={1} borderColor="divider" borderRadius={2} p={2} mb={3}>
          <Typography variant="subtitle1" gutterBottom>
            Staff's Personal Details
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{xs:6}}>
              <TextField
                name="firstName"
                label="First Name"
                fullWidth
                required
                value={values.firstName}
                onChange={handleChange}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
            </Grid>
            <Grid size={{xs:6}}>
              <TextField
                name="lastName"
                label="Last Name"
                fullWidth
                required
                value={values.lastName}
                onChange={handleChange}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
            </Grid>
            <Grid size={{xs:6}}>
              <TextField
                name="mobile"
                label="Mobile Number"
                fullWidth
                value={values.mobile}
                onChange={handleChange}
                error={touched.mobile && Boolean(errors.mobile)}
                helperText={touched.mobile && errors.mobile}
              />
            </Grid>
            <Grid size={{xs:6}}>
              <TextField
                name="alternateContact"
                label="Alternate Contact"
                fullWidth
                value={values.alternateContact}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{xs:6}}>
              <TextField
                name="designation"
                label="Designation"
                fullWidth
                required
                value={values.designation}
                onChange={handleChange}
                error={touched.designation && Boolean(errors.designation)}
                helperText={touched.designation && errors.designation}
              />
            </Grid>
            <Grid size={{xs:6}}>
              <FormControl fullWidth required error={Boolean(errors.userRole)}>
                <InputLabel>User Role</InputLabel>
                <Select
                  name="userRole"
                  value={values.userRole}
                  onChange={handleChange}
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{xs:6}}>
              <TextField
                name="email"
                label="Email Id"
                fullWidth
                value={values.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{xs:3}}>
              <FormControl fullWidth>
                <InputLabel>Title</InputLabel>
                <Select
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                >
                  {titles.map((title) => (
                    <MenuItem key={title} value={title}>
                      {title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{xs:3}}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={values.dob}
                  onChange={(date) => setFieldValue("dob", date)}
                  format="DD-MM-YYYY"
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Box>

        {/* Location */}
        <Box border={1} borderColor="divider" borderRadius={2} p={2} mb={3}>
          <Typography variant="subtitle1" gutterBottom>
            Staff's Location
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{xs:4}}>
              <FormControl fullWidth required>
                <InputLabel>Country</InputLabel>
                <Select
                  name="country"
                  value={values.country}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue("state", "");
                    setFieldValue("city", "");
                  }}
                >
                  {countries.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{xs:4}}>
              <FormControl fullWidth required>
                <InputLabel>State</InputLabel>
                <Select
                  name="state"
                  value={values.state}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue("city", "");
                  }}
                  disabled={!values.country}
                >
                  {(states[values.country] || []).map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{xs:4}}>
              <FormControl fullWidth required>
                <InputLabel>City</InputLabel>
                <Select
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  disabled={!values.state}
                >
                  {(cities[values.state] || []).map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Address */}
        <Box border={1} borderColor="divider" borderRadius={2} p={2} mb={3}>
          <Typography variant="subtitle1" gutterBottom>
            Address
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{xs:12}}>
              <TextField
                name="address1"
                label="Address Line 1"
                fullWidth
                value={values.address1}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{xs:12}}>
              <TextField
                name="address2"
                label="Address Line 2"
                fullWidth
                value={values.address2}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{xs:9}}>
              <TextField
                name="address3"
                label="Address Line 3"
                fullWidth
                value={values.address3}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{xs:3}}>
              <TextField
                name="pincode"
                label="Pincode"
                fullWidth
                value={values.pincode}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>

        <Box display="flex" gap={2} justifyContent="center">
          <Button variant="contained" color="error" onClick={() => resetForm()}>
            Clear
          </Button>
          <Button variant="contained" type="submit">
            Save & Continue
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default StaffDetailForm;

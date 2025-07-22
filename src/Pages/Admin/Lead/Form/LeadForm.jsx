import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  InputLabel,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const validationSchema = Yup.object({
  fullName: Yup.string().required(" Name is required"),
  source: Yup.string().required("Source is required"),
  assignedTo: Yup.string().required("Assigned To is required"),
});

const CustomerDetailForm = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      mobile: "",
      alternateNumber: "",
      email: "",
      title: "",
      dob: null,
      country: "India",
      state: "",
      city: "",
      address1: "",
      address2: "",
      address3: "",
      pincode: "",
      businessType: "B2B",
      priority: "",
      source: "",
      assignedTo: "",
      note: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} p={2}>
      <Typography variant="h6" gutterBottom>
        Customer Detail Form
      </Typography>

      {/* Personal Details */}
      <Box border={1} borderRadius={1} p={2} mb={2}>
        <Typography fontWeight="bold" mb={2}>
          Personal Details
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{xs:12, sm:6, md:4}} >
            <TextField
              fullWidth
              label="Full Name *"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </Grid>
         
          <Grid size={{xs:12, sm:6, md:4}}>
            <TextField fullWidth label="Mobile" name="mobile" value={formik.values.mobile} onChange={formik.handleChange} />
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <TextField fullWidth label="Alternate Number" name="alternateNumber" value={formik.values.alternateNumber} onChange={formik.handleChange} />
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <TextField fullWidth label="Email" name="email" value={formik.values.email} onChange={formik.handleChange} />
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <TextField fullWidth label="Title" name="title" value={formik.values.title} onChange={formik.handleChange} select>
              <MenuItem value="Mr">Mr</MenuItem>
              <MenuItem value="Ms">Ms</MenuItem>
              <MenuItem value="Mrs">Mrs</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date Of Birth"
                value={formik.values.dob}
                onChange={(value) => formik.setFieldValue("dob", value)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>

      {/* Location */}
      <Box border={1} borderRadius={1} p={2} mb={2}>
        <Typography fontWeight="bold" mb={2}>
          Location
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{xs:12, sm:4}}>
            <TextField fullWidth label="Country" name="country" value={formik.values.country} onChange={formik.handleChange} />
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            <TextField fullWidth label="State" name="state" value={formik.values.state} onChange={formik.handleChange} />
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            <TextField fullWidth label="City" name="city" value={formik.values.city} onChange={formik.handleChange} />
          </Grid>
        </Grid>
      </Box>

      {/* Address & Official Detail */}
      <Grid container spacing={2} mb={2}>
        {/* Address */}
        <Grid size={{xs:12, md:6}}>
          <Box border={1} borderRadius={1} p={2} height="90%">
            <Typography fontWeight="bold" mb={2}>
              Address
            </Typography>
            <TextField fullWidth label="Address Line1" name="address1" value={formik.values.address1} onChange={formik.handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Address Line2" name="address2" value={formik.values.address2} onChange={formik.handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Address Line3" name="address3" value={formik.values.address3} onChange={formik.handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Pincode" name="pincode" value={formik.values.pincode} onChange={formik.handleChange} />
          </Box>
        </Grid>

        {/* Official Detail */}
        <Grid size={{xs:12, md:6}}>
          <Box border={1} borderRadius={1} p={2}>
            <Typography fontWeight="bold" mb={2}>
              Official Detail
            </Typography>

            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <FormLabel component="legend">Business Type</FormLabel>
              <RadioGroup row name="businessType" value={formik.values.businessType} onChange={formik.handleChange}>
                <FormControlLabel value="B2B" control={<Radio />} label="B2B" />
                <FormControlLabel value="B2C" control={<Radio />} label="B2C" />
              </RadioGroup>
            </FormControl>

            <TextField
              select
              fullWidth
              label="Priority"
              name="priority"
              value={formik.values.priority}
              onChange={formik.handleChange}
              sx={{ mb: 2 }}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </TextField>

            <TextField
              select
              fullWidth
              label="Source *"
              name="source"
              value={formik.values.source}
              onChange={formik.handleChange}
              error={formik.touched.source && Boolean(formik.errors.source)}
              helperText={formik.touched.source && formik.errors.source}
              sx={{ mb: 2 }}
            >
              <MenuItem value="">Select Source</MenuItem>
              <MenuItem value="Direct">Direct</MenuItem>
              <MenuItem value="Referral">Referral</MenuItem>
              <MenuItem value="Website">Website</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="Assigned To *"
              name="assignedTo"
              value={formik.values.assignedTo}
              onChange={formik.handleChange}
              error={formik.touched.assignedTo && Boolean(formik.errors.assignedTo)}
              helperText={formik.touched.assignedTo && formik.errors.assignedTo}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Note */}
      <Box mb={2}>
        <TextField
          label="Initial Note"
          name="note"
          multiline
          rows={3}
          fullWidth
          value={formik.values.note}
          onChange={formik.handleChange}
        />
      </Box>

      {/* Buttons */}
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined" color="primary" onClick={formik.handleReset}>
          Clear
        </Button>
        <Button variant="contained" type="submit">
          Save & Continue
        </Button>
      </Box>
    </Box>
  );
};

export default CustomerDetailForm;

import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const titles = ["Mr.", "Ms.", "Mrs.", "Dr."];
const statuses = ["Active", "Deactive", "Expired"];

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
    .required("Mobile Number is required"),
  alternateContact: Yup.string()
    .matches(/^[0-9]{10}$/, "Alternate Contact must be 10 digits")
    .required("Alternate Contact is required"),
  associateType: Yup.string().required("Associate Type is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  title: Yup.string().required("Title is required"),
  dob: Yup.date().nullable().required("Date of Birth is required"),
  associateUserId: Yup.string().required("Associates User ID is required"),
  associateStatus: Yup.string().required("Status is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  address1: Yup.string().required("Address Line 1 is required"),
  address2: Yup.string().required("Address Line 2 is required"),
  address3: Yup.string().required("Address Line 3 is required"),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
    .required("Pincode is required"),
});

const defaultInitialValues = {
  firstName: "",
  lastName: "",
  mobile: "",
  alternateContact: "",
  associateType: "",
  email: "",
  title: "",
  dob: null,
  associateUserId: "",
  associateStatus: "",
  country: "",
  state: "",
  city: "",
  address1: "",
  address2: "",
  address3: "",
  pincode: "",
};

const AssociatesEditForm = ({
  initialValues = defaultInitialValues,
  onSubmit,
  mode = "add",
  onClose,
}) => {
  const [associateTypes, setAssociateTypes] = useState(["Type A", "Type B"]);
  const [countries, setCountries] = useState(["India", "USA"]);
  const [states, setStates] = useState(["State 1", "State 2"]);
  const [cities, setCities] = useState(["City 1", "City 2"]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogField, setDialogField] = useState("");
  const [newOption, setNewOption] = useState("");

  const openAddDialog = (field) => {
    setDialogField(field);
    setNewOption("");
    setDialogOpen(true);
  };

  const handleAddOption = () => {
    if (newOption.trim()) {
      switch (dialogField) {
        case "associateType":
          setAssociateTypes([...associateTypes, newOption]);
          formik.setFieldValue("associateType", newOption);
          break;
        case "country":
          setCountries([...countries, newOption]);
          formik.setFieldValue("country", newOption);
          break;
        case "state":
          setStates([...states, newOption]);
          formik.setFieldValue("state", newOption);
          break;
        case "city":
          setCities([...cities, newOption]);
          formik.setFieldValue("city", newOption);
          break;
        default:
          break;
      }
      setDialogOpen(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      ...defaultInitialValues,
      ...initialValues,
      dob: initialValues?.dob ? dayjs(initialValues.dob) : null,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = {
        ...values,
        dob: values.dob ? values.dob.toISOString() : null,
      };
      onSubmit(formattedValues);
    },
  });

  return (
    <Box p={2} border="1px solid #ccc" borderRadius={2} position="relative">
      <IconButton
        size="small"
        sx={{ position: "absolute", top: 8, right: 8 }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>

      <Typography variant="h6" gutterBottom>
        {mode === "edit" ? "Edit Associate Details" : "Associate Detail Form"}
      </Typography>

      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        {/* Personal Details */}
        <Box mb={2}>
          <Typography fontWeight="bold" mb={1}>
            Associate’s Personal Details
          </Typography>
          <Grid container spacing={2}>
            {[
              { name: "firstName", label: "First Name" },
              { name: "lastName", label: "Last Name" },
              { name: "mobile", label: "Mobile Number" },
              { name: "alternateContact", label: "Alternate Contact" },
              {
                name: "associateType",
                label: "Associate Type",
                select: true,
                options: associateTypes,
                allowAdd: true,
              },
              { name: "email", label: "Email Id" },
              {
                name: "title",
                label: "Title",
                select: true,
                options: titles,
              },
            ].map((field) => (
              <Grid size={{xs:12, sm:6, md:3}} key={field.name}>
                <TextField
                  label={field.label}
                  name={field.name}
                  fullWidth
                  size="small"
                  select={field.select}
                  value={formik.values[field.name]}
                  onChange={(e) => {
                    if (e.target.value === "__add_new__") {
                      openAddDialog(field.name);
                    } else {
                      formik.handleChange(e);
                    }
                  }}
                  error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                  helperText={formik.touched[field.name] && formik.errors[field.name]}
                >
                  {field.select &&
                    field.options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  {field.allowAdd && (
                    <MenuItem value="__add_new__">Add New</MenuItem>
                  )}
                </TextField>
              </Grid>
            ))}
            <Grid size={{xs:12, sm:6, md:3}}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={formik.values.dob}
                  onChange={(value) => formik.setFieldValue("dob", value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      error={formik.touched.dob && Boolean(formik.errors.dob)}
                      helperText={formik.touched.dob && formik.errors.dob}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid size={{xs:12, sm:6, md:3}}>
              <TextField
                label="Associates User ID"
                name="associateUserId"
                fullWidth
                size="small"
                value={formik.values.associateUserId}
                onChange={formik.handleChange}
                error={formik.touched.associateUserId && Boolean(formik.errors.associateUserId)}
                helperText={formik.touched.associateUserId && formik.errors.associateUserId}
              />
            </Grid>
            <Grid size={{xs:12, sm:6, md:3}}>
              <TextField
                label="Associates Status"
                name="associateStatus"
                select
                fullWidth
                size="small"
                value={formik.values.associateStatus}
                onChange={formik.handleChange}
                error={formik.touched.associateStatus && Boolean(formik.errors.associateStatus)}
                helperText={formik.touched.associateStatus && formik.errors.associateStatus}
              >
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Box>

        {/* Location */}
        <Box mb={2}>
          <Typography fontWeight="bold" mb={1}>
            Associate’s Location
          </Typography>
          <Grid container spacing={2}>
            {[
              { name: "country", label: "Country", options: countries },
              { name: "state", label: "State", options: states },
              { name: "city", label: "City", options: cities },
            ].map((field) => (
              <Grid size={{xs:12, sm:4}} key={field.name}>
                <TextField
                  label={field.label}
                  name={field.name}
                  select
                  fullWidth
                  size="small"
                  value={formik.values[field.name]}
                  onChange={(e) => {
                    if (e.target.value === "__add_new__") {
                      openAddDialog(field.name);
                    } else {
                      formik.handleChange(e);
                    }
                  }}
                  error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                  helperText={formik.touched[field.name] && formik.errors[field.name]}
                >
                  {field.options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                  <MenuItem value="__add_new__">Add New</MenuItem>
                </TextField>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Address */}
        <Box mb={2}>
          <Typography fontWeight="bold" mb={1}>
            Address
          </Typography>
          <Grid container spacing={2}>
            {[
              { name: "address1", label: "Address Line 1" },
              { name: "address2", label: "Address Line 2" },
              { name: "address3", label: "Address Line 3" },
              { name: "pincode", label: "Pincode" },
            ].map((field) => (
              <Grid size={{xs:12, sm:6}} key={field.name}>
                <TextField
                  label={field.label}
                  name={field.name}
                  fullWidth
                  size="small"
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                  helperText={formik.touched[field.name] && formik.errors[field.name]}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Actions */}
        <Box display="flex" justifyContent="center" gap={2} mt={3}>
          <Button type="reset" variant="contained" color="info">
            Clear
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {mode === "edit" ? "Update" : "Save & Continue"}
          </Button>
        </Box>
      </form>

      {/* Dialog for Add New Option */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add New Option</DialogTitle>
        <DialogContent>
          <TextField
            label="New Value"
            fullWidth
            size="small"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddOption} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AssociatesEditForm;

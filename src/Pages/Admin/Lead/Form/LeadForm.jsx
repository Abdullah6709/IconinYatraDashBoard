import React, { useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AssociateDetailForm from "../../Associates/Form/AssociatesForm";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Name is required"),
  source: Yup.string().required("Source is required"),
  assignedTo: Yup.string().required("Assigned To is required"),
});

const LeadForm = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newValue, setNewValue] = useState("");
  const [activeField, setActiveField] = useState("");
  const [showAssociateForm, setShowAssociateForm] = useState(false);

  const navigate = useNavigate();

  const [dropdownOptions, setDropdownOptions] = useState({
    title: ["Mr", "Ms", "Mrs"],
    source: ["Direct", "Referral", "Agent's"],
    referralBy: [],
    agentName: [],
    assignedTo: ["Staff A", "Staff B"],
    priority: ["High", "Medium", "Low"],
    country: ["India", "USA", "Canada"],
    state: ["Karnataka", "Maharashtra"],
    city: ["Bangalore", "Mumbai"],
  });

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
      referralBy: "",
      agentName: "",
      assignedTo: "",
      note: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Submitted values:", values);
      navigate("/lead/leadtourform");
    },
  });

  const handleAddNewClick = (field) => {
    if (["assignedTo", "referralBy", "agentName"].includes(field)) {
      setActiveField(field);
      setShowAssociateForm(true);
    } else {
      setActiveField(field);
      setNewValue("");
      setDialogOpen(true);
    }
  };

  const handleAddNewValue = () => {
    if (newValue.trim() !== "") {
      setDropdownOptions((prev) => ({
        ...prev,
        [activeField]: [
          ...new Set([...(prev[activeField] || []), newValue.trim()]),
        ],
      }));
      formik.setFieldValue(activeField, newValue.trim());
      setDialogOpen(false);
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    if (value === "__add_new__") {
      handleAddNewClick(name);
    } else {
      formik.setFieldValue(name, value);
    }
  };

  const handleAssociateSave = (newName) => {
    if (!newName) return;
    setDropdownOptions((prev) => ({
      ...prev,
      [activeField]: [...new Set([...(prev[activeField] || []), newName])],
    }));
    formik.setFieldValue(activeField, newName);
    setShowAssociateForm(false);
  };

  const renderSelectField = (label, name, options = []) => (
    <TextField
      fullWidth
      select
      label={label}
      name={name}
      value={formik.values[name]}
      onChange={handleFieldChange}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      sx={{ mb: 2 }}
    >
      {options.map((opt) => (
        <MenuItem key={opt} value={opt}>
          {opt}
        </MenuItem>
      ))}
      {name !== "priority" && (
        <MenuItem value="__add_new__">➕ Add New</MenuItem>
      )}
    </TextField>
  );

  const renderTextField = (label, name) => (
    <TextField
      fullWidth
      label={label}
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      sx={{ mb: 2 }}
    />
  );

 

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
           <Grid size={{xs:12, sm:6,md:4}}>
            {renderSelectField("Title", "title", dropdownOptions.title)}
          </Grid>
          <Grid size={{xs:12, sm:6,md:4}}>
            {renderTextField("Full Name *", "fullName")}
          </Grid>
          <Grid size={{xs:12, sm:6,md:4}}>
            {renderTextField("Mobile", "mobile")}
          </Grid>
          <Grid size={{xs:12, sm:6,md:4}}>
            {renderTextField("Alternate Number", "alternateNumber")}
          </Grid>
          <Grid size={{xs:12, sm:6,md:4}}>
            {renderTextField("Email", "email")}
          </Grid>
         
          <Grid size={{xs:12, sm:6,md:4}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date Of Birth"
                value={formik.values.dob}
                onChange={(value) => formik.setFieldValue("dob", value)}
                renderInput={(params) => (
                  <TextField fullWidth sx={{ mb: 2 }} {...params} />
                )}
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
            {renderSelectField("Country", "country", dropdownOptions.country)}
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            {renderSelectField("State", "state", dropdownOptions.state)}
          </Grid>
          <Grid size={{xs:12, sm:4}}>
            {renderSelectField("City", "city", dropdownOptions.city)}
          </Grid>
        </Grid>
      </Box>

      {/* Address & Official Detail */}
      <Grid container spacing={2} mb={2}>
        <Grid size={{xs:12, md:6}}>
          <Box border={1} borderRadius={1} p={2} height="100%">
            <Typography fontWeight="bold" mb={2}>
              Address
            </Typography>
            {renderTextField("Address Line1", "address1")}
            {renderTextField("Address Line2", "address2")}
            {renderTextField("Address Line3", "address3")}
            {renderTextField("Pincode", "pincode")}
          </Box>
        </Grid>

        <Grid size={{xs:12, md:6}}>
          <Box border={1} borderRadius={1} p={2}>
            <Typography fontWeight="bold" mb={2}>
              Official Detail
            </Typography>

            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <FormLabel component="legend">Business Type</FormLabel>
              <RadioGroup
                row
                name="businessType"
                value={formik.values.businessType}
                onChange={formik.handleChange}
              >
                <FormControlLabel value="B2B" control={<Radio />} label="B2B" />
                <FormControlLabel value="B2C" control={<Radio />} label="B2C" />
              </RadioGroup>
            </FormControl>

            {renderSelectField(
              "Priority",
              "priority",
              dropdownOptions.priority
            )}
            {renderSelectField("Source *", "source", dropdownOptions.source)}

            {formik.values.businessType === "B2B" &&
              formik.values.source === "Referral" &&
              renderSelectField(
                "Referral By",
                "referralBy",
                dropdownOptions.referralBy
              )}

            {formik.values.businessType === "B2B" &&
              formik.values.source === "Agent's" &&
              renderSelectField(
                "Agent Name",
                "agentName",
                dropdownOptions.agentName
              )}

            {renderSelectField(
              "Assigned To *",
              "assignedTo",
              dropdownOptions.assignedTo
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Note */}
      <Box mb={2} mt={6}>
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
      <Box display="flex" justifyContent="center" gap={2}>
        <Button variant="outlined" onClick={formik.handleReset}>
          Clear
        </Button>
        <Button variant="contained" type="submit" >
          Save & Continue
        </Button>
      </Box>

      {/* Add New Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add New</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Enter New Option"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewValue("")}>Clear</Button>
          <Button onClick={handleAddNewValue} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Associate Form Dialog */}
      <Dialog
        open={showAssociateForm}
        onClose={() => setShowAssociateForm(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <AssociateDetailForm onSave={handleAssociateSave} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default LeadForm;

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
import { DatePicker } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import * as Yup from "yup";

// Reusable select component with Add New logic
const SelectField = ({
  name,
  label,
  value,
  onChange,
  options,
  error,
  helperText,
  handleOpenDialog,
}) => (
  <TextField
    select
    fullWidth
    name={name}
    label={label}
    value={value}
    onChange={onChange}
    error={error}
    helperText={helperText}
  >
    {options.map((opt) =>
      opt === "__add_new" ? (
        <MenuItem
          key={`add-${name}`}
          value=""
          onClick={() => handleOpenDialog(name)}
        >
          + Add New
        </MenuItem>
      ) : (
        <MenuItem key={opt} value={opt}>
          {opt}
        </MenuItem>
      )
    )}
  </TextField>
);

const LeadTourForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentField, setCurrentField] = useState("");
  const [addMore, setAddMore] = useState("");
  const [customItems, setCustomItems] = useState({
    country: [],
    destination: [],
    services: [],
    arrivalCity: [],
    arrivalLocation: [],
    departureCity: [],
    departureLocation: [],
    hotelType: [],
    mealPlan: [],
    sharingType: [],
  });

  const defaultOptions = {
    country: ["France", "USA", "Japan"],
    destination: ["Delhi", "Paris"],
    services: ["Hotel", "Transport"],
    arrivalCity: ["Mumbai", "Delhi"],
    arrivalLocation: ["Airport"],
    departureCity: ["Delhi"],
    departureLocation: ["Hotel"],
    hotelType: ["3 Star", "5 Star"],
    mealPlan: ["Breakfast"],
    sharingType: ["Twin"],
  };

  const getOptions = (field) => [
    ...(defaultOptions[field] || []),
    ...(customItems[field] || []),
    "__add_new",
  ];

  const formik = useFormik({
    initialValues: {
      tourType: "Domestic",
      country: "",
      destination: "",
      services: "",
      adults: "",
      children: "",
      kidsWithoutMattress: "",
      infants: "",
      arrivalDate: null,
      arrivalCity: "",
      arrivalLocation: "",
      departureDate: null,
      departureCity: "",
      departureLocation: "",
      hotelType: "",
      mealPlan: "",
      transport: "No",
      sharingType: "",
      noOfRooms: "",
      noOfMattress: "0",
      noOfNights: "",
      requirementNote: "",
    },
    validationSchema: Yup.object({
      destination: Yup.string().required("Required"),
      services: Yup.string().required("Required"),
      adults: Yup.number().required("Required").min(1, "At least 1 adult"),
      arrivalDate: Yup.date().required("Required"),
      departureDate: Yup.date().required("Required"),
      sharingType: Yup.string().required("Required"),
      noOfRooms: Yup.number().required("Required").min(1, "At least 1 room"),
      country: Yup.string().when("tourType", {
        is: "International",
        then: Yup.string().required("Country is required"),
      }),
    }),
    onSubmit: (values) => console.log("Submitted:", values),
  });

  const { values, touched, errors, handleChange, handleSubmit, setFieldValue } =
    formik;

  const openAddDialog = (field) => {
    setCurrentField(field);
    setOpenDialog(true);
  };

  const handleAddItem = () => {
    if (addMore.trim()) {
      setCustomItems((prev) => ({
        ...prev,
        [currentField]: [...prev[currentField], addMore.trim()],
      }));
      setFieldValue(currentField, addMore.trim());
      setAddMore("");
      setOpenDialog(false);
    }
  };

  const renderTextInputs = [
    { name: "adults", label: "No of Adults", required: true },
    { name: "children", label: "No of Children(6-12)" },
    { name: "kidsWithoutMattress", label: "No of Kids(2-5)" },
    { name: "infants", label: "No of Infants" },
    { name: "noOfRooms", label: "No of Rooms", required: true },
    { name: "noOfMattress", label: "No of Mattress" },
    { name: "noOfNights", label: "No of Nights" },
  ];

  return (
    <Box p={3}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6">Tour Detail Form</Typography>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Add New {currentField}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              autoFocus
              value={addMore}
              onChange={(e) => setAddMore(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleAddItem}>Add</Button>
          </DialogActions>
        </Dialog>

        {/* Tour Type */}
        <Box mt={2} p={2} border={1} borderRadius={2} borderColor="grey.300">
          <Typography variant="subtitle1">Basic Tour Details</Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl>
                <FormLabel>Tour Type</FormLabel>
                <RadioGroup
                  row
                  name="tourType"
                  value={values.tourType}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Domestic"
                    control={<Radio />}
                    label="Domestic"
                  />
                  <FormControlLabel
                    value="International"
                    control={<Radio />}
                    label="International"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            {values.tourType === "International" && (
              <Grid size={{ xs: 12, md: 6 }}>
                <SelectField
                  name="country"
                  label="Country"
                  value={values.country}
                  onChange={handleChange}
                  options={getOptions("country")}
                  error={touched.country && Boolean(errors.country)}
                  helperText={touched.country && errors.country}
                  handleOpenDialog={openAddDialog}
                />
              </Grid>
            )}

            <Grid size={{ xs: 12, md: 6 }}>
              <SelectField
                name="destination"
                label="Tour Destination"
                value={values.destination}
                onChange={handleChange}
                options={getOptions("destination")}
                error={touched.destination && Boolean(errors.destination)}
                helperText={touched.destination && errors.destination}
                handleOpenDialog={openAddDialog}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <SelectField
                name="services"
                label="Services Required"
                value={values.services}
                onChange={handleChange}
                options={getOptions("services")}
                error={touched.services && Boolean(errors.services)}
                helperText={touched.services && errors.services}
                handleOpenDialog={openAddDialog}
              />
            </Grid>

            {renderTextInputs.slice(0, 4).map(({ name, label, required }) => (
              <Grid size={{ xs: 12, md: 3 }} key={name}>
                <TextField
                  fullWidth
                  name={name}
                  label={label}
                  value={values[name]}
                  onChange={handleChange}
                  error={touched[name] && Boolean(errors[name])}
                  helperText={touched[name] && errors[name]}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Pickup / Drop Section */}
        <Box mt={3} p={2} border={1} borderRadius={2} borderColor="grey.300">
          <Typography variant="subtitle1">Pickup/Drop</Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <DatePicker
                label="Arrival Date"
                value={values.arrivalDate}
                onChange={(val) => setFieldValue("arrivalDate", val)}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    error={touched.arrivalDate && Boolean(errors.arrivalDate)}
                    helperText={touched.arrivalDate && errors.arrivalDate}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <SelectField
                name="arrivalCity"
                label="Arrival City"
                value={values.arrivalCity}
                onChange={handleChange}
                options={getOptions("arrivalCity")}
                handleOpenDialog={openAddDialog}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <SelectField
                name="arrivalLocation"
                label="Arrival Location"
                value={values.arrivalLocation}
                onChange={handleChange}
                options={getOptions("arrivalLocation")}
                handleOpenDialog={openAddDialog}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <DatePicker
                label="Departure Date"
                value={values.departureDate}
                onChange={(val) => setFieldValue("departureDate", val)}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    error={
                      touched.departureDate && Boolean(errors.departureDate)
                    }
                    helperText={touched.departureDate && errors.departureDate}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <SelectField
                name="departureCity"
                label="Departure City"
                value={values.departureCity}
                onChange={handleChange}
                options={getOptions("departureCity")}
                handleOpenDialog={openAddDialog}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <SelectField
                name="departureLocation"
                label="Departure Location"
                value={values.departureLocation}
                onChange={handleChange}
                options={getOptions("departureLocation")}
                handleOpenDialog={openAddDialog}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Accommodation */}
        <Box mt={3} p={2} border={1} borderRadius={2} borderColor="grey.300">
          <Typography variant="subtitle1">Accommodation & Facility</Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <SelectField
                name="hotelType"
                label="Hotel Type"
                value={values.hotelType}
                onChange={handleChange}
                options={getOptions("hotelType")}
                handleOpenDialog={openAddDialog}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <SelectField
                name="mealPlan"
                label="Meal Plan"
                value={values.mealPlan}
                onChange={handleChange}
                options={getOptions("mealPlan")}
                handleOpenDialog={openAddDialog}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl>
                <FormLabel>Transport</FormLabel>
                <RadioGroup
                  row
                  name="transport"
                  value={values.transport}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <SelectField
                name="sharingType"
                label="Sharing Type"
                value={values.sharingType}
                onChange={handleChange}
                options={getOptions("sharingType")}
                error={touched.sharingType && Boolean(errors.sharingType)}
                helperText={touched.sharingType && errors.sharingType}
                handleOpenDialog={openAddDialog}
              />
            </Grid>
            {renderTextInputs.slice(4).map(({ name, label }) => (
              <Grid size={{ xs: 12, md: 4 }} key={name}>
                <TextField
                  fullWidth
                  name={name}
                  label={label}
                  value={values[name]}
                  onChange={handleChange}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box mt={3}>
          <TextField
            fullWidth
            multiline
            rows={4}
            name="requirementNote"
            label="Requirement Note"
            value={values.requirementNote}
            onChange={handleChange}
          />
        </Box>

        <Box mt={2} display="flex" justifyContent="center">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LeadTourForm;

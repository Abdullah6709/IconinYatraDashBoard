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

const LeadTourForm = () => {
  // State for managing new items and dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [currentField, setCurrentField] = useState("");
  const [addMore, setNewItem] = useState("");
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
        then: (schema) => schema.required("Country is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
    onSubmit: (values) => {
      console.log("Submitted:", values);
    },
  });

  const { values, handleChange, setFieldValue, handleSubmit, touched, errors } =
    formik;

  // Handle opening the add new dialog
  const handleOpenDialog = (fieldName) => {
    setCurrentField(fieldName);
    setOpenDialog(true);
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewItem("");
  };

  // Handle adding a new item
  const handleAddNewItem = () => {
    if (addMore.trim()) {
      setCustomItems((prev) => ({
        ...prev,
        [currentField]: [...prev[currentField], addMore.trim()],
      }));
      setFieldValue(currentField, addMore.trim());
      handleCloseDialog();
    }
  };

  // Get options for a specific field including default and custom items
  const getOptionsForField = (fieldName) => {
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

    return [
      ...(defaultOptions[fieldName] || []),
      ...(customItems[fieldName] || []),
      { value: "__add_new", label: "+ Add New" },
    ];
  };

  return (
    <Box p={3}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6">Tour Detail Form</Typography>

        {/* Add New Item Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Add New {currentField}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label={`New ${currentField}`}
              fullWidth
              value={addMore}
              onChange={(e) => setNewItem(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleAddNewItem} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        <Box mt={2} p={2} border={1} borderRadius={2} borderColor="grey.300">
          <Typography variant="subtitle1" gutterBottom>
            Basic Tour Details
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{xs:12, md:6}}>
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
              <Grid size={{xs:12, md:6}}>
                <TextField
                  select
                  fullWidth
                  name="country"
                  label="Country"
                  value={values.country}
                  onChange={handleChange}
                  error={touched.country && Boolean(errors.country)}
                  helperText={touched.country && errors.country}
                >
                  {getOptionsForField("country").map((option) =>
                    option.value === "__add_new" ? (
                      <MenuItem
                        key="add-new-country"
                        value=""
                        onClick={() => handleOpenDialog("country")}
                      >
                        + Add New
                      </MenuItem>
                    ) : (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    )
                  )}
                </TextField>
              </Grid>
            )}

            <Grid size={{xs:12, md:6}}>
              <TextField
                select
                fullWidth
                name="destination"
                label="Tour Destination"
                value={values.destination}
                onChange={handleChange}
                error={touched.destination && Boolean(errors.destination)}
                helperText={touched.destination && errors.destination}
              >
                {getOptionsForField("destination").map((option) =>
                  option.value === "__add_new" ? (
                    <MenuItem
                      key="add-new-destination"
                      value=""
                      onClick={() => handleOpenDialog("destination")}
                    >
                      + Add New
                    </MenuItem>
                  ) : (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>

            <Grid size={{xs:12}}>
              <TextField
                select
                fullWidth
                name="services"
                label="Services Required"
                value={values.services}
                onChange={handleChange}
                error={touched.services && Boolean(errors.services)}
                helperText={touched.services && errors.services}
              >
                {getOptionsForField("services").map((option) =>
                  option.value === "__add_new" ? (
                    <MenuItem
                      key="add-new-service"
                      value=""
                      onClick={() => handleOpenDialog("services")}
                    >
                      + Add New
                    </MenuItem>
                  ) : (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>

            <Grid size={{xs:12, md:3}}>
              <TextField
                fullWidth
                name="adults"
                label="No of Adults"
                value={values.adults}
                onChange={handleChange}
                error={touched.adults && Boolean(errors.adults)}
                helperText={touched.adults && errors.adults}
              />
            </Grid>
            <Grid size={{xs:12, md:3}}>
              <TextField
                fullWidth
                name="children"
                label="No of Children(6-12)"
                value={values.children}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{xs:12, md:3}}>
              <TextField
                fullWidth
                name="kidsWithoutMattress"
                label="No of Kids(2-5)"
                value={values.kidsWithoutMattress}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{xs:12, md:3}}>
              <TextField
                fullWidth
                name="infants"
                label="No of Infants"
                value={values.infants}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>

        <Box mt={3} p={2} border={1} borderRadius={2} borderColor="grey.300">
          <Typography variant="subtitle1" gutterBottom>
            Pickup/Drop
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{xs:12, md:3}}>
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
            <Grid size={{xs:12, md:3}}>
              <TextField
                select
                fullWidth
                name="arrivalCity"
                label="Arrival City"
                value={values.arrivalCity}
                onChange={handleChange}
              >
                {getOptionsForField("arrivalCity").map((option) =>
                  option.value === "__add_new" ? (
                    <MenuItem
                      key="add-new-arrival-city"
                      value=""
                      onClick={() => handleOpenDialog("arrivalCity")}
                    >
                      + Add New
                    </MenuItem>
                  ) : (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>
            <Grid size={{xs:12, md:3}}>
              <TextField
                select
                fullWidth
                name="arrivalLocation"
                label="Arrival Location"
                value={values.arrivalLocation}
                onChange={handleChange}
              >
                {getOptionsForField("arrivalLocation").map((option) =>
                  option.value === "__add_new" ? (
                    <MenuItem
                      key="add-new-arrival-location"
                      value=""
                      onClick={() => handleOpenDialog("arrivalLocation")}
                    >
                      + Add New
                    </MenuItem>
                  ) : (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>

            <Grid size={{xs:12, md:3}}>
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
            <Grid size={{xs:12, md:3}}>
              <TextField
                select
                fullWidth
                name="departureCity"
                label="Departure City"
                value={values.departureCity}
                onChange={handleChange}
              >
                {getOptionsForField("departureCity").map((option) =>
                  option.value === "__add_new" ? (
                    <MenuItem
                      key="add-new-departure-city"
                      value=""
                      onClick={() => handleOpenDialog("departureCity")}
                    >
                      + Add New
                    </MenuItem>
                  ) : (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>
            <Grid size={{xs:12, md:3}}>
              <TextField
                select
                fullWidth
                name="departureLocation"
                label="Departure Location"
                value={values.departureLocation}
                onChange={handleChange}
              >
                {getOptionsForField("departureLocation").map((option) =>
                  option.value === "__add_new" ? (
                    <MenuItem
                      key="add-new-departure-location"
                      value=""
                      onClick={() => handleOpenDialog("departureLocation")}
                    >
                      + Add New
                    </MenuItem>
                  ) : (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>
          </Grid>
        </Box>

        <Box mt={3} p={2} border={1} borderRadius={2} borderColor="grey.300">
          <Typography variant="subtitle1" gutterBottom>
            Accommodation & Facility
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{xs:12, md:3}}>
              <TextField
                select
                fullWidth
                name="hotelType"
                label="Hotel Type"
                value={values.hotelType}
                onChange={handleChange}
              >
                {getOptionsForField("hotelType").map((option) =>
                  option.value === "__add_new" ? (
                    <MenuItem
                      key="add-new-hotel-type"
                      value=""
                      onClick={() => handleOpenDialog("hotelType")}
                    >
                      + Add New
                    </MenuItem>
                  ) : (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>
            <Grid size={{xs:12, md:3}}>
              <TextField
                select
                fullWidth
                name="mealPlan"
                label="Meal Plan"
                value={values.mealPlan}
                onChange={handleChange}
              >
                {getOptionsForField("mealPlan").map((option) =>
                  option.value === "__add_new" ? (
                    <MenuItem
                      key="add-new-meal-plan"
                      value=""
                      onClick={() => handleOpenDialog("mealPlan")}
                    >
                      + Add New
                    </MenuItem>
                  ) : (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>
            <Grid size={{xs:12, md:3}}>
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
            <Grid size={{xs:12, md:3}}>
              <TextField
                select
                fullWidth
                name="sharingType"
                label="Sharing Type"
                value={values.sharingType}
                onChange={handleChange}
                error={touched.sharingType && Boolean(errors.sharingType)}
                helperText={touched.sharingType && errors.sharingType}
              >
                {getOptionsForField("sharingType").map((option) =>
                  option.value === "__add_new" ? (
                    <MenuItem
                      key="add-new-sharing-type"
                      value=""
                      onClick={() => handleOpenDialog("sharingType")}
                    >
                      + Add New
                    </MenuItem>
                  ) : (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>
            <Grid size={{xs:4}}>
              <TextField
                fullWidth
                name="noOfRooms"
                label="No of Rooms"
                value={values.noOfRooms}
                onChange={handleChange}
                error={touched.noOfRooms && Boolean(errors.noOfRooms)}
                helperText={touched.noOfRooms && errors.noOfRooms}
              />
            </Grid>
            <Grid size={{xs:4}}>
              <TextField
                fullWidth
                name="noOfMattress"
                label="No of Mattress"
                value={values.noOfMattress}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{xs:4}}>
              <TextField
                fullWidth
                name="noOfNights"
                label="No of Nights"
                value={values.noOfNights}
                onChange={handleChange}
              />
            </Grid>
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
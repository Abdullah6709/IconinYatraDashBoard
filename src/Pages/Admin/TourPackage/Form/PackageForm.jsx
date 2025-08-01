import React, { useState } from "react";
import {
  Box,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Button,
  Typography,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
const sectors = [
  "Uttar Pradesh",
  "Maharashtra",
  "Kerala",
  "Goa",
  "Kashmir",
  "Rajasthan",
];
const subTypes = ["Adventure", "Leisure", "Cultural"];
const countries = ["Thailand", "France", "USA", "Japan", "Australia"];

const PackageForm = () => {
  const [tourType, setTourType] = useState("Domestic");
  const [locationList, setLocationList] = useState([]);
  const [stayLocationList, setStayLocationList] = useState([]);

  const formik = useFormik({
    initialValues: {
      tourType: "Domestic",
      sector: "",
      subType: "",
      destinationCountry: "",
    },
    validationSchema: Yup.object({
      sector: Yup.string().required("Sector is required"),
      subType: Yup.string().required("Package Sub Type is required"),
      destinationCountry: Yup.string().when("tourType", {
        is: "International",
        then: Yup.string().required("Destination country is required"),
      }),
    }),
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      console.log("Stay Locations:", stayLocationList);
    },
  });

  const handleTourTypeChange = (e) => {
    const selectedType = e.target.value;
    setTourType(selectedType);
    formik.setValues({
      tourType: selectedType,
      sector: "",
      subType: "",
      destinationCountry: "",
    });
    setLocationList([]);
    setStayLocationList([]);
  };

  const handleSectorChange = (e) => {
    const selectedSector = e.target.value;
    formik.setFieldValue("sector", selectedSector);
    if (tourType === "Domestic") {
      setLocationList([
        `${selectedSector} - City 1`,
        `${selectedSector} - City 2`,
        `${selectedSector} - City 3`,
      ]);
      setStayLocationList([]);
    }
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) return;

   
    if (source.droppableId === "locationList" && destination.droppableId === "stayLocationList") {
      const sourceItems = [...locationList];
      const [movedItem] = sourceItems.splice(source.index, 1);
      const updatedStayList = [...stayLocationList, { name: movedItem, nights: "" }];
      setLocationList(sourceItems);
      setStayLocationList(updatedStayList);
    }
  };

  return (
    <Box border={1} borderColor="grey.300" borderRadius={1} p={2}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Package Entry Form
      </Typography>
      <Typography variant="subtitle1" color="primary" gutterBottom>
        Destination
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{xs:12, sm:3}}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Tour Type</FormLabel>
              <RadioGroup
                row
                name="tourType"
                value={tourType}
                onChange={handleTourTypeChange}
              >
                <FormControlLabel value="Domestic" control={<Radio />} label="Domestic" />
                <FormControlLabel value="International" control={<Radio />} label="International" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid size={{xs:12, sm:3}}>
            {tourType === "Domestic" ? (
              <TextField
                fullWidth
                select
                label="Sector"
                name="sector"
                value={formik.values.sector}
                onChange={handleSectorChange}
                error={formik.touched.sector && Boolean(formik.errors.sector)}
                helperText={formik.touched.sector && formik.errors.sector}
              >
                {sectors.map((sector) => (
                  <MenuItem key={sector} value={sector}>
                    {sector}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                fullWidth
                label="Sector (Manual Input)"
                name="sector"
                value={formik.values.sector}
                onChange={formik.handleChange}
                error={formik.touched.sector && Boolean(formik.errors.sector)}
                helperText={formik.touched.sector && formik.errors.sector}
              />
            )}
          </Grid>

          <Grid size={{xs:12, sm:3}}>
            <TextField
              fullWidth
              select
              label="Package Sub Type"
              name="subType"
              value={formik.values.subType}
              onChange={formik.handleChange}
              error={formik.touched.subType && Boolean(formik.errors.subType)}
              helperText={formik.touched.subType && formik.errors.subType}
            >
              {subTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {tourType === "International" && (
            <Grid size={{xs:12, sm:3}}>
              <TextField
                fullWidth
                select
                label="Destination Country"
                name="destinationCountry"
                value={formik.values.destinationCountry}
                onChange={formik.handleChange}
                error={formik.touched.destinationCountry && Boolean(formik.errors.destinationCountry)}
                helperText={formik.touched.destinationCountry && formik.errors.destinationCountry}
              >
                {countries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          <Grid size={{xs:12}}>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Grid container spacing={2}>
                {/* Location List */}
                <Grid size={{xs:12, sm:6}}>
                  <Typography variant="subtitle2" color="primary">
                    Location
                  </Typography>
                  <Typography variant="caption" color="error">
                    Drag & Drop to select city
                  </Typography>
                  <Droppable droppableId="locationList">
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        sx={{
                          border: "1px solid #ccc",
                          minHeight: 200,
                          backgroundColor: "#fff",
                          mt: 1,
                          p: 1,
                          borderRadius: 1,
                        }}
                      >
                        {locationList.map((city, index) => (
                          <Draggable key={city} draggableId={city} index={index}>
                            {(provided) => (
                              <Box
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                sx={{
                                  mb: 1,
                                  p: 1,
                                  bgcolor: "#f5f5f5",
                                  borderRadius: 1,
                                  cursor: "grab",
                                  boxShadow: 1,
                                }}
                              >
                                {city}
                              </Box>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                </Grid>

                {/* Stay Location List with Nights */}
                <Grid size={{xs:12, sm:6}}>
                  <Typography variant="subtitle2" color="primary">
                    Stay Location
                  </Typography>
                  <Typography variant="caption" color="error">
                    Arrange Cities & Assign Nights
                  </Typography>
                  <Droppable droppableId="stayLocationList">
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        sx={{
                          border: "1px solid #ccc",
                          minHeight: 200,
                          backgroundColor: "#fff",
                          mt: 1,
                          p: 1,
                          borderRadius: 1,
                        }}
                      >
                        {stayLocationList.map((city, index) => (
                          <Draggable key={city.name} draggableId={city.name} index={index}>
                            {(provided) => (
                              <Box
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                sx={{
                                  mb: 2,
                                  p: 1,
                                  bgcolor: "#e8f4fd",
                                  borderRadius: 1,
                                  boxShadow: 1,
                                }}
                              >
                                <Typography>{city.name}</Typography>
                                <TextField
                                  fullWidth
                                  label="Number of Nights"
                                  type="number"
                                  size="small"
                                  value={city.nights}
                                  onChange={(e) => {
                                    const updated = [...stayLocationList];
                                    updated[index].nights = e.target.value;
                                    setStayLocationList(updated);
                                  }}
                                  sx={{ mt: 1 }}
                                />
                              </Box>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                </Grid>
              </Grid>
            </DragDropContext>
          </Grid>

          <Grid size={{xs:12}} textAlign="center" mt={2}>
            <Button type="submit" variant="contained" sx={{ bgcolor: "#4db9f3" }}>
              Save & Continue
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default PackageForm;

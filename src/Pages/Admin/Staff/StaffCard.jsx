import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  IconButton,
  Container,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const stats = [
  { title: "Today's", active: 0, lead: 0, quotation: 0 },
  { title: "This Month", active: 0, lead: 0, quotation: 0 },
  { title: "Last 3 Months", active: 0, lead: 0, quotation: 0 },
  { title: "Last 6 Months", active: 0, lead: 0, quotation: 0 },
  { title: "Last 12 Months", active: 15, lead: 0, quotation: 0 },
];

const initialStaffList = [
  {
    id: 1,
    staffId: 30,
    staffName: "Ketan Bhikhu",
    mobile: "7852031254",
    email: "ketan@gmail.com",
    city: "Delhi",
    designation: "Noida",
  },
  {
    id: 2,
    staffId: 32,
    staffName: "Raj Kumar",
    mobile: "7245891254",
    email: "raj@gmail.com",
    city: "Mumbai",
    designation: "Delhi",
  },
];

const StaffCard = () => {
  const navigate = useNavigate();

  const [staffList, setStaffList] = React.useState(initialStaffList);

  const handleAddClick = () => {
    navigate("/staffform");
  };

//   const handleEditClick = (row) => {
//     navigate("/staff/staffeditform", {
//       state: { staffData: row },
//     });
//   };

  const handleDeleteClick = (id) => {
    const updatedList = staffList.filter((staff) => staff.id !== id);
    setStaffList(updatedList);
  };

  const columns = [
    { field: "id", headerName: "Sr No.", width: 60 },
    { field: "staffId", headerName: "Staff Id", width: 100 },
    { field: "staffName", headerName: "Staff Name", width: 200 },
    { field: "mobile", headerName: "Mobile", width: 120 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "city", headerName: "City", width: 120 },
    { field: "designation", headerName: "Designation", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 80,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleEditClick(params.row)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => handleDeleteClick(params.row.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box py={3}>
        {/* Stat Cards */}
        <Grid container spacing={2}>
          {stats.map((item, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
              <Card
                sx={{
                  backgroundColor: "#0b6396ff",
                  color: "#fff",
                  height: "100%",
                }}
              >
                <CardContent>
                  <Typography variant="h6">
                    {item.title}: {item.active}
                  </Typography>
                  <Typography variant="body2">Active: {item.active}</Typography>
                  <Typography variant="body2">
                    Lead: {item.lead}
                  </Typography>
                  <Typography variant="body2">
                    Quotation: {item.quotation}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Actions */}
        <Box
          mt={3}
          mb={2}
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          gap={2}
        >
          <Button
            variant="contained"
            color="warning"
            sx={{ minWidth: 100 }}
            onClick={handleAddClick}
          >
            Add
          </Button>

          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            sx={{ width: { xs: "100%", sm: 300 } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Data Grid */}
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <Box sx={{ minWidth: "600px" }}>
            <DataGrid
              rows={staffList}
              columns={columns}
              pageSize={7}
              rowsPerPageOptions={[7, 25, 50, 100]}
              autoHeight
              disableRowSelectionOnClick
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default StaffCard;

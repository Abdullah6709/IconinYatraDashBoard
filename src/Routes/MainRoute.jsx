import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../Pages/Admin/Dashboard";

import DashboardLayout from "../Layout/DashboardLayout";
import LeadCard from "../Pages/Admin/Lead/LeadCard";
import LeadForm from "../Pages/Admin/Lead/Form/LeadForm";
import LeadEditForm from "../Pages/Admin/Lead/Form/LeadEditForm";
import HotelCard from "../Pages/Admin/Hotel/HotelCard";
import HotelForm from "../Pages/Admin/Hotel/Form/HotelForm";
import HotelEditForm from "../Pages/Admin/Hotel/Form/HotelEditForm";
import PackageCard from "../Pages/Admin/TourPackage/PackageCard";
import PackageForm from "../Pages/Admin/TourPackage/Form/PackageForm";
import PackageEditForm from "../Pages/Admin/TourPackage/Form/PackageEditForm";
import AssociatesCard from "../Pages/Admin/Associates/AssociatesCard";
import AssociatesForm from "../Pages/Admin/Associates/Form/AssociatesForm";
import AssociatesEditFrom from "../Pages/Admin/Associates/Form/AssociatesEditFrom";
import StaffCard from "../Pages/Admin/Staff/StaffCard";
import StaffForm from "../Pages/Admin/Staff/Form/StaffForm";
import LeadTourForm from "../Pages/Admin/Lead/Form/LeadTourForm";
import StaffFormDetail from "../Pages/Admin/Staff/Form/StaffFormDetail";
const MainRoute = () => {
  const isAuthenticated = true;

  return isAuthenticated ? (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        {/* Lead Routing */}
        <Route path="/lead" element={<LeadCard />} />
        <Route path="/leadform" element={<LeadForm />} />
        <Route path="/lead/leadtourform" element={<LeadTourForm />} />
        <Route path="/lead/leadeditform" element={<LeadEditForm />} />

        {/*Hotel Routing */}
        <Route path="/hotel" element={<HotelCard />} />
        <Route path="/hotelform" element={<HotelForm />} />
        <Route path="/hotel/hoteleditform" element={<HotelEditForm />} />

        {/* Package Routing */}
        <Route path="/tourpackage" element={<PackageCard />} />
        <Route path="/packageform" element={<PackageForm />} />
        <Route
          path="/tourpackage/packageeditform"
          element={<PackageEditForm />}
        />

        {/* Associates Route */}
        <Route path="/associates" element={<AssociatesCard />} />
        <Route path="/associatesform" element={<AssociatesForm />} />
        <Route path="/associates/associateseditform" element={<AssociatesEditFrom />} />

        {/* Staff Route */}
        <Route path="/staff" element={<StaffCard />} />
        <Route path="/staffform" element={<StaffForm />} />
        {/* <Route path="/staff/staffdetail" element={<StaffFormDetail />} /> */}
      </Routes>
    </DashboardLayout>
  ) : (
    <Navigate to="/login" />
  );
};

export default MainRoute;

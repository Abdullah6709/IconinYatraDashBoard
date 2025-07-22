import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../Pages/Admin/Dashboard';

import DashboardLayout from '../Layout/DashboardLayout';
import LeadCard from '../Pages/Admin/Lead/LeadCard';
import LeadForm from '../Pages/Admin/Lead/Form/LeadForm';
import LeadEditForm from '../Pages/Admin/Lead/Form/LeadEditForm'
import HotelCard from '../Pages/Admin/Hotel/HotelCard'
import HotelForm from '../Pages/Admin/Hotel/Form/HotelForm';
import HotelEditForm from '../Pages/Admin/Hotel/Form/HotelEditForm';

const MainRoute = () => {
    const isAuthenticated = true; 

    return isAuthenticated ? (
        <DashboardLayout>
            <Routes>
                <Route path="/" element={<Dashboard />} />

               {/* Lead Routing */}
               <Route path="/lead" element={<LeadCard/>} />
               <Route path="/leadform" element={<LeadForm/>} />
               <Route path="/lead/leadeditform" element={<LeadEditForm/>} />

               {/*Hotel Routing */}

               <Route path='/hotel' element={<HotelCard />} />
               <Route path='/hotelform' element={<HotelForm />} />
               <Route path='/hotel/hoteleditform' element={<HotelEditForm />} />



            </Routes>
        </DashboardLayout>
    ) : (
        <Navigate to="/login" />
    );
};

export default MainRoute;

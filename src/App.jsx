import { useState } from 'react'
import { Route, Routes } from "react-router-dom"

import './App.css'





import Topbar from "./screens/global/Topbar";
import Sidebar from "./screens/global/Sidebar";


import Dashboard from './screens/Admin/dashboard';
import Doctors from "./screens/Admin/Doctors";
import Invoices from "./screens/Admin/Invoices";
import Patients from "./screens/Admin/Patients";
import Bar from "./screens/Admin/BarChart";
import AddDoctor from "./screens/Admin/AddDoctor";
import Pie from "./screens/Admin/PieChart";
import FAQ from "./screens/Admin/Faq";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Login from './components/Login/Login';

import { SignedInProtectedRoute, ProtectedRoute } from './shared/utils/auth-routes'






function App() {

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />

              {/* ROUTES */}
              <Routes>

                <Route path="/login" element={
                  <SignedInProtectedRoute>
                    <Login />
                  </SignedInProtectedRoute>
                } />


                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />



                <Route path="/doctors" element={
                  <ProtectedRoute>
                    <Doctors />
                  </ProtectedRoute>
                } />


                <Route path="/patients" element={
                  <ProtectedRoute>
                    <Patients />
                  </ProtectedRoute>
                } />
                {/* <Route path="/invoices" element={<Invoices />} /> */}



                <Route path="/add-doctor" element={
                  <ProtectedRoute>
                    <AddDoctor />
                  </ProtectedRoute>
                } />



                <Route path="/bar" element={
                  <ProtectedRoute>
                    <Bar />
                  </ProtectedRoute>
                } />


                <Route path="/pie" element={
                  <ProtectedRoute>
                    <Pie />
                  </ProtectedRoute>
                } />

                <Route path="/faq" element={
                  <ProtectedRoute>
                    <FAQ />
                  </ProtectedRoute>
                } />
              </Routes>
              {/* ROUTES */}
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>

  )
}

export default App

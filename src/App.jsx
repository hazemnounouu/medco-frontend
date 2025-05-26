import { useState } from 'react'

import './App.css'
import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom"
// import Login from './Components/Login/Login'
// import Register from './Components/Resgister/Register'
// import Layout from './Components/Layout/Layout'
// import Notfound from './Components/Notfound/Notfound'
// import Home from './Components/Home/Home'
// import Viewdoctor from './Components/Viewdoctor/Viewdoctor'
// import Viewpatient from './Components/ViewPatient/Viewpatient'
// import Adddoctor from './Components/AddDoctor/Adddoctor'






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

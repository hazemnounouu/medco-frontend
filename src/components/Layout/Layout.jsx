import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="flex">
        {/* Sidebar, hidden on small screens */}
        <div className="md:block hidden">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-0 md:ml-35 mt-15 p-6">
          <Outlet />
        </div>
      </div>
    </>
  )
}

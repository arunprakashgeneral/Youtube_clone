import React from 'react'
import Categories from "./Categories"
import Header from "./Header"
import Sidebar from "./Sidebar"
import { Outlet } from 'react-router-dom'
import { useState } from "react"

const Layout = () => {
  const[sidebar,toggleSidebar]= useState(false)

const handleToggleSidebar = ()=>{
  toggleSidebar(value=>!value)
}
  
  return (
    <div>
        <Header handleToggleSidebar={handleToggleSidebar}/>
     <div className="flex">
      <Sidebar sidebar={sidebar}/>
      <div className="w-5/6 ">
        <Categories />
        <div className="flex flex-wrap ">
            <Outlet />
        </div>
      </div>
     </div>
    </div>
  )
}

export default Layout

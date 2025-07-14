// src/layouts/AdminLayout.jsx

import React, { useState, useEffect, useRef, useCallback } from "react"
import { Outlet } from "react-router-dom"
import AdminNav from "../components/admin/AdminNav"
import AdminHeader from "../components/admin/AdminHeader"

const AdminLayout = () => {
  // State for sidebar visibility on small screens (< 768px)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  // State for sidebar collapse/expand on medium/large screens (>= 768px)
  // Set default to true (collapsed)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true) // <-- Changed this to true

  // Ref for the sidebar to detect clicks outside
  const sidebarRef = useRef(null)

  // Function to toggle sidebar open/close (for small screens)
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev)
  }, [])

  // Function to toggle sidebar collapse/expand (for medium/large screens)
  const toggleSidebarCollapse = useCallback(() => {
    setIsSidebarCollapsed((prev) => !prev)
  }, [])

  // Effect to handle initial state based on screen width
  useEffect(() => {
    const handleResize = () => {
      // For large screens (>= 1200px): collapsed by default
      // For medium screens (768px - 1199px): collapsed by default
      // For small screens (< 768px): hidden by default
      if (window.innerWidth >= 768) {
        // For medium and large screens
        setIsSidebarCollapsed(true) // <-- Set to collapsed for these sizes
        setIsSidebarOpen(false) // Ensure small screen state is off
      } else {
        // For small screens
        setIsSidebarOpen(false) // Hidden
        setIsSidebarCollapsed(false) // Not applicable, but reset
      }
    }

    // Set initial state
    handleResize()

    // Add event listener for window resize
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Effect for click outside to close sidebar on small screens
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        window.innerWidth < 768 &&
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        const headerToggler = document.querySelector(
          ".admin-header .navbar-toggler"
        )
        if (!headerToggler || !headerToggler.contains(event.target)) {
          setIsSidebarOpen(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isSidebarOpen])

  // Determine main content margin based on screen size and sidebar state
  const getMainContentClass = () => {
    let classes = "main-content-wrapper flex-grow-1"
    // The margin adjustment is primarily controlled by CSS via the .sidebar-collapsed class.
    // This JS function ensures the correct class is present on the wrapper for CSS targeting.
    if (window.innerWidth >= 768) {
      classes += isSidebarCollapsed ? " ms-80" : " ms-250"
    } else {
      classes += " ms-0"
    }
    return classes
  }

  return (
    <div
      className={`admin-wrapper ${isSidebarOpen ? "sidebar-open-sm" : ""} ${
        isSidebarCollapsed && window.innerWidth >= 768
          ? "sidebar-collapsed-lg-md"
          : ""
      }`}
    >
      <AdminNav
        ref={sidebarRef}
        isSidebarOpen={isSidebarOpen}
        isSidebarCollapsed={isSidebarCollapsed}
        toggleSidebarCollapse={toggleSidebarCollapse}
      />
      <div className={getMainContentClass()}>
        <AdminHeader
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <main className="admin-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout

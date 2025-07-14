// src/components/admin/AdminHeader.jsx

import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom" // Import useLocation
import { logout } from "../../redux/slices/authSlice"
import {
  FaSearch,
  FaBell,
  FaCog,
  FaAngleDown,
  FaBars,
  FaChevronUp,
} from "react-icons/fa"

const AdminHeader = ({ isSidebarOpen, toggleSidebar }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const location = useLocation() // Initialize useLocation hook

  const handleLogout = () => {
    dispatch(logout())
    navigate("/admin/login")
  }

  // Function to determine if we are on a small screen
  const isSmallScreen = () => window.innerWidth < 768

  // Define a mapping of paths to titles
  const pageTitles = {
    "/admin/dashboard": "Dashboard",
    "/admin/products": "Product Manager", // Corrected title for products page
    "/admin/orders": "Orders",
    "/admin/customers": "Customers",
    "/admin/finance": "Finance",
    "/admin/messages": "Messages",
    "/admin/calendar": "Calendar",
    "/admin/report": "Report",
    "/admin/history": "History",
    "/admin/help-support": "Help & Support",
    // Add other admin paths and their corresponding titles here
  }

  // Determine the current page title based on the URL pathname
  const getCurrentPageTitle = () => {
    // Get the base path (e.g., '/admin/products' from '/admin/products/123')
    const basePath = location.pathname.split("/").slice(0, 3).join("/")
    return pageTitles[basePath] || "Admin Panel" // Default title if path not found
  }

  const pageTitle = getCurrentPageTitle()

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom fixed-top admin-header">
      <div className="container-fluid">
        {/* Sidebar Toggle for Small Screens */}
        {isSmallScreen() && (
          <button
            className="btn btn-outline-secondary me-3 d-lg-none"
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            aria-expanded={isSidebarOpen}
          >
            {isSidebarOpen ? <FaChevronUp /> : <FaBars />}
          </button>
        )}
        {/* Dynamic Title */}
        <h3 className="navbar-brand mb-0 h1 ms-3">{pageTitle}</h3>{" "}
        {/* Use the dynamic title here */}
        {/* Hamburger Toggler for Header Content on small/medium screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminHeaderCollapse"
          aria-controls="adminHeaderCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Collapsible content: search, icons, user dropdown */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="adminHeaderCollapse"
        >
          {/* Search bar */}
          <div
            className="input-group my-3 my-lg-0 mx-auto mx-lg-0"
            style={{ maxWidth: "400px" }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Search for something..."
              aria-label="Search"
            />
            <span className="input-group-text bg-transparent border-start-0">
              <FaSearch className="text-muted" />
            </span>
          </div>

          <ul className="navbar-nav align-items-center">
            <li className="nav-item me-3 d-none d-lg-block">
              <FaCog size={20} className="text-muted" />
            </li>
            <li className="nav-item me-3 position-relative d-none d-lg-block">
              <FaBell size={20} className="text-muted" />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger border border-light p-1">
                <span className="visually-hidden">New alerts</span>
              </span>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://via.placeholder.com/30"
                  alt="User Avatar"
                  className="rounded-circle me-2"
                  style={{ width: "30px", height: "30px", objectFit: "cover" }}
                />
                <span className="d-none d-lg-inline me-1">
                  {user?.name || "Admin"}
                </span>
                <FaAngleDown size={12} />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default AdminHeader

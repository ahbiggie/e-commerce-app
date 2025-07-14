// src/components/admin/AdminNav.jsx

import React, { forwardRef, useState } from "react"
import { NavLink } from "react-router-dom"
import {
  FaTachometerAlt,
  FaBox,
  FaClipboardList,
  FaUsers,
  FaDollarSign,
  FaCommentDots,
  FaCalendarAlt,
  FaChartLine,
  FaHistory,
  FaQuestionCircle,
  FaBolt,
  FaAngleLeft, // Icon for collapse/expand toggle
  FaAngleRight, // Icon for collapse/expand toggle
} from "react-icons/fa"

// Forward ref to allow parent (AdminLayout) to attach a ref
const AdminNav = forwardRef(
  ({ isSidebarOpen, isSidebarCollapsed, toggleSidebarCollapse }, ref) => {
    const [showTooltip, setShowTooltip] = useState(false)
    const [tooltipText, setTooltipText] = useState("")

    // Function to determine if we are on a small screen
    const isSmallScreen = () => window.innerWidth < 768

    // Helper function to render NavLink with conditional content/tooltip
    const renderNavLink = (to, icon, label) => (
      <li
        className="nav-item"
        onMouseEnter={() => {
          if (isSidebarCollapsed && !isSmallScreen()) {
            setTooltipText(label)
            setShowTooltip(true)
          }
        }}
        onMouseLeave={() => setShowTooltip(false)}
        style={{ position: "relative" }} // For tooltip positioning
      >
        <NavLink to={to} className="nav-link text-white">
          {icon}
          {!isSidebarCollapsed && <span className="ms-3">{label}</span>}
        </NavLink>
        {showTooltip &&
          tooltipText === label &&
          isSidebarCollapsed &&
          !isSmallScreen() && <div className="sidebar-tooltip">{label}</div>}
      </li>
    )

    return (
      <nav
        ref={ref} // Attach the ref passed from AdminLayout
        className={`bg-dark text-white p-3 sidebar
        ${
          isSmallScreen()
            ? isSidebarOpen
              ? "sidebar-open-sm"
              : "sidebar-closed-sm"
            : ""
        }
        ${!isSmallScreen() && isSidebarCollapsed ? "sidebar-collapsed" : ""}
      `}
      >
        <div className="d-flex flex-column h-100">
          {/* Dodolan E-Commerce Logo Section */}
          <div className="d-flex align-items-center mb-4 ps-3 sidebar-header-logo">
            <img
              src="https://via.placeholder.com/40"
              alt="Dodolan Logo"
              className={`me-2 rounded ${
                isSidebarCollapsed && !isSmallScreen() ? "mx-auto" : ""
              }`}
            />
            {!isSidebarCollapsed && !isSmallScreen() && (
              <div>
                <h5 className="mb-0 text-white">DODOLAN</h5>
                <small className="text-secondary">E-Commerce</small>
              </div>
            )}
          </div>

          {/* Sidebar Toggle for Medium/Large Screens */}
          {!isSmallScreen() && (
            <div className="sidebar-toggle-button">
              <button
                className="btn btn-dark sidebar-toggler-btn"
                onClick={toggleSidebarCollapse}
                aria-label={
                  isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
                }
                aria-expanded={!isSidebarCollapsed}
              >
                {isSidebarCollapsed ? (
                  <FaAngleRight size={20} />
                ) : (
                  <FaAngleLeft size={20} />
                )}
              </button>
            </div>
          )}

          <ul className="nav nav-pills flex-column mb-auto">
            {!isSidebarCollapsed && !isSmallScreen() && (
              <li className="nav-item nav-section-title">Overview</li>
            )}
            {renderNavLink(
              "/admin/dashboard",
              <FaTachometerAlt size={20} />,
              "Dashboard"
            )}
            {renderNavLink(
              "/admin/orders",
              <FaClipboardList size={20} />,
              "Orders"
            )}
            {/* Note: Added active-link class directly here for "Product" as per mockup, needs a custom check for active path */}
            <li
              className={`nav-item ${
                !isSmallScreen() && !isSidebarCollapsed && "nav-item-active"
              }`}
              onMouseEnter={() => {
                if (isSidebarCollapsed && !isSmallScreen()) {
                  setTooltipText("Product")
                  setShowTooltip(true)
                }
              }}
              onMouseLeave={() => setShowTooltip(false)}
              style={{ position: "relative" }}
            >
              <NavLink
                to="/admin/products"
                className={`nav-link text-white ${
                  !isSmallScreen() && !isSidebarCollapsed && "active-link"
                }`}
              >
                <FaBox size={20} />
                {!isSidebarCollapsed && <span className="ms-3">Product</span>}
              </NavLink>
              {showTooltip &&
                tooltipText === "Product" &&
                isSidebarCollapsed &&
                !isSmallScreen() && (
                  <div className="sidebar-tooltip">Product</div>
                )}
            </li>
            {renderNavLink(
              "/admin/customers",
              <FaUsers size={20} />,
              "Customers"
            )}
            {renderNavLink(
              "/admin/finance",
              <FaDollarSign size={20} />,
              "Finance"
            )}

            {!isSidebarCollapsed && !isSmallScreen() && (
              <li className="nav-item nav-section-title mt-3">Management</li>
            )}
            {renderNavLink(
              "/admin/messages",
              <FaCommentDots size={20} />,
              "Messages"
            )}
            {!isSidebarCollapsed && !isSmallScreen() && (
              <span className="badge bg-danger rounded-pill ms-2">10</span>
            )}
            {renderNavLink(
              "/admin/calendar",
              <FaCalendarAlt size={20} />,
              "Calendar"
            )}
            {renderNavLink(
              "/admin/report",
              <FaChartLine size={20} />,
              "Report"
            )}

            {!isSidebarCollapsed && !isSmallScreen() && (
              <li className="nav-item nav-section-title mt-3">Support</li>
            )}
            {renderNavLink(
              "/admin/history",
              <FaHistory size={20} />,
              "History"
            )}
            {renderNavLink(
              "/admin/help-support",
              <FaQuestionCircle size={20} />,
              "Help & Support"
            )}
          </ul>

          {/* New Features Card - only visible when expanded on large/medium screens */}
          {!isSidebarCollapsed && !isSmallScreen() && (
            <div
              className="mt-auto p-3 mx-2 rounded"
              style={{ backgroundColor: "#2d3d3a" }}
            >
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h6 className="text-warning mb-0">New Features</h6>
                <FaBolt className="text-warning" size={20} />
              </div>
              <p className="text-white-50 small mb-3">
                Now you can interact with your mail at anytime.
              </p>
              <button className="btn btn-sm btn-success w-100">
                Check Now
              </button>
            </div>
          )}

          {/* Footer Text - only visible when expanded on large/medium screens */}
          {!isSidebarCollapsed && !isSmallScreen() && (
            <div className="text-center mt-3 mb-2 small text-secondary">
              <p className="mb-0">Dodolan Admin System</p>
              <p>&copy; 2024 All Right Reserved</p>
            </div>
          )}
        </div>
      </nav>
    )
  }
)

export default AdminNav

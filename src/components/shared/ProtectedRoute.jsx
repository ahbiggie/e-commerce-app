// src/components/shared/ProtectedRoute.jsx
/*import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
  const { token } = useSelector((state) => state.auth)
  return token ? <Outlet /> : <Navigate to="/admin/login" replace />
}
*/

import { Outlet } from "react-router-dom"
import React from "react" // Added React import

const ProtectedRoute = () => {
  return <Outlet />
}

export default ProtectedRoute

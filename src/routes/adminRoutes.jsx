// src/routes/adminRoutes.jsx

import { lazy } from "react"
import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "../components/shared/ProtectedRoute"
import AdminLayout from "../layouts/AdminLayout"

const Dashboard = lazy(() => import("../pages/admin/Dashboard"))
const ProductManager = lazy(() => import("../pages/admin/ProductManager"))
const Login = lazy(() => import("../pages/admin/Login"))

const AdminRoutes = () => (
  <Routes>
    <Route path="/admin/login" element={<Login />} />
    <Route element={<ProtectedRoute />}>
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<ProductManager />} />
      </Route>
    </Route>
  </Routes>
)

export default AdminRoutes

// src/App.jsx

import { Suspense, lazy } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ClientLayout from "./layouts/ClientLayout"
import AdminLayout from "./layouts/AdminLayout"
import LoadingSpinner from "./components/shared/LoadingSpinner"
import ProtectedRoute from "./components/shared/ProtectedRoute"
import Header from "./components/shared/Header"
import Footer from "./components/shared/Footer"

// Lazy load pages
const Home = lazy(() => import("./pages/client/Home"))
const ProductList = lazy(() => import("./pages/client/ProductList"))
const ProductDetail = lazy(() => import("./pages/client/ProductDetail"))
const Cart = lazy(() => import("./pages/client/Cart"))
const Dashboard = lazy(() => import("./pages/admin/Dashboard"))
const ProductManager = lazy(() => import("./pages/admin/ProductManager"))
const AddProduct = lazy(() => import("./pages/admin/AddProduct"))
const ProductOverview = lazy(() => import("./pages/admin/ProductOverview"))
const Login = lazy(() => import("./pages/admin/Login"))

function App() {
  return (
    <BrowserRouter basename="/e-commerce-app">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Client Routes */}
          <Route element={<ClientLayout />}>
            <Route index element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          {/* Admin Login Route (not protected by ProtectedRoute or AdminLayout) */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Admin Routes with AdminLayout */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<ProductManager />} />
              <Route path="products/add" element={<AddProduct />} />
              <Route path="products/overview" element={<ProductOverview />} />
              {/* <--- Add this route */}
              {/* Add other admin sub-routes here */}
              {/* Optional: Admin-specific 404 if a path under /admin doesn't match */}
              <Route
                path="*"
                element={
                  <div className="container py-5 text-center">
                    <h1>Admin 404 - Page Not Found</h1>
                    <p>The requested admin page was not found.</p>
                  </div>
                }
              />
            </Route>
          </Route>

          {/* Global 404 for any other unmatched routes outside /admin */}
          <Route
            path="*"
            element={
              <div className="d-flex flex-column min-vh-100">
                <Header />
                <main className="flex-grow-1 container py-5 text-center">
                  <h1>404 - Page Not Found</h1>
                  <p>The requested URL was not found on this server.</p>
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App

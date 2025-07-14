// src/routes/clientRoutes.jsx

import { lazy } from "react"
import { Routes, Route } from "react-router-dom"
import ClientLayout from "../layouts/ClientLayout"

const Home = lazy(() => import("../pages/client/Home"))
const ProductList = lazy(() => import("../pages/client/ProductList"))
const ProductDetail = lazy(() => import("../pages/client/ProductDetail"))
const Cart = lazy(() => import("../pages/client/Cart"))

const ClientRoutes = () => (
  <ClientLayout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  </ClientLayout>
)

export default ClientRoutes

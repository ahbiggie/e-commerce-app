// src/layouts/ClientLayout.jsx

import Header from "../components/shared/Header"
import Footer from "../components/shared/Footer"
import { useLocation } from "react-router-dom"

const ClientLayout = ({ children }) => {
  const location = useLocation()

  // Show 404 page if no routes match
  if (location.pathname === "/e-commerce-app") {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1 container py-5 text-center">
          <h1>Page Not Found</h1>
          <p>The requested URL was not found on this server.</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">{children}</main>
      <Footer />
    </div>
  )
}

export default ClientLayout

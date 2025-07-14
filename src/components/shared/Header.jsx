// src/components/shared/Header.jsx
import { Link, NavLink } from "react-router-dom"
import { FaShoppingCart, FaUser } from "react-icons/fa"

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          ShopEase
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/products" className="nav-link">
                Products
              </NavLink>
            </li>
          </ul>

          <div className="d-flex">
            <Link
              to="/cart"
              className="btn btn-outline-light me-2 position-relative"
            >
              <FaShoppingCart />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                0
              </span>
            </Link>
            <Link to="/admin/login" className="btn btn-outline-light">
              <FaUser /> Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header

// src/pages/admin/ProductManager.jsx

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadProducts } from "../../redux/slices/productSlice"
import LoadingSpinner from "../../components/shared/LoadingSpinner"
import { FaRegTrashAlt, FaEdit, FaEllipsisV } from "react-icons/fa"
import { getCurrentDate } from "../../utils/dateUtils"
import Pagination from "../../components/shared/Pagination"
import FilterBar from "../../components/shared/FilterBar"
import { useNavigate } from "react-router-dom"

const ProductManager = () => {
  const dispatch = useDispatch()
  const { products, status, error } = useSelector((state) => state.products)
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedVisibility, setSelectedVisibility] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [viewMode, setViewMode] = useState("list") // Changed default to 'list' as per mockup for table
  const productsPerPage = 5

  useEffect(() => {
    dispatch(loadProducts())
  }, [dispatch])

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.brand &&
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory =
      selectedCategory === "" || product.category === selectedCategory
    const matchesVisibility =
      selectedVisibility === "" ||
      (selectedVisibility === "Visible" && product.visible) ||
      (selectedVisibility === "Hidden" && !product.visible)
    const matchesStatus =
      selectedStatus === "" ||
      (selectedStatus === "In Stock" && product.stock > 0) ||
      (selectedStatus === "Empty" && product.stock === 0) ||
      (selectedStatus === "Inactive" && product.status === "Inactive")

    return (
      matchesSearch && matchesCategory && matchesVisibility && matchesStatus
    )
  })

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const handleSearchChange = (value) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleCategoryChange = (value) => {
    setSelectedCategory(value)
    setCurrentPage(1)
  }

  const handleVisibilityChange = (value) => {
    setSelectedVisibility(value)
    setCurrentPage(1)
  }

  const handleStatusChange = (value) => {
    setSelectedStatus(value)
    setCurrentPage(1)
  }

  const handleViewModeToggle = (mode) => {
    setViewMode(mode)
  }
  const handleAddNewClick = () => {
    // Navigate to the Add Product page
    navigate("/admin/products/add")
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const todayDate = getCurrentDate()

  if (status === "loading") {
    return <LoadingSpinner />
  }

  if (status === "failed") {
    return <div className="alert alert-danger">Error: {error}</div>
  }

  return (
    <div className="product-manager-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-gray-800">Product</h1>
        <small className="text-muted">Today, {todayDate}</small>
      </div>

      <p className="text-success mb-4">
        <span className="me-2">&bull;</span>Product Overview
      </p>

      {/* FilterBar Component */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        selectedVisibility={selectedVisibility}
        onVisibilityChange={handleVisibilityChange}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        viewMode={viewMode}
        onViewModeToggle={handleViewModeToggle}
        onAddNewClick={handleAddNewClick}
      />

      {/* Conditional Rendering of Product List/Grid */}
      <div className="card shadow mb-4">
        <div className="card-body">
          {currentProducts.length === 0 ? (
            <div className="text-center py-4">
              No products found matching your criteria.
            </div>
          ) : viewMode === "list" ? (
            // List View (Table)
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" className="form-check-input" />
                    </th>
                    <th>Product</th>
                    <th>Photo</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Size</th>
                    <th>Inventory</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <input type="checkbox" className="form-check-input" />
                      </td>
                      <td>{product.name}</td>
                      <td>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                            borderRadius: "5px",
                          }}
                        />
                      </td>
                      <td>
                        <span className="badge bg-secondary">
                          {product.category}
                        </span>
                      </td>
                      <td>{product.brand || "N/A"}</td>
                      <td>{product.model || "N/A"}</td>
                      <td>{product.size || "N/A"}</td>
                      <td>{product.stock}</td>
                      <td>
                        {product.stock > 0 ? (
                          <span className="badge bg-success">In Stock</span>
                        ) : (
                          <span className="badge bg-danger">Empty</span>
                        )}
                      </td>
                      <td>
                        <div className="d-flex">
                          <button className="btn btn-sm btn-outline-primary me-2">
                            <FaEdit />
                          </button>
                          <button className="btn btn-sm btn-outline-danger me-2">
                            <FaRegTrashAlt />
                          </button>
                          <button className="btn btn-sm btn-outline-secondary">
                            <FaEllipsisV />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // Grid View (Cards)
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 product-grid">
              {currentProducts.map((product) => (
                <div className="col" key={product.id}>
                  <div className="card h-100 shadow-sm product-card">
                    <div className="card-header d-flex justify-content-end bg-transparent border-bottom-0 pt-3 pe-3">
                      <div className="dropdown">
                        <button
                          className="btn btn-sm btn-link text-muted"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <FaEllipsisV />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <a className="dropdown-item" href="#">
                              <FaEdit className="me-2" /> Edit
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item text-danger" href="#">
                              <FaRegTrashAlt className="me-2" /> Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <img
                      src={product.image}
                      className="card-img-top mx-auto"
                      alt={product.name}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                        marginTop: "-20px",
                      }}
                    />
                    <div className="card-body text-center pt-0">
                      <h5 className="card-title mb-1">{product.name}</h5>
                      <p className="card-text text-muted small mb-2">
                        {product.category}
                      </p>
                      <span
                        className={`badge ${
                          product.stock > 0 ? "bg-success" : "bg-danger"
                        } mb-3`}
                      >
                        {product.stock > 0 ? "In Stock" : "Empty"}
                      </span>
                      <ul className="list-group list-group-flush text-start small">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Brand: <span>{product.brand || "N/A"}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Model: <span>{product.model || "N/A"}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Size: <span>{product.size || "N/A"}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Inventory: <span>{product.stock}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="card-footer bg-transparent border-top-0 pt-0 pb-3 text-center">
                      <button className="btn btn-sm btn-primary w-75">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Component */}
          {filteredProducts.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductManager

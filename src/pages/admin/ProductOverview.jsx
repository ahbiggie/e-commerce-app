// src/pages/admin/ProductOverview.jsx

import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getCurrentDate } from "../../utils/dateUtils"
import { FaCheckCircle, FaTimes } from "react-icons/fa" // Import icons for notification

const ProductOverview = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const todayDate = getCurrentDate()

  const [productData, setProductData] = useState(null)
  const [showNotification, setShowNotification] = useState(false) // State for notification visibility

  useEffect(() => {
    if (location.state && location.state.product) {
      setProductData(location.state.product)
    } else {
      console.warn(
        "No product data found. Redirecting to Add New Product page."
      )
      navigate("/admin/products/add", { replace: true })
    }
  }, [location.state, navigate])

  // Handle the "Publish" action from Product Overview
  const handlePublishFromOverview = () => {
    // In a real application, you would send this productData to your backend
    // For now, we'll just simulate success and show the notification.
    console.log("Publishing product from overview:", productData)

    setShowNotification(true) // Show notification

    // Hide notification and redirect after a delay
    setTimeout(() => {
      setShowNotification(false)
      navigate("/admin/products") // Redirect to Product Manager page
    }, 3000) // Show notification for 3 seconds
  }

  if (!productData) {
    return (
      <div className="text-center py-5">
        <h4>Loading Product Details...</h4>
        <p>If this takes too long, you might be redirected.</p>
      </div>
    )
  }

  const {
    productName,
    category,
    gender,
    brand,
    model,
    stock,
    price,
    discount,
    selectedDate,
    size,
    visibility,
    description,
    images,
  } = productData

  const validImages = images
    ? images.filter((img) => img && img.previewUrl)
    : []
  //   const mainImage = validImages[productData.mainImageIndex || 0];

  return (
    <div className="product-overview-page">
      {/* Notification Component */}
      {showNotification && (
        <div className="notification success-notification">
          {" "}
          {/* */}
          <div className="notification-icon">
            <FaCheckCircle size={24} />
          </div>
          <div className="notification-content">
            <h5 className="notification-title">Success</h5>
            <p className="notification-message">
              Product data has been successfully saved. Look at the product at
              the top of table
            </p>
          </div>
          <button
            className="notification-close-btn"
            onClick={() => setShowNotification(false)}
          >
            <FaTimes size={16} />
          </button>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item text-success">
              <small>Today, {todayDate}</small>
            </li>
            <li className="breadcrumb-item text-success">
              <small>Product Overview</small>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <small>Product Details</small>
            </li>
          </ol>
        </nav>
      </div>

      <h1 className="h3 mb-0 text-gray-800 mb-2">Product Details</h1>
      <p className="mb-4 text-muted small">
        Review the details of your newly added product below.
      </p>

      <ul className="nav nav-tabs mb-4 border-0">
        <li className="nav-item">
          <a className="nav-link text-muted py-2 px-4" href="#">
            Add Product
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link active text-success border-bottom-success py-2 px-4"
            href="#"
          >
            Overview
          </a>
        </li>
      </ul>

      <div className="card shadow mb-4">
        <div className="card-body">
          <h4 className="mb-3 text-gray-800">Product Information</h4>
          <table className="table table-striped table-borderless product-detail-table">
            <tbody>
              <tr>
                <td className="fw-bold text-muted">Product Name</td>
                <td>{productName}</td>
              </tr>
              <tr>
                <td className="fw-bold text-muted">Category</td>
                <td>{category}</td>
              </tr>
              <tr>
                <td className="fw-bold text-muted">Gender</td>
                <td>{gender}</td>
              </tr>
              <tr>
                <td className="fw-bold text-muted">Brand</td>
                <td>{brand}</td>
              </tr>
              <tr>
                <td className="fw-bold text-muted">Model</td>
                <td>{model}</td>
              </tr>
              <tr>
                <td className="fw-bold text-muted">Stock</td>
                <td>{stock}</td>
              </tr>
              <tr>
                <td className="fw-bold text-muted">Price</td>
                <td>${parseFloat(price).toFixed(2)}</td>
              </tr>
              <tr>
                <td className="fw-bold text-muted">Discount</td>
                <td>{discount}%</td>
              </tr>
              <tr>
                <td className="fw-bold text-muted">Date</td>
                <td>{selectedDate}</td>
              </tr>
              <tr>
                <td className="fw-bold text-muted">Size</td>
                <td>{size}</td>
              </tr>
              <tr>
                <td className="fw-bold text-muted">Visibility</td>
                <td>{visibility}</td>
              </tr>
              <tr>
                <td className="fw-bold text-muted">Description</td>
                <td>{description}</td>
              </tr>
            </tbody>
          </table>

          <h4 className="mt-5 mb-3 text-gray-800">Product Images</h4>
          {validImages.length > 0 ? (
            <div className="row g-3">
              {validImages.map((img, index) => (
                <div key={index} className="col-6 col-md-4 col-lg-3">
                  <div
                    className="card h-100 shadow-sm border"
                    style={{
                      borderColor:
                        index === productData.mainImageIndex
                          ? "#20c997"
                          : "#e0e0e0",
                    }}
                  >
                    <img
                      src={img.previewUrl}
                      alt={`Product Image ${index + 1}`}
                      className="card-img-top p-2"
                      style={{ height: "150px", objectFit: "contain" }}
                    />
                    <div className="card-footer text-center bg-transparent border-top-0">
                      {index === productData.mainImageIndex ? (
                        <span className="badge bg-success">Main Image</span>
                      ) : (
                        <span className="badge bg-secondary">
                          Additional Image
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No images uploaded for this product.</p>
          )}

          <div className="d-flex justify-content-end gap-3 mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary px-4 py-2"
              onClick={() =>
                navigate("/admin/products/add", {
                  state: { product: productData },
                })
              }
            >
              Edit Product
            </button>
            {/* Changed handler */}
            <button
              type="button"
              className="btn btn-success px-4 py-2"
              onClick={handlePublishFromOverview}
            >
              Publish {/* Changed text */}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductOverview

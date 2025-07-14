// src/pages/admin/AddProduct.jsx

import React, { useState, useRef } from "react" // Added useRef
import { useNavigate } from "react-router-dom"
import { getCurrentDate } from "../../utils/dateUtils"
import {
  FaQuestionCircle,
  FaImage,
  FaTrashAlt,
  FaEdit,
  FaCalendarAlt,
  FaTimes,
} from "react-icons/fa" // Added FaTimes for close button

const AddProduct = () => {
  const navigate = useNavigate()
  const todayDate = getCurrentDate()

  // Dummy state for form fields (functionality not implemented yet)
  const [productName, setProductName] = useState("")
  const [category, setCategory] = useState("")
  const [gender, setGender] = useState("")
  const [brand, setBrand] = useState("")
  const [model, setModel] = useState("")
  const [stock, setStock] = useState("")
  const [price, setPrice] = useState("")
  const [discount, setDiscount] = useState("")
  const [selectedDate, setSelectedDate] = useState(todayDate)
  const [size, setSize] = useState("") // Now for a text input
  const [visibility, setVisibility] = useState("Published")
  const [description, setDescription] = useState("")

  // State for image previews. Max 5 images (1 main + 4 additional)
  // Each item will be an object { file: File, previewUrl: string }
  const [images, setImages] = useState([]) // Array to store actual File objects
  const [mainImageIndex, setMainImageIndex] = useState(null) // Index of the main image in the 'images' array

  const fileInputRef = useRef(null) // Ref for the hidden file input

  // --- Image Handling Functions ---

  const handleFileChange = (e, targetIndex = -1) => {
    const files = e.target.files
    if (files.length === 0) return

    processFiles(Array.from(files), targetIndex)
  }

  const handleDrop = (e, targetIndex = -1) => {
    e.preventDefault()
    e.stopPropagation() // Stop propagation to prevent browser default drag behavior
    const files = e.dataTransfer.files
    if (files.length === 0) return

    processFiles(Array.from(files), targetIndex)
  }

  const processFiles = (newFiles, targetIndex) => {
    const validImageFiles = newFiles.filter((file) =>
      file.type.startsWith("image/")
    )
    if (validImageFiles.length === 0) {
      alert("Please upload valid image files (e.g., JPG, PNG, GIF).")
      return
    }

    const updatedImages = [...images]
    let addedCount = 0

    validImageFiles.forEach((file) => {
      // Find the next available slot or replace at targetIndex
      let slotIndex =
        targetIndex !== -1 && !updatedImages[targetIndex]
          ? targetIndex
          : updatedImages.findIndex((img) => !img)
      if (slotIndex === -1) {
        // No empty slot, try to append if less than 5
        if (updatedImages.length < 5) {
          slotIndex = updatedImages.length
        } else {
          // If we have 5 images and no targetIndex, we can't add more.
          // This alert will only trigger if we try to add beyond capacity from drag/drop or multi-select.
          if (targetIndex === -1) {
            console.warn("Maximum 5 images allowed.")
            return // Skip this file if max reached
          }
        }
      }

      if (slotIndex !== -1 && slotIndex < 5) {
        const reader = new FileReader()
        reader.onloadend = () => {
          updatedImages[slotIndex] = { file: file, previewUrl: reader.result }
          setImages([...updatedImages]) // Update state with new image
          if (mainImageIndex === null && slotIndex === 0) {
            // Set the first uploaded image as main if no main is set
            setMainImageIndex(0)
          } else if (mainImageIndex === null && slotIndex !== 0) {
            // If first uploaded is not index 0, set that as main.
            setMainImageIndex(slotIndex)
          }
        }
        reader.readAsDataURL(file)
        addedCount++
      }
    })

    if (addedCount > 0 && mainImageIndex === null && updatedImages.length > 0) {
      // Fallback: If no main image is set yet, and we added images, set the first one as main
      const firstActualImageIndex = updatedImages.findIndex(
        (img) => img !== null
      )
      if (firstActualImageIndex !== -1) {
        setMainImageIndex(firstActualImageIndex)
      }
    }
  }

  const removeImage = (indexToRemove) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove)
    setImages(updatedImages)

    if (mainImageIndex === indexToRemove) {
      // If the main image was removed, try to set a new main image
      if (updatedImages.length > 0) {
        setMainImageIndex(0) // Set the first remaining image as main
      } else {
        setMainImageIndex(null) // No images left
      }
    } else if (mainImageIndex !== null && indexToRemove < mainImageIndex) {
      // If an image before the main image was removed, adjust mainImageIndex
      setMainImageIndex((prevIndex) => prevIndex - 1)
    }
  }

  const setAsMainImage = (index) => {
    setMainImageIndex(index)
  }

  const openFileInput = (targetIndex) => {
    fileInputRef.current.dataset.targetIndex = targetIndex // Store the target index
    fileInputRef.current.click()
  }

  const handleFileInputChange = (e) => {
    const targetIndex = parseInt(fileInputRef.current.dataset.targetIndex)
    handleFileChange(e, targetIndex)
    e.target.value = null // Clear input to allow re-uploading the same file
  }

  // Drag styles
  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.classList.add("drag-over")
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.classList.remove("drag-over")
  }

  // --- Form Submission Logic ---
  const handlePublish = (e) => {
    e.preventDefault() // Prevent default form submission

    // Gather all form data
    const productData = {
      productName,
      category,
      gender,
      brand,
      model,
      stock: parseInt(stock, 10), // Convert to number
      price: parseFloat(price), // Convert to number
      discount: parseInt(discount, 10), // Convert to number
      selectedDate,
      size,
      visibility,
      description,
      images, // Array of { file, previewUrl }
      mainImageIndex, // Index of the main image
    }

    console.log("Publishing Product:", productData)

    // Redirect to Product Overview page, passing data via state
    navigate("/admin/products/overview", { state: { product: productData } })
  }

  const handleSaveDraft = (e) => {
    e.preventDefault()
    alert("Saving as draft! (Functionality not implemented yet)")
    const productData = {
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
      mainImageIndex,
    }
    console.log("Draft Data:", productData)
  }

  const currentMainImage =
    mainImageIndex !== null ? images[mainImageIndex] : null

  return (
    <div className="add-product-page">
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
              <small>Add New Product</small>
            </li>
          </ol>
        </nav>
      </div>

      <h1 className="h3 mb-0 text-gray-800 mb-2">Add New Product</h1>
      <p className="mb-4 text-muted small">
        When adding products here, don't forget to follow the SOP of product
        adding rules to fill in the required field completely.
      </p>

      <ul className="nav nav-tabs mb-4 border-0">
        <li className="nav-item">
          <a
            className="nav-link active text-success border-bottom-success py-2 px-4"
            href="#"
          >
            Add Product
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-muted py-2 px-4" href="#">
            Overview
          </a>
        </li>
      </ul>

      <form onSubmit={handlePublish}>
        {" "}
        {/* Changed form onSubmit to handlePublish directly */}
        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="row">
              {/* Left Column: Product Details */}
              <div className="col-lg-7">
                <div className="mb-4">
                  <label htmlFor="productName" className="form-label">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productName"
                    placeholder="JBL Headphone"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    maxLength="30"
                  />
                  <small className="form-text text-muted">
                    Fill in a maximum of 30 characters when entering the product
                    name
                  </small>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <select
                      className="form-select"
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Electronics</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Home & Kitchen">Home & Kitchen</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="gender" className="form-label">
                      Gender
                    </label>
                    <select
                      className="form-select"
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Unisex</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <label htmlFor="brand" className="form-label">
                      Brand
                    </label>
                    <select
                      className="form-select"
                      id="brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    >
                      <option value="">JBL</option>
                      <option value="Sony">Sony</option>
                      <option value="Bose">Bose</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="model" className="form-label">
                      Model
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="model"
                      placeholder="Input Model"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <label htmlFor="stock" className="form-label">
                      Stock
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="stock"
                      placeholder="Input Stock"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      placeholder="Input Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <label htmlFor="discount" className="form-label">
                      Discount
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="discount"
                      placeholder="Input Discount"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="date" className="form-label">
                      Date
                    </label>
                    <div className="input-group">
                      <input
                        type="date"
                        className="form-control"
                        id="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                      <span className="input-group-text">
                        <FaCalendarAlt />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="addSize" className="form-label">
                    Add Size
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="addSize"
                    placeholder="e.g., 39 x 20 cm, Small, Large"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="4"
                    placeholder="Input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength="100"
                  ></textarea>
                  <small className="form-text text-muted">
                    Fill in a maximum of 100 characters when entering the
                    product name
                  </small>
                </div>
              </div>

              {/* Right Column: Product Images & Visibility */}
              <div className="col-lg-5">
                <div className="mb-4">
                  <label className="form-label">Product Images</label>
                  <div className="border p-3 rounded bg-light mb-3 main-image-container">
                    {/* Main Image Display */}
                    {currentMainImage ? (
                      <div className="position-relative d-inline-block me-3 mb-3 main-image-preview">
                        <img
                          src={currentMainImage.previewUrl}
                          alt="Main Product"
                          className="img-fluid rounded"
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "contain",
                          }}
                        />
                        <div className="image-actions">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger rounded-circle"
                            onClick={() => removeImage(mainImageIndex)}
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="main-image-upload-placeholder d-flex flex-column align-items-center justify-content-center border rounded p-3"
                        onDrop={(e) => handleDrop(e, 0)}
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onClick={() => openFileInput(0)}
                      >
                        <FaImage className="text-muted mb-2" size={50} />
                        <small className="text-muted text-center mb-1">
                          Drag & Drop or
                        </small>
                        <small className="text-primary text-center">
                          Click to Browse
                        </small>
                      </div>
                    )}
                  </div>

                  <div className="d-flex flex-wrap image-upload-grid">
                    {Array.from({ length: 5 }).map((_, index) => {
                      const image = images[index]
                      return (
                        <div
                          key={index}
                          className={`image-upload-box d-flex flex-column align-items-center justify-content-center p-3 m-1 border rounded ${
                            image ? "has-image" : ""
                          }`}
                          onDrop={(e) => handleDrop(e, index)}
                          onDragOver={handleDragOver}
                          onDragEnter={handleDragEnter}
                          onDragLeave={handleDragLeave}
                          onClick={() => openFileInput(index)}
                          style={{
                            cursor: "pointer",
                            borderColor:
                              image && index === mainImageIndex
                                ? "#20c997"
                                : "#ced4da",
                          }}
                        >
                          {image ? (
                            <>
                              <img
                                src={image.previewUrl}
                                alt={`Product ${index + 1}`}
                                className="img-fluid rounded"
                                style={{
                                  maxWidth: "60px",
                                  maxHeight: "60px",
                                  objectFit: "contain",
                                }}
                              />
                              <div className="image-overlay">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-light rounded-circle"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    removeImage(index)
                                  }}
                                >
                                  <FaTimes size={12} />
                                </button>
                                {index !== mainImageIndex && (
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-light rounded-pill ms-1"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setAsMainImage(index)
                                    }}
                                  >
                                    Set Main
                                  </button>
                                )}
                              </div>
                            </>
                          ) : (
                            <>
                              <FaImage className="text-muted mb-2" size={30} />
                              <small className="text-muted text-center mb-1">
                                Drop / Browse
                              </small>
                            </>
                          )}
                        </div>
                      )
                    })}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileInputChange}
                      style={{ display: "none" }}
                      accept="image/*"
                      multiple={false}
                    />
                  </div>

                  <small className="form-text text-muted mt-3 d-block">
                    You need to add at least 4 images with 1 video or none. Pay
                    attention with the quality of your pictures. Make sure your
                    photo have the best quality. Picture must be fit
                  </small>
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="scheduleDiscount"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="scheduleDiscount"
                  >
                    Schedule a discount
                  </label>
                </div>

                <div className="mb-4">
                  <label className="form-label">Visibility</label>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="visibility"
                        id="visibilityPublished"
                        value="Published"
                        checked={visibility === "Published"}
                        onChange={(e) => setVisibility(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="visibilityPublished"
                      >
                        Published
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="visibility"
                        id="visibilityHidden"
                        value="Hidden"
                        checked={visibility === "Hidden"}
                        onChange={(e) => setVisibility(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="visibilityHidden"
                      >
                        Hidden
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="visibility"
                        id="visibilityScheduled"
                        value="Scheduled"
                        checked={visibility === "Scheduled"}
                        onChange={(e) => setVisibility(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="visibilityScheduled"
                      >
                        Scheduled
                      </label>
                    </div>
                  </div>
                </div>

                {visibility === "Scheduled" && (
                  <div className="mb-4">
                    <label htmlFor="scheduleDate" className="form-label">
                      Schedule Date
                    </label>
                    <div className="input-group">
                      <input
                        type="date"
                        className="form-control"
                        id="scheduleDate"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                      <span className="input-group-text">
                        <FaCalendarAlt />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end gap-3 mb-4">
          <button
            type="button"
            className="btn btn-outline-success px-4 py-2"
            onClick={handleSaveDraft}
          >
            Save as draft
          </button>{" "}
          {/* <--- Use type="button" and separate handler */}
          <button type="submit" className="btn btn-success px-4 py-2">
            Preview Product
          </button>{" "}
          {/* <--- This button will now trigger handlePublish via form onSubmit */}
        </div>
      </form>
    </div>
  )
}

export default AddProduct

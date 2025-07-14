// src/components/shared/FilterBar.jsx

import React from "react"
import { FaPlus, FaThLarge, FaList } from "react-icons/fa"
import SearchBar from "./SearchBar" // Reusing the SearchBar component

/**
 * Reusable Filter Bar component for product management or similar lists.
 * @param {object} props - The component props.
 * @param {string} props.searchTerm - The current value of the search input.
 * @param {function} props.onSearchChange - Callback for search input changes.
 * @param {string} props.selectedCategory - The currently selected category.
 * @param {function} props.onCategoryChange - Callback for category dropdown changes.
 * @param {string} props.selectedVisibility - The currently selected visibility.
 * @param {function} props.onVisibilityChange - Callback for visibility dropdown changes.
 * @param {string} props.selectedStatus - The currently selected status.
 * @param {function} props.onStatusChange - Callback for status dropdown changes.
 * @param {string} props.viewMode - 'grid' or 'list' for the toggler.
 * @param {function} props.onViewModeToggle - Callback for grid/list toggle.
 * @param {function} props.onAddNewClick - Callback for "Add New" button click.
 */
const FilterBar = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedVisibility,
  onVisibilityChange,
  selectedStatus,
  onStatusChange,
  viewMode,
  onViewModeToggle,
  onAddNewClick,
}) => {
  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <div className="d-flex flex-wrap align-items-center mb-3">
          {/* SearchBar Component */}
          <SearchBar
            placeholder="Search products..."
            value={searchTerm}
            onSearch={onSearchChange}
            maxWidth="300px"
          />

          {/* All Products Dropdown */}
          <div className="me-3 mb-2 mb-md-0">
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              <option value="">All Products</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Books">Books</option>
            </select>
          </div>

          {/* Visibility Dropdown */}
          <div className="me-3 mb-2 mb-md-0">
            <select
              className="form-select"
              value={selectedVisibility}
              onChange={(e) => onVisibilityChange(e.target.value)}
            >
              <option value="">Visibility</option>
              <option value="Visible">Visible</option>
              <option value="Hidden">Hidden</option>
            </select>
          </div>

          {/* Grid/List View Toggle */}
          <div className="me-3 mb-2 mb-md-0">
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn btn-outline-secondary ${
                  viewMode === "grid" ? "active" : ""
                }`}
                onClick={() => onViewModeToggle("grid")}
              >
                <FaThLarge />
              </button>
              <button
                type="button"
                className={`btn btn-outline-secondary ${
                  viewMode === "list" ? "active" : ""
                }`}
                onClick={() => onViewModeToggle("list")}
              >
                <FaList />
              </button>
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="me-auto me-md-3 mb-2 mb-md-0">
            <select
              className="form-select"
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
            >
              <option value="">Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Empty">Empty</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Add New Button (Dummy Link) */}
          <button
            className="btn btn-success d-flex align-items-center"
            onClick={onAddNewClick}
          >
            <FaPlus className="me-2" /> Add New
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterBar

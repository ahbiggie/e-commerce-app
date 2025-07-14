// src/components/shared/SearchBar.jsx

import React from "react"
import { FaSearch } from "react-icons/fa"

/**
 * Reusable Search Bar component.
 * @param {object} props - The component props.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {function} props.onSearch - Callback function to handle search input changes.
 * @param {string} [props.value] - Optional: The current value of the input field (for controlled components).
 * @param {string} [props.maxWidth] - Optional: Max width for the input group.
 */
const SearchBar = ({
  placeholder = "Search...",
  onSearch,
  value = "",
  maxWidth = "300px",
}) => {
  const handleChange = (e) => {
    onSearch(e.target.value)
  }

  return (
    <div
      className="input-group flex-grow-1 me-3 mb-2 mb-md-0"
      style={{ maxWidth: maxWidth }}
    >
      <span className="input-group-text bg-transparent border-end-0">
        <FaSearch className="text-muted" />
      </span>
      <input
        type="text"
        className="form-control border-start-0"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default SearchBar

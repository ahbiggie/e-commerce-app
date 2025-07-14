// src/components/shared/Pagination.jsx

import React from "react"

/**
 * Reusable Pagination component.
 * @param {object} props - The component props.
 * @param {number} props.currentPage - The current active page number.
 * @param {number} props.totalPages - The total number of pages.
 * @param {function} props.onPageChange - Callback function when a page is clicked.
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate an array of page numbers [1, 2, 3, ..., totalPages]
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        {/* Previous button */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>

        {/* Page numbers */}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <button onClick={() => onPageChange(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}

        {/* Next button */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination

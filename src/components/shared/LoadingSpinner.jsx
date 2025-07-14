// src/components/shared/LoadingSpinner.jsx
const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center my-5 py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default LoadingSpinner

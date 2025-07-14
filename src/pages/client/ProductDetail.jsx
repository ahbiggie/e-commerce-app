// src/pages/client/ProductDetail.jsx

import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductById } from "../../utils/api"
import { setLoading, setError } from "../../redux/slices/productSlice"
import LoadingSpinner from "../../components/shared/LoadingSpinner"

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { products, status } = useSelector((state) => state.products)

  const product = products.find((p) => p.id === parseInt(id))

  useEffect(() => {
    if (!product) {
      const loadProduct = async () => {
        try {
          dispatch(setLoading())
          const data = await fetchProductById(id)
          // For demo: just add to products array
          dispatch({ type: "products/addProduct", payload: data })
        } catch (error) {
          dispatch(setError(error.message))
        }
      }

      loadProduct()
    }
  }, [id, product, dispatch])

  if (status === "loading") return <LoadingSpinner />
  if (!product)
    return <div className="alert alert-danger">Product not found</div>

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
            style={{ maxHeight: "500px", objectFit: "contain" }}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p className="text-muted">${product.price.toFixed(2)}</p>
          <p className="lead">{product.description}</p>
          <p>
            Category: <span className="badge bg-info">{product.category}</span>
          </p>
          <p>
            In Stock:{" "}
            {product.stock > 0 ? (
              <span className="text-success">{product.stock} available</span>
            ) : (
              <span className="text-danger">Out of stock</span>
            )}
          </p>
          <button className="btn btn-primary btn-lg">Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

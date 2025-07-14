//src/pages/client/ProductList.jsx

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadProducts } from "../../redux/slices/productSlice"
import ProductCard from "../../components/client/ProductCard"
import LoadingSpinner from "../../components/shared/LoadingSpinner"

const ProductList = () => {
  const dispatch = useDispatch()
  const { products, status, error } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(loadProducts())
  }, [dispatch])

  if (status === "loading") return <LoadingSpinner />
  if (status === "failed")
    return <div className="alert alert-danger">Error: {error}</div>

  return (
    <div className="container py-5">
      <h2 className="mb-4">All Products</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map((product) => (
          <div key={product.id} className="col">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList

//src/components/client/ProductCard.jsx
import { useDispatch } from "react-redux"
import { addToCart } from "../../redux/slices/cartSlice"
import { FaShoppingCart } from "react-icons/fa"

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  return (
    <div className="card h-100">
      <img
        src={product.image}
        className="card-img-top p-3"
        alt={product.name}
        style={{ height: "180px", objectFit: "contain" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-truncate">{product.description}</p>
        <div className="mt-auto">
          <p className="fw-bold mb-2">${product.price.toFixed(2)}</p>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="btn btn-primary w-100"
          >
            <FaShoppingCart className="me-2" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

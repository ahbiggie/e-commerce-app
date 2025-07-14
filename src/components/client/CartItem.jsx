// src/components/client/CartItem.jsx

import { useDispatch } from "react-redux"
import { removeFromCart, updateQuantity } from "../../redux/slices/cartSlice"

const CartItem = ({ item }) => {
  const dispatch = useDispatch()

  return (
    <div className="d-flex align-items-center border-bottom pb-3 mb-3">
      <img
        src={item.image}
        alt={item.name}
        className="rounded me-3"
        style={{ width: "80px", height: "80px", objectFit: "cover" }}
      />
      <div className="flex-grow-1">
        <h6 className="mb-1">{item.name}</h6>
        <p className="mb-0">${item.price.toFixed(2)}</p>
      </div>
      <div className="d-flex align-items-center">
        <input
          type="number"
          min="1"
          className="form-control form-control-sm me-2"
          style={{ width: "60px" }}
          value={item.quantity}
          onChange={(e) =>
            dispatch(
              updateQuantity({
                id: item.id,
                quantity: parseInt(e.target.value) || 1,
              })
            )
          }
        />
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => dispatch(removeFromCart(item.id))}
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default CartItem

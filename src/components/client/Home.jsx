// src/components/client/Home.jsx

import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="py-5">
      <div className="container text-center py-5">
        <h1 className="display-4 fw-bold">Welcome to ShopEase</h1>
        <p className="lead mb-4">Discover amazing products at great prices</p>
        <Link to="/products" className="btn btn-primary btn-lg px-4">
          Shop Now
        </Link>
      </div>

      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">Featured Products</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <div className="bg-secondary bg-opacity-10 p-5 mb-3"></div>
                  <h5>Premium Headphones</h5>
                  <p>$129.99</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <div className="bg-secondary bg-opacity-10 p-5 mb-3"></div>
                  <h5>Running Shoes</h5>
                  <p>$89.99</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <div className="bg-secondary bg-opacity-10 p-5 mb-3"></div>
                  <h5>Smart Watch</h5>
                  <p>$199.99</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

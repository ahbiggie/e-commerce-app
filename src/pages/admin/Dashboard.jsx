// src/pages/admin/Dashboard.jsx

const Dashboard = () => {
  return (
    <div>
      <h1 className="mb-4">Admin Dashboard</h1>

      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">Total Products</h5>
              <p className="card-text display-4">25</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Total Orders</h5>
              <p className="card-text display-4">142</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">Revenue</h5>
              <p className="card-text display-4">$12,584</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card bg-warning text-dark">
            <div className="card-body">
              <h5 className="card-title">Customers</h5>
              <p className="card-text display-4">84</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Recent Activity</h5>
          <ul>
            <li>User John Doe placed a new order</li>
            <li>Product "Wireless Earbuds" was updated</li>
            <li>New customer registered</li>
            <li>Order #ORD-1234 was shipped</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

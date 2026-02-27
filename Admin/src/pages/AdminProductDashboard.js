import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import "./adminDashboard.css";

const AdminProductDashboard = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.products);
  const productError = useSelector((state) => state?.product?.isError);
  const productLoading = useSelector((state) => state?.product?.isLoading);
  const [topSelling, setTopSelling] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [outOfStock, setOutOfStock] = useState([]);

  console.log("Product State:", productState);
  console.log("Product Error:", productError);
  console.log("Product Loading:", productLoading);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (productState && Array.isArray(productState)) {
      // Top Selling Products
      const top = productState
        .sort((a, b) => (b.sold || 0) - (a.sold || 0))
        .slice(0, 5);
      setTopSelling(top);

      // Low Stock (1-10 items)
      const low = productState
        .filter((p) => p.quantity > 0 && p.quantity <= 10)
        .sort((a, b) => a.quantity - b.quantity)
        .slice(0, 5);
      setLowStock(low);

      // Out of Stock
      const outOf = productState
        .filter((p) => p.quantity === 0)
        .slice(0, 5);
      setOutOfStock(outOf);
    }
  }, [productState]);

  const getTotalRevenue = () => {
    if (!productState) return 0;
    return productState.reduce(
      (acc, product) => acc + (product.sold || 0) * product.price,
      0
    );
  };

  const getTotalInventoryValue = () => {
    if (!productState) return 0;
    return productState.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0
    );
  };

  const getTopBrand = () => {
    if (!productState) return "N/A";
    const brandCounts = {};
    productState.forEach((p) => {
      brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
    });
    return Object.keys(brandCounts).reduce((a, b) =>
      brandCounts[a] > brandCounts[b] ? a : b
    );
  };

  return (
    <div className="admin-dashboard py-5" style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <div className="container">
        <div className="dashboard-container" style={{ padding: "30px" }}>
          <h2 className="dashboard-title mb-5">📊 Product Performance Dashboard</h2>

          {productLoading && <div className="alert alert-info">Loading...</div>}
          {productError && <div className="alert alert-danger">Error loading products</div>}
          {!productState || productState.length === 0 ? (
            <div className="alert alert-warning">No products found</div>
          ) : null}
        <div className="row mb-5">
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="metric-card metric-card-1">
              <div className="metric-icon">📦</div>
              <div className="metric-content">
                <div className="metric-label">Total Products</div>
                <div className="metric-value">{productState?.length || 0}</div>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 mb-4">
            <div className="metric-card metric-card-2">
              <div className="metric-icon">💰</div>
              <div className="metric-content">
                <div className="metric-label">Total Revenue</div>
                <div className="metric-value">
                  ${getTotalRevenue().toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 mb-4">
            <div className="metric-card metric-card-3">
              <div className="metric-icon">📈</div>
              <div className="metric-content">
                <div className="metric-label">Inventory Value</div>
                <div className="metric-value">
                  ${getTotalInventoryValue().toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 mb-4">
            <div className="metric-card metric-card-4">
              <div className="metric-icon">🏆</div>
              <div className="metric-content">
                <div className="metric-label">Top Brand</div>
                <div className="metric-value">{getTopBrand()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="row mb-5">
          {/* Top Selling Products */}
          <div className="col-lg-6 mb-4">
            <div className="dashboard-card">
              <div className="card-header">
                <h5 className="card-title">🔥 Top Selling Products</h5>
              </div>
              <div className="card-body">
                {topSelling.length > 0 ? (
                  <div className="products-list">
                    {topSelling.map((product, index) => (
                      <div key={product._id} className="product-item">
                        <div className="product-rank">#{index + 1}</div>
                        <div className="product-info">
                          <div className="product-title">{product.title}</div>
                          <div className="product-meta">
                            {product.brand} • {product.category}
                          </div>
                        </div>
                        <div className="product-stats">
                          <div className="stat">
                            <span className="stat-label">Sold:</span>
                            <span className="stat-value">
                              {product.sold || 0}
                            </span>
                          </div>
                          <div className="stat">
                            <span className="stat-label">Revenue:</span>
                            <span className="stat-value">
                              ${((product.sold || 0) * product.price).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted text-center">No sales data yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="col-lg-6 mb-4">
            <div className="dashboard-card">
              <div className="card-header warning">
                <h5 className="card-title">⚠️ Low Stock Alert</h5>
              </div>
              <div className="card-body">
                {lowStock.length > 0 ? (
                  <div className="products-list">
                    {lowStock.map((product, index) => (
                      <div key={product._id} className="product-item alert-item">
                        <div className="product-rank warning">{product.quantity}</div>
                        <div className="product-info">
                          <div className="product-title">{product.title}</div>
                          <div className="product-meta">
                            {product.brand} • ${product.price}
                          </div>
                        </div>
                        <div className="stock-badge">Low Stock</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted text-center">No low stock products</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Out of Stock */}
        <div className="row">
          <div className="col-12 mb-4">
            <div className="dashboard-card">
              <div className="card-header danger">
                <h5 className="card-title">❌ Out of Stock Products</h5>
              </div>
              <div className="card-body">
                {outOfStock.length > 0 ? (
                  <div className="products-grid">
                    {outOfStock.map((product, index) => (
                      <div key={product._id} className="product-card-mini">
                        <div className="product-title-mini">{product.title}</div>
                        <div className="product-meta-mini">
                          <span className="badge bg-danger">Out of Stock</span>
                        </div>
                        <div className="product-brand-mini">{product.brand}</div>
                        <div className="product-category-mini">{product.category}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted text-center">All products in stock!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductDashboard;

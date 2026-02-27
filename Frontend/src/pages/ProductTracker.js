import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlilce";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import "./productTracker.css";

const ProductTracker = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.product);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("all"); // all, inStock, lowStock, outOfStock

  useEffect(() => {
    dispatch(getAllProducts({}));
  }, [dispatch]);

  useEffect(() => {
    if (productState && Array.isArray(productState)) {
      let filtered = productState;

      // Search filter
      if (searchTerm) {
        filtered = filtered.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Stock filter
      if (stockFilter === "inStock") {
        filtered = filtered.filter((product) => product.quantity > 10);
      } else if (stockFilter === "lowStock") {
        filtered = filtered.filter(
          (product) => product.quantity > 0 && product.quantity <= 10
        );
      } else if (stockFilter === "outOfStock") {
        filtered = filtered.filter((product) => product.quantity === 0);
      }

      setFilteredProducts(filtered);
    }
  }, [productState, searchTerm, stockFilter]);

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { status: "Out of Stock", color: "danger" };
    if (quantity <= 10) return { status: "Low Stock", color: "warning" };
    return { status: "In Stock", color: "success" };
  };

  const getTotalInventory = () => {
    return filteredProducts.reduce((acc, product) => acc + product.quantity, 0);
  };

  const getTotalSold = () => {
    return filteredProducts.reduce((acc, product) => acc + (product.sold || 0), 0);
  };

  const getAverageSalesPerProduct = () => {
    if (filteredProducts.length === 0) return 0;
    return (getTotalSold() / filteredProducts.length).toFixed(2);
  };

  return (
    <>
      <Meta title="Product Inventory Tracker" />
      <BreadCrumb title="Product Inventory Tracker" />
      <Container class1="tracker-wrapper home-wrapper-2 py-5">
        <div className="tracker-container">
          {/* Header Stats */}
          <div className="row mb-5">
            <div className="col-md-3 col-sm-6 mb-3">
              <div className="stat-card stat-card-primary">
                <div className="stat-label">Total Products</div>
                <div className="stat-value">{filteredProducts.length}</div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-3">
              <div className="stat-card stat-card-success">
                <div className="stat-label">Total Inventory</div>
                <div className="stat-value">{getTotalInventory()}</div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-3">
              <div className="stat-card stat-card-info">
                <div className="stat-label">Total Sold</div>
                <div className="stat-value">{getTotalSold()}</div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-3">
              <div className="stat-card stat-card-warning">
                <div className="stat-label">Avg Sales/Product</div>
                <div className="stat-value">{getAverageSalesPerProduct()}</div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="search-box">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by product name or brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
              >
                <option value="all">All Stock Status</option>
                <option value="inStock">In Stock (>10)</option>
                <option value="lowStock">Low Stock (1-10)</option>
                <option value="outOfStock">Out of Stock (0)</option>
              </select>
            </div>
          </div>

          {/* Products Table */}
          <div className="table-responsive">
            <table className="table table-hover tracker-table">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Sold</th>
                  <th>Stock Status</th>
                  <th>Total Value</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts && filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => {
                    const stockInfo = getStockStatus(product.quantity);
                    const totalValue = (
                      product.quantity * product.price
                    ).toFixed(2);
                    return (
                      <tr key={product._id} className="product-row">
                        <td className="product-index">{index + 1}</td>
                        <td className="product-name">
                          <strong>{product.title}</strong>
                        </td>
                        <td>{product.brand}</td>
                        <td>{product.category}</td>
                        <td className="price-cell">
                          <span className="badge bg-secondary">
                            ${product.price}
                          </span>
                        </td>
                        <td className="quantity-cell">
                          <span
                            className={`badge bg-${
                              product.quantity > 10 ? "success" : "warning"
                            }`}
                          >
                            {product.quantity}
                          </span>
                        </td>
                        <td className="sold-cell">
                          <span className="badge bg-info">
                            {product.sold || 0}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge bg-${stockInfo.color}`}
                          >
                            {stockInfo.status}
                          </span>
                        </td>
                        <td className="value-cell">
                          <strong>${totalValue}</strong>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-5">
                      <p className="text-muted">No products found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Summary Footer */}
          <div className="row mt-5 pt-3 border-top">
            <div className="col-md-12">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6>Showing {filteredProducts.length} of products</h6>
                </div>
                <div className="summary-stats">
                  <span className="me-4">
                    Total Inventory Value:{" "}
                    <strong>
                      ${filteredProducts
                        .reduce((acc, p) => acc + p.quantity * p.price, 0)
                        .toFixed(2)}
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProductTracker;

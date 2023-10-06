import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct } from "../store/customerSlice";
import { useDispatch } from "react-redux";

function EditProduct() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { cId, pId } = useParams();
  const customerId = parseInt(cId, 10);
  // console.log(id);
  useEffect(() => {
    loadProduct();
  }, []);

  const [productData, setProductData] = useState({
    productName: "",
    productDesc: "",
    productPrice: "",
    rating: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:8888/customers/${cId}/products/${pId}`,
      productData
    );
    dispatch(updateProduct({ id: customerId, updatedProduct: productData }));
    // console.log(cId);
    navigate(`/viewProduct/${cId}`);
  };

  const loadProduct = async () => {
    const result = await axios.get(
      `http://localhost:8888/customers/${cId}/products/${pId}`
    );
    // console.log(id);
    setProductData(result.data);
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        {pId !== null && (
          <div className="form-container">
            <h2 className="form-heading">Edit Product</h2>
            <div>
              <label htmlFor="productName">Product Name:</label>
              <input
                className="form-input"
                type="text"
                placeholder="Name"
                value={productData.productName}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    productName: e.target.value,
                  })
                }
              />
              <label htmlFor="productDesc">Description:</label>
              <input
                className="form-input"
                type="text"
                placeholder="Description"
                value={productData.productDesc}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    productDesc: e.target.value,
                  })
                }
              />
              <label htmlFor="productPrice">Price:</label>
              <input
                className="form-input"
                type="text"
                placeholder="Price"
                value={productData.productPrice}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    productPrice: e.target.value,
                  })
                }
              />
              <label htmlFor="rating">Rating:</label>
              <input
                className="form-input"
                type="text"
                placeholder="Rating"
                value={productData.rating}
                onChange={(e) =>
                  setProductData({ ...productData, rating: e.target.value })
                }
              />
              <button className="form-button">Update Product</button>
              <button
                className="form-button cancel-button"
                onClick={() => navigate(`/viewProduct/${cId}`)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
export default EditProduct;

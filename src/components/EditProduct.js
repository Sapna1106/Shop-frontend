import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  let navigate = useNavigate();

  const { id } = useParams();

  //  console.log(id);
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
      `http://localhost:8888/customers/${id}/products/${productData.id}`,
      productData
    );
    navigate(`/viewProduct/${id}`);
  };

  const loadProduct = async (e) => {
    const result = await axios.get(
      `http://localhost:8888/customers/${id}/products/${id}`
    );
    // console.log(id);
    setProductData(result.data);
  };

  const handleCancelUpdate = () => {
    setProductData({
      productName: "",
      productDesc: "",
      productPrice: "",
      rating: "",
    });
    navigate(`/viewProduct/${id}`);
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        {id !== null && (
          <div className="form-container">
            <h2 className="form-heading">Edit Product</h2>
            <div>
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
                onClick={handleCancelUpdate}
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

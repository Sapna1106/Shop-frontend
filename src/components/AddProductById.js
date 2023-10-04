import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom"; // Use useNavigate
import { addProduct } from "../store/productSlice";

function AddProductById() {
    const [productData, setProductData] = useState({
        productName: '',
        productDesc: '',
        productPrice: '',
        rating: '',
    });

    const [formVisible, setFormVisible] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use useNavigate to handle navigation

    const { id } = useParams();

    useEffect(() => {
        loadCustomer();
    }, [id]);

    const loadCustomer = async () => {
        const result = await axios.get(`http://localhost:8888/customers/${id}/products`);
        // console.log(result.data);
        setProductData(result.data);
    };

    const handleAddProduct = async () => {
        if (productData.productName && productData.productDesc && productData.productPrice && productData.rating) {
            try {
                const response = await axios.post(`http://localhost:8888/customers/${id}/products`, productData);
                console.log(response.data);
                const newProduct = response.data;

                dispatch(addProduct(newProduct));

                setProductData({ productName: '', productDesc: '', productPrice: '', rating: '' });
                setFormVisible(false); // Hide the form after successful submission
                navigate('/'); // Redirect to the display page

            } catch (error) {
                console.error('Error saving product data:', error);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="add-container">
            {formVisible ? (
                <div>
                    <h2>Add Product</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="productName">Product Name:</label>
                            <input type="text" name="productName" value={productData.productName} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="productDesc">Description:</label>
                            <input type="text" name="productDesc" value={productData.productDesc} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="productPrice">Price:</label>
                            <input type="tel" name="productPrice" value={productData.productPrice} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rating">Rating:</label>
                            <input type="tel" name="rating" value={productData.rating} onChange={handleInputChange} />
                        </div>
                        <button type="submit" onClick={handleAddProduct}>Submit</button>
                    </form>
                </div>
            ) : (
                <div>
                    <p>Product added successfully!</p>
                    <button onClick={() => navigate('/')}>Back to Customer List</button>
                </div>
            )}
        </div>
    );
}

export default AddProductById;

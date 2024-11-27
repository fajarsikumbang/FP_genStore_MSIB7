import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducers/cartReducer";

function ProductList({ products }) {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const handleAddToCart = (product) => {
        if (!isAuthenticated) {
            return alert("Please log in to add items to the cart.");
        }

        
        if (product.stock <= 0) {
            return alert("Sorry, this product is out of stock.");
        }
        if (product.stock > 10) {
            return alert("Sorry, you can only buy up to 10 items of this product.");
        }

        
        dispatch(addToCart(product));
    };

    return (
        <div className="row product-list">
            {products.map((product) => (
                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
                    <div className="card product-card">
                        <div className="card-img-container">
                            <img
                                src={product.image}
                                className="card-img-top"
                                alt={product.title}
                            />
                        </div>
                        <div className="card-body d-flex flex-column justify-content-between">
                            <h5 className="card-title text-center">
                                <Link to={`/product/${product.id}`}>{product.title}</Link>
                            </h5>
                            <p className="card-text text-center">Price: ${product.price}</p>
                            <p className="card-text text-center">Stock: {product.stock} 10</p>
                            <button
                                className="btn btn-primary mt-auto"
                                onClick={() => handleAddToCart(product)}
                                disabled={product.stock <= 0}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductList;

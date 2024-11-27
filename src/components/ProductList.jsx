import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducers/cartReducer";

function ProductList({ products }) {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const handleAddToCart = (product) => {
        if (!isAuthenticated) {
            return alert("Silakan masuk untuk menambahkan item ke keranjang.");
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
                            <p className="card-text text-center">Harga: Rp{product.price}</p>
                            <button
                                className="btn btn-primary mt-auto"
                                onClick={() => handleAddToCart(product)}
                            >
                                Tambah ke Keranjang
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductList;

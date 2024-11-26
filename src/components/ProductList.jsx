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
        <div className="row">
            {products.map((product) => (
                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
                    <div className="card h-100">
                        <img
                            src={product.image}
                            className="card-img-top"
                            alt={product.title}
                        />
                        <div className="card-body text-center">
                            <h5 className="card-title">
                                <Link to={`/product/${product.id}`}>{product.title}</Link>
                            </h5>
                            <p className="card-text">Harga: Rp{product.price}</p>
                            <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>
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
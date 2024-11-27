import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducers/cartReducer";
import { useParams } from "react-router-dom";

function DetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);
    const product = products.find((item) => item.id === parseInt(id));

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        alert(`${product.title} telah ditambahkan ke keranjang!`);
    };

    if (!product) {
        return <h2 className="text-center">Produk tidak ditemukan</h2>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={product.image} className="img-fluid" alt={product.title} />
                </div>
                <div className="col-md-6">
                    <h2>{product.title}</h2>
                    <p className="lead">Harga: ${product.price}</p>
                    <p>{product.description}</p>
                    <button className="btn btn-primary" onClick={handleAddToCart}>
                        Add To cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DetailPage;
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducers/cartReducer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function DetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);
    const product = products.find((item) => item.id === parseInt(id));
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            alert("Please log in to add items to the cart.");
            navigate("/login");
            return;
        }
        dispatch(addToCart(product));
        alert(`${product.title} has been added to the cart!`);
    };

    if (!product) {
        return <h2 className="text-center">Product not found</h2>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={product.image} className="img-fluid" alt={product.title} />
                </div>
                <div className="col-md-6">
                    <h2>{product.title}</h2>
                    <p className="lead">Price: ${product.price}</p>
                    <p>{product.description}</p>
                    <button className="btn btn-primary" onClick={handleAddToCart}>
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DetailPage;
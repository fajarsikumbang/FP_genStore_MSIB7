import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, checkout } from "../redux/reducers/cartReducer";
import { reduceStock } from "../redux/reducers/productReducer";

function CartPage() {
    const { items } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [paymentInfo, setPaymentInfo] = useState({ name: "", cardNumber: "" });
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState("");

    const formatDollar = (value) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(value);
    };

    const calculateTotal = useCallback(() => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [items]);

    const handleRemove = (item) => {
        dispatch(removeFromCart(item));
    };

    const handlePayment = (e) => {
        e.preventDefault();

        const insufficientStock = items.some((item) => item.quantity > item.stock);
        if (insufficientStock) {
            setError("One or more items have insufficient stock.");
            return;
        }

        setError("");

        
        dispatch(reduceStock(items));

        
        dispatch(checkout());

        
        setShowConfirmation(true);


        setPaymentInfo({ name: "", cardNumber: "" });
    };

    useEffect(() => {
        setTotal(calculateTotal());
    }, [calculateTotal]);

    return (
        <div className="container cart-page">
            <h1 className="text-center">My Cart</h1>
            {items.length === 0 ? (
                <h4 className="text-center">You haven't selected any items</h4>
            ) : (
                <div>
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>{formatDollar(item.price)}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            min="1"
                                            max={item.stock}
                                            onChange={(e) => {
                                                const qty = Math.max(1, Number(e.target.value));
                                                if (qty !== item.quantity) {
                                                    dispatch({
                                                        type: "cart/addToCart",
                                                        payload: { ...item, quantity: qty },
                                                    });
                                                }
                                            }}
                                        />
                                    </td>
                                    <td>{formatDollar(item.price * item.quantity)}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleRemove(item)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h4>Total: {formatDollar(total)}</h4>
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                    <form onSubmit={handlePayment} className="mt-4 form-responsive">
                        <h5>Payment Information</h5>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Name on Card"
                            value={paymentInfo.name}
                            onChange={(e) =>
                                setPaymentInfo({ ...paymentInfo, name: e.target.value })
                            }
                            required
                        />
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Card Number"
                            value={paymentInfo.cardNumber}
                            onChange={(e) =>
                                setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
                            }
                            required
                        />
                        <button type="submit" className="btn btn-success w-100">
                            Pay
                        </button>
                    </form>
                    {showConfirmation && (
                        <div className="alert alert-success mt-3" role="alert">
                            <h5>Thank You for Your Purchase!</h5>
                            <p>Your order has been processed successfully.</p>
                            <p>
                                We appreciate your business. You will receive an email confirmation
                                shortly.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default CartPage;

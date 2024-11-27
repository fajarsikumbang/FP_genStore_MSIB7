import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, addToCart } from "../redux/reducers/cartReducer";

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

        // Cek apakah ada produk yang stoknya kurang dari jumlah yang dibeli
        const insufficientStock = items.some(item => item.quantity > item.stock);

        if (insufficientStock) {
            setError("One or more items have insufficient stock.");
            return;  // Jangan lanjutkan ke proses pembayaran
        }

        setError(""); // Clear error jika stok mencukupi
        setShowConfirmation(true);

        // Hapus barang dari keranjang setelah pembayaran berhasil
        items.forEach(item => dispatch(removeFromCart(item)));
    };

    useEffect(() => {
        setTotal(calculateTotal());
    }, [calculateTotal]);

    // Menyimpan ke localStorage setiap kali ada perubahan pada items
    useEffect(() => {
        if (items.length > 0) {
            localStorage.setItem("cart", JSON.stringify(items));  // Simpan items ke localStorage
        }
    }, [items]);

    // Mengambil data keranjang dari localStorage saat halaman dimuat pertama kali
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            const cartItems = JSON.parse(savedCart);
            cartItems.forEach(item => dispatch(addToCart(item)));  // Tambahkan item dari localStorage ke store
        }
    }, [dispatch]);

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
                                            onChange={(e) => {
                                                const qty = Math.max(1, Number(e.target.value));
                                                if (qty !== item.quantity) {
                                                    dispatch(addToCart({ ...item, quantity: qty }));
                                                }
                                            }}
                                        />
                                    </td>
                                    <td>{formatDollar(item.price * item.quantity)}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleRemove(item)}>
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
                            onChange={(e) => setPaymentInfo({ ...paymentInfo, name: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Card Number"
                            value={paymentInfo.cardNumber}
                            onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                            required
                        />
                        <button type="submit" className="btn btn-success w-100">Pay</button>
                    </form>
                    {showConfirmation && (
                        <div className="alert alert-success mt-3" role="alert">
                            Payment successful! Thank you for your purchase.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default CartPage;

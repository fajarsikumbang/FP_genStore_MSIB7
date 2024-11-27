import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, addToCart } from "../redux/reducers/cartReducer";

function CartPage() {
    const { items } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [paymentInfo, setPaymentInfo] = useState({ name: "", cardNumber: "" });
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [total, setTotal] = useState(0);

    const formatRupiah = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
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
        setShowConfirmation(true);
    };

    useEffect(() => {
        setTotal(calculateTotal());
    }, [calculateTotal]);

    return (
        <div className="container cart-page">
            <h1 className="text-center">Keranjang Saya</h1>
            {items.length === 0 ? (
                <h4 className="text-center">Anda belum memilih item</h4>
            ) : (
                <div>
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <th>Produk</th>
                                <th>Harga</th>
                                <th>Jumlah</th>
                                <th>Subtotal</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>{formatRupiah(item.price)}</td>
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
                                    <td>{formatRupiah(item.price * item.quantity)}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleRemove(item)}>
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h4>Total: {formatRupiah(total)}</h4>
                    <form onSubmit={handlePayment} className="mt-4 form-responsive">
                        <h5>Informasi Pembayaran</h5>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Nama pada Kartu"
                            value={paymentInfo.name}
                            onChange={(e) => setPaymentInfo({ ...paymentInfo, name: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Nomor Kartu"
                            value={paymentInfo.cardNumber}
                            onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                            required
                        />
                        <button type="submit" className="btn btn-success w-100">Bayar</button>
                    </form>
                    {showConfirmation && (
                        <div className="alert alert-success mt-3" role="alert">
                            Pembayaran berhasil! Terima kasih atas pembelian Anda.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default CartPage;

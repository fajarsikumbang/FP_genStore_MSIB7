import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/reducers/authReducer";

function Header() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { items } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <header className="bg-dark text-white p-3">
            <h1 className="text-center">Gen Store</h1>
            <nav className="text-center">
                <Link className="text-white mx-3" to="/">Beranda</Link>
                {!isAuthenticated ? (
                    <Link className="text-white mx-3" to="/login">Masuk</Link>
                ) : (
                    <>
                        <Link className="text-white mx-3" to="/cart">Keranjang ({items.length})</Link>
                        <button className="btn btn-outline-light" onClick={handleLogout}>Keluar</button>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;
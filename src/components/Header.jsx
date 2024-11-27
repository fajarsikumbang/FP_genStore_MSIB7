import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/reducers/authReducer";
import logo from "../assets/gen_store.png";

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
        <header className="bg-light text-dark p-3">
            <div className="d-flex justify-content-center align-items-center">
                <img src={logo} alt="Logo Gen Store" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                <h1>Gen Store</h1>
            </div>
            <nav className="text-center">
                <Link className="text-dark mx-3" to="/">Beranda</Link>
                {!isAuthenticated ? (
                    <Link className="text-dark mx-3" to="/login">Masuk</Link>
                ) : (
                    <>
                        <Link className="text-dark mx-3" to="/cart">Keranjang ({items.length})</Link>
                        <button className="btn btn-outline-dark" onClick={handleLogout}>Keluar</button>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/reducers/authReducer";
import logo from "../assets/gen_store.png";

function Header() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { items } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header bg-light text-dark p-3">
            <div className="header-container d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <img
                        src={logo}
                        alt="Logo Gen Store"
                        className="logo"
                    />
                    <h1 className="m-0">Gen Store</h1>
                </div>
                {}
                <button className="navbar-toggler d-md-none" onClick={toggleMenu}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <nav className={`nav-links ${isMenuOpen ? 'active' : ''} d-flex align-items-center`}>
                    <Link className="nav-link" to="/">Beranda</Link>
                    {!isAuthenticated ? (
                        <Link className="nav-link" to="/login">Masuk</Link>
                    ) : (
                        <>
                            <Link className="nav-link" to="/cart">
                                Keranjang ({items.length})
                            </Link>
                            <button
                                className="logout-link"
                                onClick={handleLogout}
                            >
                                Keluar
                            </button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;


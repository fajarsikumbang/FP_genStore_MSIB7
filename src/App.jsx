import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import DetailPage from "./pages/DetailPage";
import "./App.css";

function App() {
    return (
        <Router>
            <Header />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/product/:id" element={<DetailPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

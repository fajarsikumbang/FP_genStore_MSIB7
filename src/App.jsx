import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import CartPage from "./pages/CartPage";
import DetailPage from "./pages/DetailPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import React from "react";

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
      <Footer /> {/* Tambahkan Footer di bagian bawah */}
    </Router>
  );
}

export default App;

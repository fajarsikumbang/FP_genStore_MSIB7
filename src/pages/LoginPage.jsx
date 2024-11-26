import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ username, password }));
        navigate("/");
    };

    return (
        <div className="container">
            <h2 className="text-center">Masuk</h2>
            <form onSubmit={handleSubmit} className="form-group">
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Kata Sandi"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="btn btn-primary w-100">Masuk</button>
            </form>
        </div>
    );
}

export default LoginPage;
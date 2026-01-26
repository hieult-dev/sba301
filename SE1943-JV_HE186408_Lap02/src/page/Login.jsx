// src/pages/Login.jsx
import { Form, Button, Alert } from "react-bootstrap";
import "../assets/Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import { useState } from "react";
import UserAPI from "../api/userAPI";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [error, setError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);
        const username = String(formData.get("email") || "").trim();
        const password = String(formData.get("password") || "").trim();

        try {
            const res = await UserAPI.login(username, password);
            const userData = res;

            // Lưu vào auth context
            login(userData);

            navigate("/home", { replace: true });
        } catch (err) {
            // BE trả 404 khi sai
            if (err?.response?.status === 404) {
                setError("Sai tài khoản hoặc mật khẩu.");
            } else {
                setError("Không thể đăng nhập. Kiểm tra BE/URL/CORS.");
            }
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: 80,
            }}
        >
            <form onSubmit={onSubmit} className="login-form">
                <h4 style={{ textAlign: "center", marginBottom: 20 }}>Đăng Nhập</h4>

                {error && <Alert variant="danger">{error}</Alert>}

                <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
                    <label style={{ width: 90 }}>Username:</label>
                    <Form.Control className="input" name="email" type="text" required />
                </div>

                <div style={{ display: "flex", alignItems: "center", marginBottom: 30 }}>
                    <label style={{ width: 90 }}>Mật khẩu:</label>
                    <Form.Control className="input" name="password" type="password" required />
                </div>

                <div style={{ textAlign: "center" }}>
                    <Button type="submit" className="login-btn">
                        Đăng Nhập
                    </Button>
                </div>
            </form>
        </div>
    );
}

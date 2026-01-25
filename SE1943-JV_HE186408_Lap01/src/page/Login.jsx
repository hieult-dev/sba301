import { Form, Button, Alert } from "react-bootstrap"
import "../assets/Login.css"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../security/AuthContext"

export default function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()

    const onSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const email = String(formData.get("email") || "")
        const password = String(formData.get("password") || "")

        if (email === "admin" && password === "admin") {
            const userData = {
                email,
                role: "admin",
            }
            login(userData)
            navigate("/home", { replace: true })
            return
        }

    }

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

                <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
                    <label style={{ width: 90 }}>Email:</label>
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
    )
}

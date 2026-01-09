import { Form, Button } from "react-bootstrap";
import "../assets/Login.css";
export default function Login() {
    const onSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get("email");
        const password = form.get("password");

        console.log({ email, password });
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
            <form onSubmit={onSubmit} className="loggin-form">
                <h4 style={{ textAlign: "center", marginBottom: 40 }}>Đăng Nhập</h4>

                <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
                    <label style={{ width: 90 }}>Email:</label>
                    <Form.Control
                        className="input"
                        name="email"
                        type="email"
                        required
                    />
                </div>

                <div style={{ display: "flex", alignItems: "center", marginBottom: 30 }}>
                    <label style={{ width: 90 }}>Mật khẩu:</label>
                    <Form.Control
                        className="input"
                        name="password"
                        type="password"
                        required
                    />
                </div>

                <div style={{ textAlign: "center" }}>
                    <Button
                        type="submit"
                        className="login-btn"
                    >
                        Đăng Nhập
                    </Button>
                </div>
            </form>
        </div>
    );
}

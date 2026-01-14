import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    const getEmailUser = () => {
        const userData = localStorage.getItem('userdata');
        if (!userData) return "";
        try {
            const user = JSON.parse(userData);
            return user.email || "";
        } catch {
            return "";
        }
    }

    return (
        <>
            <header className="home-header">
                <div className="home-logoBox">Logo</div>

                <div className="home-title">Quản Lý Đại Lý</div>

                <div className="home-userBox">
                    <div>
                        Chào {getEmailUser()}{" "}
                        <Link to="/login" onClick={handleLogout} className="home-link">
                            đăng xuất
                        </Link>
                    </div>
                    <div>Ngày:</div>
                </div>
            </header>

            <nav className="home-nav">
                <Link to="/home" className="home-link">
                    Trang Chủ
                </Link>
                <Link to="/agents" className="home-link">
                    Quản Lý Đại Lý
                </Link>
            </nav>
        </>
    );
}

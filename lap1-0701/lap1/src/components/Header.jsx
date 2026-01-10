import { Link } from "react-router-dom";
export default function Header() {
    return (
        <>
            {/* Header */}
            <header className="home-header">
                <div className="home-logoBox">Logo</div>

                <div className="home-title">Quản Lý Đại Lý</div>

                <div className="home-userBox">
                    <div>
                        Chào {"<Tên đăng nhập>"}{" "}
                        <span className="home-logout">đăng xuất</span>
                    </div>
                    <div>Ngày:</div>
                </div>
            </header>

            {/* Nav */}
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

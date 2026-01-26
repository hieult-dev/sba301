import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../security/AuthContext"
import { useEffect, useState } from "react"

export default function Header() {
    const { logout } = useAuth()
    const navigate = useNavigate()

    const [userName, setUserName] = useState("")

    useEffect(() => {
        const userData = localStorage.getItem("userdata")
        if (!userData) {
            setUserName("")
            return
        }

        try {
            const user = JSON.parse(userData)
            setUserName(user.username || "")
        } catch {
            setUserName("")
        }
    }, [])

    const handleLogout = () => {
        logout()
        localStorage.removeItem("userdata")
        setUserName("")
        navigate("/login")
    }

    const getToday = () => {
        const today = new Date()
        return today.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    }

    const isLoggedIn = !!localStorage.getItem("userdata")

    return (
        <>
            <header className="home-header">
                <div className="home-logoBox">Logo</div>

                <div className="home-title">Quản Lý Thực Phẩm</div>

                <div className="home-userBox">
                    <div>
                        {isLoggedIn ? (
                            <>
                                Chào <b>{userName}</b>{" "}
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: "#0b5ed7",
                                        cursor: "pointer",
                                        textDecoration: "underline",
                                        padding: 0,
                                    }}
                                >
                                    đăng xuất
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="home-link">
                                đăng nhập
                            </Link>
                        )}
                    </div>

                    <div>Ngày: {getToday()}</div>
                </div>
            </header>

            <nav className="home-nav">
                <Link to="/home" className="home-link">
                    Trang Chủ
                </Link>

                <Link to="/manage-food" className="home-link">
                    Danh Sách Thực Phẩm
                </Link>
            </nav>
        </>
    )
}

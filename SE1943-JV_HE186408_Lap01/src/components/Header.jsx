import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../security/AuthContext"
import { useEffect, useState } from "react"

export default function Header() {
    const { logout } = useAuth()
    const navigate = useNavigate()

    const [userEmail, setUserEmail] = useState("")

    useEffect(() => {
        const userData = localStorage.getItem("userdata")
        if (!userData) {
            setUserEmail("s")
            return
        }

        try {
            const user = JSON.parse(userData)
            setUserEmail(user.email || "")
        } catch {
            setUserEmail("")
        }
    }, [])

    const handleLogout = () => {
        logout()
        localStorage.removeItem("userdata")
        setUserEmail("")
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

    const isLoggedIn = !!userEmail

    return (
        <>
            <header className="home-header">
                <div className="home-logoBox">Logo</div>

                <div className="home-title">Quản Lý Dược Phẩm</div>

                <div className="home-userBox">
                    <div>
                        {isLoggedIn ? (
                            <>
                                Chào <b>{userEmail}</b>{" "}
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

                <Link to="/manage-phamacy" className="home-link">
                    Danh Sách Dược Phẩm
                </Link>
            </nav>
        </>
    )
}

import "../assets/Layout.css";
import { Outlet } from "react-router-dom";

import Header from "./component/Header";
import Footer from "./component/Footer";

export default function Layout() {
    return (
        <div className="home">
            <div className="home-container">
                <Header />
                <main className="home-main">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}
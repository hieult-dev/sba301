import "../assets/Home.css";

import Header from "../components/Header";
import MainContentHome from "../components/MainContentHome";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <div className="home">
            <div className="home-container">
                <Header />
                <MainContentHome />
                <Footer />
            </div>
        </div>
    );
}

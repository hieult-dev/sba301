import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FoodAPI from "../api/foodAPI";

export default function PhamacyDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [phamacy, setPhamacy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchDetail() {
            try {
                setLoading(true);
                setError(null);
                const data = await FoodAPI.getById(id);
                setPhamacy(data);
            } catch (e) {
                setError(e?.message || "Load detail failed");
            } finally {
                setLoading(false);
            }
        }

        fetchDetail();
    }, [id]);

    if (loading) return <p style={{ padding: 16 }}>Loading detail...</p>;
    if (error)
        return (
            <div style={{ padding: 16 }}>
                <p style={{ color: "red" }}>{error}</p>
                <button onClick={() => navigate(-1)}>Quay lại</button>
            </div>
        );

    return (
        <div className="home-contentBox" style={{ padding: 16 }}>
            <h3>Thông tin chi tiết</h3>

            <div style={{ marginTop: 16 }}>
                <p><b>Mã:</b> {phamacy.code}</p>
                <p><b>Tên:</b> {phamacy.foodName}</p>
                <p><b>Loại:</b> {phamacy.categoryName}</p>
                <p><b>Giá:</b> {phamacy.price}</p>
                <p><b>Ngày hết hạn:</b> {phamacy.expiredDate ? String(phamacy.expiredDate).slice(0, 10) : ""}</p>
                <p><b>Số lượng:</b> {phamacy.stock}</p>
                <p><b>Nhà Sản Xuất:</b> {phamacy.manufacturer}</p>
            </div>

            <button onClick={() => navigate(-1)} style={{ marginTop: 20 }}>
                Quay lại
            </button>
        </div>
    );
}

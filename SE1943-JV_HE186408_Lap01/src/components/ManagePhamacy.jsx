import { useState, useEffect } from "react";
import PhamacyDetail from "./PhamacyDetail";
import { useNavigate } from "react-router-dom";
import phamacyApi from "../api/phamacyApi";

export default function ManagePhamacy() {
    const navigate = useNavigate();

    const [phamacy, setPhamacy] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedPhamacy, setselectedPhamacy] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const [searchInput, setSearchInput] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [deletingId, setDeletingId] = useState(null);

    const toAddpage = () => {
        navigate("/add-phamacy");
    };

    // list phamacy
    useEffect(() => {
        let cancelled = false;

        async function fetchPhamacy() {
            try {
                setLoading(true);
                setError(null);
                const data = await phamacyApi.getAll();
                console.log("Fetched phamacy:", data);

                if (!cancelled) setPhamacy(Array.isArray(data) ? data : []);
            } catch (e) {
                if (!cancelled) setError(e?.message || "Fetch failed");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchPhamacy();
        return () => {
            cancelled = true;
        };
    }, []);

    // filter phamacy by name
    const filteredPhamacy = phamacy.filter((item) => {
        if (!searchKeyword) return true;
        return item.name?.toLowerCase().includes(searchKeyword.toLowerCase());
    });

    // delete phamacy
    const handleDelete = async (id) => {
        const ok = window.confirm("Bạn chắc chắn muốn xóa dược phẩm này?");
        if (!ok) return;

        try {
            setDeletingId(id);
            await phamacyApi.remove(id);

            setPhamacy((prev) => prev.filter((x) => String(x.id) !== String(id)));

            const remaining = filteredPhamacy.length - 1;
            const newTotalPages = Math.max(1, Math.ceil(remaining / pageSize));
            setCurrentPage((p) => Math.min(p, newTotalPages));
        } catch (e) {
            alert(e?.message || "Xóa thất bại");
        } finally {
            setDeletingId(null);
        }
    };


    const totalPages = Math.max(1, Math.ceil(filteredPhamacy.length / pageSize));
    const safePage = Math.min(currentPage, totalPages);
    const startIndex = (safePage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredPhamacy.length);
    const pagedPhamacy = filteredPhamacy.slice(startIndex, endIndex);
    const displayStart = filteredPhamacy.length === 0 ? 0 : startIndex + 1;

    if (selectedPhamacy) {
        return (
            <PhamacyDetail
                phamacy={selectedPhamacy}
                onBack={() => setselectedPhamacy(null)}
            />
        );
    }

    return (
        <div className="home-contentBox">
            <h3 style={{ padding: 16 }}>DANH SÁCH DƯỢC PHẨM</h3>

            <div style={{ padding: "0 16px 16px" }}>
                <div style={{ marginBottom: 12 }}>
                    Loại:&nbsp;
                    <select name="type" style={{ padding: "4px 8px", minWidth: 200 }}>
                        <option value="">Chọn loại</option>
                        <option value="TPCN">Thực Phẩm Chức Năng</option>
                        <option value="THUOC_KE_DON">Thuốc Kê Theo Đơn</option>
                        <option value="THUOC_KHONG_KE_DON">Thuốc Không Kê Đơn</option>
                    </select>
                </div>

                <div style={{ marginBottom: 16 }}>
                    Tên:{" "}
                    <input
                        style={{ width: 300 }}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    &nbsp;&nbsp;&nbsp;
                    <button
                        onClick={() => {
                            setSearchKeyword(searchInput.trim());
                            setCurrentPage(1);
                        }}
                    >
                        Tìm
                    </button>
                    <button onClick={toAddpage}>Thêm Mới Dược Phẩm</button>
                </div>

                <div
                    style={{
                        marginTop: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <b>Hiển thị:</b>
                        <select defaultValue="10" style={{ width: 60 }}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                        <span>Dược phẩm</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={safePage === 1}
                        >
                            Trước
                        </button>
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={safePage === totalPages}
                        >
                            Sau
                        </button>
                    </div>
                </div>

                {loading && <p style={{ padding: "8px 0" }}>Loading...</p>}
                {error && <p style={{ padding: "8px 0", color: "red" }}>{error}</p>}

                {!loading && !error && (
                    <>
                        <table border="1" width="100%" cellPadding="6">
                            <thead>
                                <tr style={{ background: "#8faadc" }}>
                                    <th>STT</th>
                                    <th>Mã</th>
                                    <th>Tên</th>
                                    <th>Loại</th>
                                    <th>Công dụng</th>
                                    <th>Nhà SX</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {pagedPhamacy.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{startIndex + index + 1}</td>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.type}</td>
                                        <td>{item.cdung}</td>
                                        <td>{item.nsanxuat}</td>
                                        <td></td>
                                        <td>
                                            <button onClick={() => navigate(`/phamacy/${item.id}`)}>
                                                Xem Chi Tiết
                                            </button>
                                            <button
                                                onClick={() =>
                                                    navigate(`/edit-phamacy/${item.id}`)}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                disabled={deletingId === item.id}
                                            >
                                                {deletingId === item.id ? "Đang xóa..." : "Xóa"}
                                            </button>

                                        </td>
                                    </tr>
                                ))}

                                {pagedPhamacy.length === 0 && (
                                    <tr>
                                        <td colSpan={8} style={{ textAlign: "center" }}>
                                            Không có dữ liệu
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div
                            style={{
                                textAlign: "center",
                                marginTop: 12,
                                fontSize: 13,
                                color: "#555",
                            }}
                        >
                            Hiển thị từ {displayStart} đến {endIndex} trên{" "}
                            {filteredPhamacy.length} dược phẩm
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

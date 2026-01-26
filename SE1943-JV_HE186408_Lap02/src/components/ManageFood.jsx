import { useEffect, useState } from "react";
import FoodDetail from "./FoodDetail";
import { useNavigate } from "react-router-dom";
import FoodAPI from "../api/foodAPI";
import CategoryAPI from "../api/categoryAPI";

export default function ManageFood() {
    const navigate = useNavigate();

    const [foods, setFoods] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedFood, setSelectedFood] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const [searchInput, setSearchInput] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

    const [selectedCategoryId, setSelectedCategoryId] = useState(""); // "" = all
    const [deletingId, setDeletingId] = useState(null);

    const toAddpage = () => {
        navigate("/add-food");
    };

    // Load foods + categories
    useEffect(() => {
        let cancelled = false;

        async function fetchAll() {
            try {
                setLoading(true);
                setError(null);

                // axiosClient trả thẳng data
                const [foodData, categoryData] = await Promise.all([
                    FoodAPI.getAll(),
                    CategoryAPI.getAll(),
                ]);

                if (!cancelled) {
                    setFoods(Array.isArray(foodData) ? foodData : []);
                    setCategories(Array.isArray(categoryData) ? categoryData : []);
                }
            } catch (e) {
                if (!cancelled) setError(e?.message || "Fetch failed");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchAll();
        return () => {
            cancelled = true;
        };
    }, []);

    // Filter by name + category
    const filteredFoods = foods.filter((item) => {
        const matchName = !searchKeyword
            ? true
            : (item.foodName || "")
                .toLowerCase()
                .includes(searchKeyword.toLowerCase());

        const matchCategory = !selectedCategoryId
            ? true
            : String(item.categoryId) === String(selectedCategoryId);

        return matchName && matchCategory;
    });

    // Delete
    const handleDelete = async (id) => {
        const ok = window.confirm("Bạn chắc chắn muốn xóa Thực Phẩm này?");
        if (!ok) return;

        try {
            setDeletingId(id);
            await FoodAPI.remove(id);

            setFoods((prev) => prev.filter((x) => String(x.id) !== String(id)));

            const remaining = filteredFoods.length - 1;
            const newTotalPages = Math.max(1, Math.ceil(remaining / pageSize));
            setCurrentPage((p) => Math.min(p, newTotalPages));
        } catch (e) {
            alert(e?.message || "Xóa thất bại");
        } finally {
            setDeletingId(null);
        }
    };

    const totalPages = Math.max(1, Math.ceil(filteredFoods.length / pageSize));
    const safePage = Math.min(currentPage, totalPages);
    const startIndex = (safePage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredFoods.length);
    const pagedFoods = filteredFoods.slice(startIndex, endIndex);
    const displayStart = filteredFoods.length === 0 ? 0 : startIndex + 1;

    if (selectedFood) {
        return (
            <FoodDetail phamacy={selectedFood} onBack={() => setSelectedFood(null)} />
        );
    }

    return (
        <div className="home-contentBox">
            <h3 style={{ padding: 16 }}>DANH SÁCH Thực Phẩm</h3>

            <div style={{ padding: "0 16px 16px" }}>
                <div style={{ marginBottom: 12 }}>
                    Loại:&nbsp;
                    <select
                        value={selectedCategoryId}
                        onChange={(e) => {
                            setSelectedCategoryId(e.target.value);
                            setCurrentPage(1);
                        }}
                        style={{ padding: "4px 8px", minWidth: 200 }}
                    >
                        <option value="">Tất cả</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name ?? c.categoryName ?? `Category #${c.id}`}
                            </option>
                        ))}
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
                    <button onClick={toAddpage}>Thêm Mới Thực Phẩm</button>
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
                        <span>Thực Phẩm</span>
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
                                    <th>Giá</th>
                                    <th>Nhà SX</th>
                                    <th></th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>

                            <tbody>
                                {pagedFoods.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{startIndex + index + 1}</td>
                                        <td>{item.code}</td>
                                        <td>{item.foodName}</td>
                                        <td>{item.categoryName}</td>
                                        <td>{item.price}</td>
                                        <td>{item.manufacturer}</td>
                                        <td></td>
                                        <td>
                                            <button onClick={() => navigate(`/food/${item.id}`)}>Xem Chi Tiết</button>{" "}
                                            <button onClick={() => navigate(`/edit-food/${item.id}`)}>
                                                Sửa
                                            </button>{" "}
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                disabled={deletingId === item.id}
                                            >
                                                {deletingId === item.id ? "Đang xóa..." : "Xóa"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {pagedFoods.length === 0 && (
                                    <tr>
                                        <td colSpan={10} style={{ textAlign: "center" }}>
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
                            Hiển thị từ {displayStart} đến {endIndex} trên {filteredFoods.length}{" "}
                            Thực Phẩm
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

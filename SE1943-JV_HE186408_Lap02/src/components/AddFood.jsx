import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FoodAPI from "../api/foodAPI";
import CategoryAPI from "../api/categoryAPI";

export default function AddFood() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    code: "",
    foodName: "",
    price: "",
    stock: "",
    expiredDate: "",
    manufacturer: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await CategoryAPI.getAll();
        if (!cancelled) setCategories(Array.isArray(data) ? data : []);
      } catch {
        // 
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSave = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const payload = {
        code: form.code.trim(),
        foodName: form.foodName.trim(),
        price: form.price === "" ? null : Number(form.price),
        stock: form.stock === "" ? null : Number(form.stock),
        expiredDate: form.expiredDate || null,
        manufacturer: form.manufacturer.trim(),
        categoryId: form.categoryId === "" ? null : Number(form.categoryId),
      };

      const created = await FoodAPI.create(payload); // không .data
      console.log("Created:", created);

      alert("Tạo Thực Phẩm thành công!");
      navigate("/manage-food", { replace: true });
    } catch (e2) {
      setError(e2?.response?.data?.message || e2?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  const row = {
    display: "flex",
    alignItems: "center",
    marginBottom: 12,
  };

  const label = {
    width: 120,
  };

  const input = {
    width: 260, // 🔥 input thẳng hàng
  };

  return (
    <div style={{ padding: 16 }}>
      <h3>Thêm Mới Thực Phẩm</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Saving...</p>}

      <form onSubmit={onSave}>
        <p style={row}>
          <b style={label}>Mã:</b>
          <input style={input} name="code" value={form.code} onChange={onChange} required />
        </p>

        <p style={row}>
          <b style={label}>Tên:</b>
          <input style={input} name="foodName" value={form.foodName} onChange={onChange} required />
        </p>

        <p style={row}>
          <b style={label}>Loại:</b>
          <select style={input} name="categoryId" value={form.categoryId} onChange={onChange}>
            <option value="">Chọn loại</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name ?? c.categoryName}</option>
            ))}
          </select>
        </p>

        <p style={row}>
          <b style={label}>Giá (đ):</b>
          <input style={input} type="number" name="price" value={form.price} onChange={onChange} />
        </p>

        <p style={row}>
          <b style={label}>Ngày hết hạn:</b>
          <input style={input} type="date" name="expiredDate" value={form.expiredDate} onChange={onChange} />
        </p>

        <p style={row}>
          <b style={label}>Số lượng (kg):</b>
          <input style={input} type="number" name="stock" value={form.stock} onChange={onChange} />
        </p>

        <p style={row}>
          <b style={label}>Nhà sản xuất:</b>
          <input style={input} name="manufacturer" value={form.manufacturer} onChange={onChange} />
        </p>


        <button type="submit" disabled={loading}>
          Lưu
        </button>
        &nbsp;
        <button type="button" onClick={() => navigate(-1)} disabled={loading}>
          Quay lại
        </button>
      </form>
    </div>
  );
}

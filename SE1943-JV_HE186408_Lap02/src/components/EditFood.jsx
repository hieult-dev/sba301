import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FoodAPI from "../api/foodAPI";
import CategoryAPI from "../api/categoryAPI";

export default function EditFood() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    id: "",
    code: "",
    foodName: "",
    price: "",
    stock: "",
    expiredDate: "",
    manufacturer: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchDetail() {
      try {
        setLoading(true);
        setError(null);

        const [data, cats] = await Promise.all([
          FoodAPI.getById(id),
          CategoryAPI.getAll(),
        ]);

        if (cancelled) return;

        setCategories(Array.isArray(cats) ? cats : []);

        setForm({
          id: data?.id ?? "",
          code: data?.code ?? "",
          foodName: data?.foodName ?? "",
          price: data?.price ?? "",
          stock: data?.stock ?? "",
          expiredDate: data?.expiredDate ? String(data.expiredDate).slice(0, 10) : "",
          manufacturer: data?.manufacturer ?? "",
          categoryId: data?.categoryId ?? "",
        });
      } catch (e) {
        if (!cancelled) setError(e?.message || "Load detail failed");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (id) fetchDetail();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSave = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError(null);

      const payload = {
        code: form.code.trim(),
        foodName: form.foodName.trim(),
        price: form.price === "" ? null : Number(form.price),
        stock: form.stock === "" ? null : Number(form.stock),
        expiredDate: form.expiredDate || null,
        manufacturer: form.manufacturer.trim(),
        categoryId: form.categoryId === "" ? null : Number(form.categoryId),
      };

      await FoodAPI.update(id, payload);

      alert("Cập nhật thành công!");
      navigate("/manage-food", { replace: true });
    } catch (e2) {
      setError(e2?.response?.data?.message || e2?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p style={{ padding: 16 }}>Loading...</p>;

  if (error && !saving) {
    return (
      <div style={{ padding: 16 }}>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  const row = {
    display: "flex",
    alignItems: "center",
    marginBottom: 12,
  };

  const label = {
    width: 140,
  };

  const input = {
    width: 280,
  };

  return (
    <div style={{ padding: 16 }}>
      <h3>Sửa Thông Tin Thực Phẩm</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {saving && <p>Saving...</p>}

      <form onSubmit={onSave}>
        <p style={row}>
          <b style={label}>Mã:</b>
          <input style={input} name="code" value={form.code} readOnly />
        </p>

        <p style={row}>
          <b style={label}>Tên thực phẩm:</b>
          <input
            style={input}
            name="foodName"
            value={form.foodName}
            onChange={onChange}
            required
          />
        </p>

        <p style={row}>
          <b style={label}>Loại:</b>
          <select
            style={input}
            name="categoryId"
            value={form.categoryId}
            onChange={onChange}
            required
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name ?? c.categoryName}
              </option>
            ))}
          </select>
        </p>

        <p style={row}>
          <b style={label}>Giá (đ):</b>
          <input
            style={input}
            type="number"
            name="price"
            value={form.price}
            onChange={onChange}
            min="0"
            step="0.01"
            required
          />
        </p>

        <p style={row}>
          <b style={label}>Ngày hết hạn:</b>
          <input
            style={input}
            type="date"
            name="expiredDate"
            value={form.expiredDate}
            onChange={onChange}
          />
        </p>

        <p style={row}>
          <b style={label}>Số lượng (kg):</b>
          <input
            style={input}
            type="number"
            name="stock"
            value={form.stock}
            onChange={onChange}
            min="0"
            required
          />
        </p>

        <p style={row}>
          <b style={label}>Nhà sản xuất:</b>
          <input
            style={input}
            name="manufacturer"
            value={form.manufacturer}
            onChange={onChange}
          />
        </p>

        <button type="submit" disabled={saving}>Lưu</button>
        &nbsp;
        <button type="button" onClick={() => navigate(-1)} disabled={saving}>
          Quay lại
        </button>
      </form>

    </div>
  );
}

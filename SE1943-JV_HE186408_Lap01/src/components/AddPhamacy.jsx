import { useState } from "react";
import { useNavigate } from "react-router-dom";
import phamacyApi from "../api/phamacyApi";

export default function AddPhymacy() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    code: "",
    name: "",
    type: "",
    price: "",
    usage: "",
    guide: "",
    manufacturer: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSave = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const payload = {
        code: form.code,
        name: form.name,
        type: form.type,
        price: form.price,
        cdung: form.usage,
        csudung: form.guide,
        nsanxuat: form.manufacturer,
      };

      const created = await phamacyApi.create(payload);
      console.log("Created:", created);

      alert("Tạo dược phẩm thành công!");
      navigate("/manage-phamacy");
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h3>Thêm Mới Dược Phẩm</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Saving...</p>}

      <form onSubmit={onSave}>
        <p>
          <b>Mã:</b><br />
          <input name="code" value={form.code} onChange={onChange} />
        </p>

        <p>
          <b>Tên:</b><br />
          <input name="name" value={form.name} onChange={onChange} required />
        </p>

        <p>
          <b>Loại:</b><br />
          <select name="type" value={form.type} onChange={onChange} required>
            <option value="">-- Chọn --</option>
            <option value="TPCN">Thực Phẩm Chức Năng</option>
            <option value="THUOC_KE_DON">Thuốc Kê Theo Đơn</option>
            <option value="THUOC_KHONG_KE_DON">Thuốc Không Kê Đơn</option>
          </select>
        </p>

        <p>
          <b>Giá:</b><br />
          <input name="price" value={form.price} onChange={onChange} />
        </p>

        <p>
          <b>Công dụng:</b><br />
          <textarea name="usage" value={form.usage} onChange={onChange} />
        </p>

        <p>
          <b>Hướng dẫn sử dụng:</b><br />
          <textarea name="guide" value={form.guide} onChange={onChange} />
        </p>

        <p>
          <b>Nhà sản xuất:</b><br />
          <input
            name="manufacturer"
            value={form.manufacturer}
            onChange={onChange}
          />
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

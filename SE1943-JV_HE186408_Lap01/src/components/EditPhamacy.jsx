import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import phamacyApi from "../api/phamacyApi";

export default function EditPhamacy() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    id: "",
    code: "",
    name: "",
    type: "",
    price: "",
    cdung: "",
    csudung: "",
    nsanxuat: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchDetail() {
      try {
        setLoading(true);
        setError(null);

        const data = await phamacyApi.getById(id);
        if (cancelled) return;

        setForm({
          id: data.id ?? "",
          code: data.code ?? String(data.id ?? ""),
          name: data.name ?? "",
          type: data.type ?? "",
          price: data.price ?? "",
          cdung: data.cdung ?? "",
          csudung: data.csudung ?? "",
          nsanxuat: data.nsanxuat ?? "",
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
        code: form.code,
        name: form.name,
        type: form.type,
        price: form.price,
        cdung: form.cdung,
        csudung: form.csudung,
        nsanxuat: form.nsanxuat,
      };

      await phamacyApi.update(id, payload);

      alert("Cập nhật thành công!");
      navigate("/manage-phamacy");
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Update failed");
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

  return (
    <div style={{ padding: 16 }}>
      <h3>Sửa Thông Tin Dược Phẩm</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {saving && <p>Saving...</p>}

      <form onSubmit={onSave}>
        <p>
          <b>Mã:</b><br />
          <input name="code" value={form.code} readOnly />
        </p>

        <p>
          <b>Tên:</b><br />
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            required
          />
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
          <input
            name="price"
            value={form.price}
            onChange={onChange}
            inputMode="numeric"
          />
        </p>

        <p>
          <b>Công dụng:</b><br />
          <textarea name="cdung" value={form.cdung} onChange={onChange} />
        </p>

        <p>
          <b>Hướng dẫn sử dụng:</b><br />
          <textarea name="csudung" value={form.csudung} onChange={onChange} />
        </p>

        <p>
          <b>Nhà sản xuất:</b><br />
          <input
            name="nsanxuat"
            value={form.nsanxuat}
            onChange={onChange}
          />
        </p>

        <button type="submit" disabled={saving}>
          Lưu
        </button>
        &nbsp;
        <button type="button" onClick={() => navigate(-1)} disabled={saving}>
          Quay lại
        </button>
      </form>
    </div>
  );
}

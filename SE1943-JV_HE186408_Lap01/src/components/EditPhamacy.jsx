import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function EditPhamacy() {
    const navigate = useNavigate()
    const location = useLocation()
    const passed = location.state?.phamacy

    const [form, setForm] = useState({
        id: "",
        code: "",
        name: "",
        type: "",
        price: "",
        cdung: "",
        csudung: "",
        nsanxuat: "",
    })

    useEffect(() => {
        if (!passed) return

        setForm({
            id: passed.id ?? "",
            code: passed.code ?? String(passed.id ?? ""),
            name: passed.name ?? "",
            type: passed.type ?? "",
            price: passed.price ?? "",
            cdung: passed.cdung ?? "",
            csudung: passed.csudung ?? "",
            nsanxuat: passed.nsanxuat ?? "",
        })
    }, [passed])

    const onChange = () => {

    }

    const onSave = () => {
    }

    if (!passed) {
        return (
            <div style={{ padding: 24 }}>
                <b>Không có dữ liệu để sửa.</b>
                <div style={{ marginTop: 12 }}>
                    <button onClick={() => navigate(-1)}>Quay lại</button>
                </div>
            </div>
        )
    }

    return (
        <div style={{ minHeight: "100vh", paddingTop: 24 }}>

            <form
                onSubmit={onSave}
                style={{
                    width: 860,
                    background: "#fff",
                }}
            >
                <h3 style={{ marginBottom: 18, textAlign: "center", }}>Sửa Thông Tin Dược Phẩm</h3>

                <div style={row}>
                    <label style={label}>Mã:</label>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <input
                            name="code"
                            value={form.code}
                            readOnly
                            style={{ ...input, width: 280, background: "#f2f2f2" }}
                        />
                    </div>
                </div>

                <div style={row}>
                    <label style={label}>Tên:</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        style={{ ...input, width: 520 }}
                        placeholder="<Tên Dược Phẩm>"
                        required
                    />
                </div>

                <div style={row}>
                    <label style={label}>Loại:</label>
                    <select
                        name="type"
                        value={form.type}
                        onChange={onChange}
                        style={{ ...input, width: 520 }}
                        required
                    >
                        <option value="">Danh sách (chọn)</option>
                        <option value="TPCN">Thực Phẩm Chức Năng</option>
                        <option value="THUOC_KE_DON">Thuốc Kê Theo Đơn</option>
                        <option value="THUOC_KHONG_KE_DON">Thuốc Không Kê Đơn</option>
                    </select>
                </div>

                <div style={row}>
                    <label style={label}>Giá (đ):</label>
                    <input
                        name="price"
                        value={form.price}
                        onChange={onChange}
                        style={{ ...input, width: 260 }}
                        inputMode="numeric"
                    />
                </div>

                <div style={rowTop}>
                    <label style={labelTop}>Công dụng:</label>
                    <textarea
                        name="cdung"
                        value={form.cdung}
                        onChange={onChange}
                        style={textarea}
                    />
                </div>

                <div style={rowTop}>
                    <label style={labelTop}>Hướng dẫn sử dụng:</label>
                    <textarea
                        name="csudung"
                        value={form.csudung}
                        onChange={onChange}
                        style={textarea}
                    />
                </div>

                <div style={row}>
                    <label style={label}>Nhà Sản Xuất:</label>
                    <input
                        name="nsanxuat"
                        value={form.nsanxuat}
                        onChange={onChange}
                        style={{ ...input, width: 520 }}
                    />
                </div>

                <div style={{ display: "flex", justifyContent: "center", gap: 26, marginTop: 26 }}>
                    <button type="submit" style={btnPrimary}>Save</button>
                    <button type="button" style={btnSecondary} onClick={() => navigate(-1)}>
                        Quay Lại
                    </button>
                </div>
            </form>
        </div>
    )
}

const row = {
    display: "grid",
    gridTemplateColumns: "170px 1fr",
    gap: 12,
    marginBottom: 14,
    alignItems: "center",
}

const rowTop = {
    display: "grid",
    gridTemplateColumns: "170px 1fr",
    gap: 12,
    marginBottom: 14,
    alignItems: "start",
}

const label = { textAlign: "right" }
const labelTop = { textAlign: "right", paddingTop: 6 }

const input = {
    height: 34,
    border: "1.5px solid #000",
    padding: "0 10px",
    outline: "none",
}

const textarea = {
    minHeight: 70,
    border: "1.5px solid #000",
    padding: 10,
    outline: "none",
    resize: "vertical",
    width: 520,
}

const btnPrimary = {
    minWidth: 160,
    height: 40,
    border: "2px solid #2b6cb0",
    background: "#e6f0ff",
    fontWeight: 600,
    cursor: "pointer",
}

const btnSecondary = {
    minWidth: 160,
    height: 40,
    border: "2px solid #2b6cb0",
    background: "#f2f2f2",
    fontWeight: 600,
    cursor: "pointer",
}

import { useState } from "react"

export default function AddPhymacy({ onBack }) {
    const [form,] = useState({
        code: "",
        name: "",
        type: "",
        price: "",
        usage: "",
        guide: "",
        manufacturer: "",
    })

    const onChange = () => {
    }

    const onSave = () => {
    }

    return (
        <div style={{ minHeight: "100vh", paddingTop: 40 }}>
            <form
                onSubmit={onSave}
                style={{
                    width: 760,
                    background: "#fff",
                }}
            >
                <h3 style={{ textAlign: "center", marginBottom: 24 }}>
                    Thêm Mới Dược Phẩm
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 12, marginBottom: 14, alignItems: "center" }}>
                    <div style={{ textAlign: "right" }}>Mã:</div>
                    <input
                        name="code"
                        value={form.code}
                        onChange={onChange}
                        style={inputStyle}
                        placeholder=""
                    />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 12, marginBottom: 14, alignItems: "center" }}>
                    <div style={{ textAlign: "right" }}>Tên:</div>
                    <input
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        style={inputStyle}
                        placeholder="<Tên Dược Phẩm>"
                        required
                    />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 12, marginBottom: 14, alignItems: "center" }}>
                    <div style={{ textAlign: "right" }}>Loại:</div>
                    <select
                        name="type"
                        value={form.type}
                        onChange={onChange}
                        style={inputStyle}
                        required
                    >
                        <option value="">Danh sách (chọn)</option>
                        <option value="TPCN">Thực Phẩm Chức Năng</option>
                        <option value="THUOC_KE_DON">Thuốc Kê Theo Đơn</option>
                        <option value="THUOC_KHONG_KE_DON">Thuốc Không Kê Đơn</option>
                    </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "140px 160px 1fr", gap: 12, marginBottom: 14, alignItems: "center" }}>
                    <div style={{ textAlign: "right" }}>Giá (đ):</div>
                    <input
                        name="price"
                        value={form.price}
                        onChange={onChange}
                        style={{ ...inputStyle, width: 160 }}
                        placeholder=""
                        inputMode="numeric"
                    />
                    <div />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 12, marginBottom: 14, alignItems: "start" }}>
                    <div style={{ textAlign: "right", paddingTop: 6 }}>Công dụng:</div>
                    <textarea
                        name="usage"
                        value={form.usage}
                        onChange={onChange}
                        style={textareaStyle}
                    />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 12, marginBottom: 14, alignItems: "start" }}>
                    <div style={{ textAlign: "right", paddingTop: 6 }}>Hướng dẫn sử dụng:</div>
                    <textarea
                        name="guide"
                        value={form.guide}
                        onChange={onChange}
                        style={textareaStyle}
                    />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 12, marginBottom: 26, alignItems: "center" }}>
                    <div style={{ textAlign: "right" }}>Nhà Sản Xuất:</div>
                    <input
                        name="manufacturer"
                        value={form.manufacturer}
                        onChange={onChange}
                        style={inputStyle}
                    />
                </div>

                <div style={{ display: "flex", justifyContent: "center", gap: 26 }}>
                    <button type="submit" style={btnPrimary}>
                        Save
                    </button>

                    <button
                        type="button"
                        style={btnSecondary}
                        onClick={() => {
                            if (onBack) onBack()
                            else window.history.back()
                        }}
                    >
                        Quay Lại
                    </button>
                </div>
            </form>
        </div>
    )
}

const inputStyle = {
    height: 36,
    border: "1.5px solid #000",
    padding: "0 10px",
    outline: "none",
}

const textareaStyle = {
    minHeight: 70,
    border: "1.5px solid #000",
    padding: 10,
    outline: "none",
    resize: "vertical",
}

const btnPrimary = {
    minWidth: 200,
    height: 40,
    border: "2px solid #2b6cb0",
    background: "#e6f0ff",
    fontWeight: 600,
    cursor: "pointer",
}

const btnSecondary = {
    minWidth: 200,
    height: 40,
    border: "2px solid #2b6cb0",
    background: "#f2f2f2",
    fontWeight: 600,
    cursor: "pointer",
}

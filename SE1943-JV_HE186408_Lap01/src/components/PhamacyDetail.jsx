export default function PhamacyDetail({ phamacy, onBack }) {
    return (
        <div className="home-contentBox" style={{ padding: 16 }}>
            <h3>Thông tin chi tiết</h3>

            <div style={{ marginTop: 16 }}>
                <p><b>ID:</b> {phamacy.id}</p>
                <p><b>Loại:</b> {phamacy.type}</p>
                <p><b>Giá:</b> {phamacy.price}</p>
                <p><b>Công Dụng:</b> {phamacy.cdung}</p>
                <p><b>Cách Sử Dụng:</b> {phamacy.csudung}</p>
                <p><b>Nhà Sản Xuất:</b> {phamacy.nsanxuat}</p>
            </div>

            <button onClick={onBack} style={{ marginTop: 20 }}>
                Quay lại
            </button>
        </div>
    );
}
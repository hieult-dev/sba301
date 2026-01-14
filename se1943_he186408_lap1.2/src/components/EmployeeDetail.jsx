export default function EmployeeDetail({ employee, onBack }) {
    return (
        <div className="home-contentBox" style={{ padding: 16 }}>
            <h3>CHI TIẾT NHÂN VIÊN</h3>

            <div style={{ marginTop: 16 }}>
                <p><b>ID:</b> {employee.id}</p>
                <p><b>Email:</b> {employee.email}</p>
                <p><b>Tên:</b> {employee.name}</p>
                <p><b>Địa chỉ:</b> {employee.address}</p>
                <p><b>Điện thoại:</b> {employee.phone}</p>
                <p><b>Lương:</b> {employee.salary}</p>
            </div>

            <button onClick={onBack} style={{ marginTop: 20 }}>
                ← Quay lại danh sách
            </button>
        </div>
    );
}
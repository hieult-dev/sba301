export default function AgentDetail({ agent, onBack }) {
    return (
        <div className="home-contentBox" style={{ padding: 16 }}>
            <h3>CHI TIẾT ĐẠI LÝ</h3>

            <div style={{ marginTop: 16 }}>
                <p><b>ID:</b> {agent.id}</p>
                <p><b>Email:</b> {agent.email}</p>
                <p><b>Tên đại lý:</b> {agent.name}</p>
                <p><b>Địa chỉ:</b> {agent.address}</p>
                <p><b>Trạng thái:</b> {agent.status}</p>
                <p><b>Ngày đăng ký:</b> {agent.date}</p>
                <p><b>Số dư:</b> {agent.balance}</p>
            </div>

            <button onClick={onBack} style={{ marginTop: 20 }}>
                ← Quay lại danh sách
            </button>
        </div>
    );
}
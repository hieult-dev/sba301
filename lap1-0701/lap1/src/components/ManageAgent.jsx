import { useState } from "react";
import AgentDetail from "../components/AgentDetail";

export default function ManageAgent() {
    // ===== DATA GIẢ =====
    const agents = [
        {
            id: 1,
            email: "thanhnv@gmail.com",
            name: "Nguyễn Văn Thanh",
            address: "Xuân Đỉnh",
            status: "Mới",
            date: "20-01-2015",
            balance: 33000,
        },
        {
            id: 2,
            email: "anhnt@gmail.com",
            name: "Nguyễn Thị Anh",
            address: "Cầu Giấy",
            status: "Hoạt động",
            date: "22-01-2015",
            balance: 50000,
        },
        {
            id: 3,
            email: "hoanglm@gmail.com",
            name: "Lê Minh Hoàng",
            address: "Hà Đông",
            status: "Khóa",
            date: "25-01-2015",
            balance: 12000,
        },
        {
            id: 4,
            email: "linhpt@gmail.com",
            name: "Phạm Thị Linh",
            address: "Long Biên",
            status: "Mới",
            date: "28-01-2015",
            balance: 9000,
        },
        {
            id: 5,
            email: "sonnv@gmail.com",
            name: "Nguyễn Văn Sơn",
            address: "Thanh Xuân",
            status: "Hoạt động",
            date: "30-01-2015",
            balance: 76000,
        },
    ];

    // ===== STATE =====
    const [selectedAgent, setSelectedAgent] = useState(null);

    // ===== NẾU ĐANG XEM CHI TIẾT =====
    // set bằng null thì không vào điệu kiện return này
    if (selectedAgent) {
        return (
            <AgentDetail
                agent={selectedAgent}
                onBack={() => setSelectedAgent(null)}
            />
        );
    }

    // ===== LIST =====
    return (
        <div className="home-contentBox">
            <h3 style={{ padding: 16 }}>DANH SÁCH ĐẠI LÝ</h3>

            <div style={{ padding: "0 16px 16px" }}>
                {/* FILTER (chưa logic) */}
                <div style={{ marginBottom: 12 }}>
                    Tài khoản: <input />
                    &nbsp;&nbsp;&nbsp;
                    Trạng thái:
                    <select>
                        <option>All</option>
                        <option>Mới</option>
                        <option>Hoạt động</option>
                        <option>Khóa</option>
                    </select>
                </div>

                <div style={{ marginBottom: 16 }}>
                    Tên Đại Lý: <input style={{ width: 300 }} />
                    &nbsp;&nbsp;&nbsp;
                    <button>Tìm Đại Lý</button>
                </div>

                {/* TABLE */}
                <table border="1" width="100%" cellPadding="6">
                    <thead>
                        <tr style={{ background: "#8faadc" }}>
                            <th>STT</th>
                            <th>Email</th>
                            <th>Tên Đại Lý</th>
                            <th>Địa Chỉ</th>
                            <th>Trạng Thái</th>
                            <th>Ngày Đăng Ký</th>
                            <th>Số Dư</th>
                            <th>Chi Tiết</th>
                        </tr>
                    </thead>

                    <tbody>
                        {agents.map((agent, index) => (
                            <tr key={agent.id}>
                                <td>{index + 1}</td>
                                <td>{agent.email}</td>
                                <td>{agent.name}</td>
                                <td>{agent.address}</td>
                                <td>{agent.status}</td>
                                <td>{agent.date}</td>
                                <td>{agent.balance}</td>
                                <td>
                                    <button onClick={() => setSelectedAgent(agent)}>
                                        Xem Chi Tiết
                                    </button>
                                </td>
                            </tr>
                        ))}
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
                    Hiển thị từ 1 đến {agents.length} trên {agents.length} đại lý
                </div>
            </div>
        </div>
    );
}

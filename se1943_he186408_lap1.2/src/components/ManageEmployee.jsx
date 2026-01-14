import { useState } from "react";
import EmployeeDetail from "./EmployeeDetail";

export default function ManageEmployee() {
    // ===== DATA GIẢ =====
    const employees = [
        {
            id: 1,
            email: "thanhnv@gmail.com",
            name: "Nguyễn Văn Thanh",
            address: "Xuân Đỉnh",
            phone: "0987654321",
            salary: 33000,
        },
        {
            id: 2,
            email: "thanhnv@gmail.com",
            name: "Nguyễn Văn Thanh",
            address: "Xuân Đỉnh",
            phone: "0987654321",
            salary: 33000,
        },
        {
            id: 3,
            email: "thanhnv@gmail.com",
            name: "Nguyễn Văn Thanh",
            address: "Xuân Đỉnh",
            phone: "0987654321",
            salary: 33000,
        },
        {
            id: 4,
            email: "thanhnv@gmail.com",
            name: "Nguyễn Văn Thanh",
            address: "Xuân Đỉnh",
            phone: "0987654321",
            salary: 33000,
        },
        {
            id: 5,
            email: "thanhnv@gmail.com",
            name: "Nguyễn Văn Thanh",
            address: "Xuân Đỉnh",
            phone: "0987654321",
            salary: 33000,
        },
        {
            id: 6,
            email: "thanhnv@gmail.com",
            name: "Nguyễn Văn Thanh",
            address: "Xuân Đỉnh",
            phone: "0987654321",
            salary: 33000,
        },
        {
            id: 7,
            email: "thanhnv@gmail.com",
            name: "Nguyễn Văn Thanh",
            address: "Xuân Đỉnh",
            phone: "0987654321",
            salary: 33000,
        },
        {
            id: 8,
            email: "thanhnv@gmail.com",
            name: "Nguyễn Văn Thanh",
            address: "Xuân Đỉnh",
            phone: "0987654321",
            salary: 33000,
        },
        {
            id: 9,
            email: "thanhnv@gmail.com",
            name: "Nguyễn Văn Thanh",
            address: "Xuân Đỉnh",
            phone: "0987654321",
            salary: 33000,
        },
        {
            id: 10,
            email: "thanhnv@gmail.com",
            name: "Nguyễn Văn Thanh",
            address: "Xuân Đỉnh",
            phone: "0987654321",
            salary: 33000,
        },
        {
            id: 11,
            email: "thanhnv@gmail.com",
            name: "Nguyễn Văn Thanh",
            address: "Xuân Đỉnh",
            phone: "0987654321",
            salary: 33000,
        },
    ];

    // ===== STATE =====
    const [selectedEmployee, setselectedEmployee] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const totalPages = Math.max(1, Math.ceil(employees.length / pageSize));
    const safePage = Math.min(currentPage, totalPages);
    const startIndex = (safePage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, employees.length);
    const pagedEmployees = employees.slice(startIndex, endIndex);
    const displayStart = employees.length === 0 ? 0 : startIndex + 1;
    // ===== NẾU ĐANG XEM CHI TIẾT =====
    // set bằng null thì không vào điệu kiện return này
    if (selectedEmployee) {
        return (
            <EmployeeDetail
                employee={selectedEmployee}
                onBack={() => setselectedEmployee(null)}
            />
        );
    }

    // ===== LIST =====
    return (
        <div className="home-contentBox">
            <h3 style={{ padding: 16 }}>DANH SÁCH NHÂN VIÊN</h3>

            <div style={{ padding: "0 16px 16px" }}>
                {/* FILTER (chưa logic) */}
                <div style={{ marginBottom: 12 }}>
                    Email: <input />
                    &nbsp;&nbsp;&nbsp;
                </div>

                <div style={{ marginBottom: 16 }}>
                    Tên: <input style={{ width: 300 }} />
                    &nbsp;&nbsp;&nbsp;
                    <button>Tìm nhân viên</button>
                </div>

                {/* HIỂN THỊ + PAGINATION */}
                <div
                    style={{
                        marginTop: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <b>Hiển thị:</b>
                        <select defaultValue="10" style={{ width: 60 }}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                        <span>Đại lý</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={safePage === 1}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() =>
                                setCurrentPage((p) => Math.min(totalPages, p + 1))
                            }
                            disabled={safePage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>

                {/* TABLE */}
                <table border="1" width="100%" cellPadding="6">
                    <thead>
                        <tr style={{ background: "#8faadc" }}>
                            <th>STT</th>
                            <th>Email</th>
                            <th>Tên</th>
                            <th>Địa Chỉ</th>
                            <th>Điện thoại</th>
                            <th>Lương</th>
                            <th>Chi Tiết</th>
                        </tr>
                    </thead>

                    <tbody>
                        {pagedEmployees.map((employee, index) => (
                            <tr key={employee.id}>
                                <td>{index + 1}</td>
                                <td>{employee.email}</td>
                                <td>{employee.name}</td>
                                <td>{employee.address}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.salary}</td>
                                <td>
                                    <button onClick={() => setselectedEmployee(employee)}>
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
                    Hiển thị từ {displayStart} đến {endIndex} trên {employees.length} nhân viên
                </div>
            </div>
        </div>
    );
}

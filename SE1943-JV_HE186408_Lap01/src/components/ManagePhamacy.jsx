import { useState } from "react";
import PhamacyDetail from "./PhamacyDetail";
import { useNavigate } from "react-router-dom"


export default function ManagePhamacy() {
    const navigate = useNavigate()

    const phamacy = [
        {
            id: 1,
            name: "Paracetamol 500mg",
            type: "Thuốc không kê đơn",
            phone: "0901000001",
            price: "25.000",
            cdung: "Giảm đau, hạ sốt",
            csudung: "Uống sau ăn",
            nsanxuat: "Công ty Dược ABC"
        },
        {
            id: 2,
            name: "Ibuprofen 400mg",
            type: "Thuốc không kê đơn",
            phone: "0901000002",
            price: "35.000",
            cdung: "Giảm đau, chống viêm",
            csudung: "Uống sau ăn",
            nsanxuat: "Công ty Dược DEF"
        },
        {
            id: 3,
            name: "Vitamin C 500mg",
            type: "Thực phẩm chức năng",
            phone: "0901000003",
            price: "45.000",
            cdung: "Tăng sức đề kháng",
            csudung: "Uống buổi sáng",
            nsanxuat: "Công ty Dược XYZ"
        },
        {
            id: 4,
            name: "Amoxicillin 500mg",
            type: "Thuốc kê đơn",
            phone: "0901000004",
            price: "60.000",
            cdung: "Điều trị nhiễm khuẩn",
            csudung: "Uống theo chỉ định bác sĩ",
            nsanxuat: "Công ty Dược ABC"
        },
        {
            id: 5,
            name: "Panadol Extra",
            type: "Thuốc không kê đơn",
            phone: "0901000005",
            price: "30.000",
            cdung: "Giảm đau đầu, đau răng",
            csudung: "Uống khi đau",
            nsanxuat: "Công ty Dược GSK"
        },
        {
            id: 6,
            name: "Bổ Gan Boganic",
            type: "Thực phẩm chức năng",
            phone: "0901000006",
            price: "95.000",
            cdung: "Hỗ trợ chức năng gan",
            csudung: "Uống 2 lần/ngày",
            nsanxuat: "Công ty Dược Traphaco"
        },
        {
            id: 7,
            name: "Efferalgan 500mg",
            type: "Thuốc không kê đơn",
            phone: "0901000007",
            price: "40.000",
            cdung: "Hạ sốt, giảm đau",
            csudung: "Hòa tan với nước",
            nsanxuat: "Công ty UPSA"
        },
        {
            id: 8,
            name: "Smecta",
            type: "Thuốc không kê đơn",
            phone: "0901000008",
            price: "50.000",
            cdung: "Điều trị tiêu chảy",
            csudung: "Pha với nước uống",
            nsanxuat: "Công ty Ipsen"
        },
        {
            id: 9,
            name: "Alpha Choay",
            type: "Thuốc kê đơn",
            phone: "0901000009",
            price: "110.000",
            cdung: "Giảm phù nề, kháng viêm",
            csudung: "Uống trước ăn",
            nsanxuat: "Công ty Sanofi"
        },
        {
            id: 10,
            name: "Oresol",
            type: "Thuốc không kê đơn",
            phone: "0901000010",
            price: "15.000",
            cdung: "Bù nước và điện giải",
            csudung: "Pha đúng liều lượng",
            nsanxuat: "Công ty Dược OPC"
        },
        {
            id: 11,
            name: "Hoạt Huyết Dưỡng Não",
            type: "Thực phẩm chức năng",
            phone: "0901000011",
            price: "120.000",
            cdung: "Tăng cường tuần hoàn não",
            csudung: "Uống 2 lần/ngày",
            nsanxuat: "Công ty Dược Traphaco"
        },
        {
            id: 12,
            name: "Clorpheniramin",
            type: "Thuốc không kê đơn",
            phone: "0901000012",
            price: "20.000",
            cdung: "Giảm dị ứng, sổ mũi",
            csudung: "Uống buổi tối",
            nsanxuat: "Công ty Dược Hà Tây"
        }
    ];

    const toAddpage = () => {
        navigate("/add-phamacy")

    }
    const [selectedPhamacy, setselectedPhamacy] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const totalPages = Math.max(1, Math.ceil(phamacy.length / pageSize));
    const safePage = Math.min(currentPage, totalPages);
    const startIndex = (safePage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, phamacy.length);
    const pagedPhamacy = phamacy.slice(startIndex, endIndex);
    const displayStart = phamacy.length === 0 ? 0 : startIndex + 1;
    if (selectedPhamacy) {
        return (
            <PhamacyDetail
                phamacy={selectedPhamacy}
                onBack={() => setselectedPhamacy(null)}
            />
        );
    }

    return (
        <div className="home-contentBox">
            <h3 style={{ padding: 16 }}>DANH SÁCH DƯỢC PHẨM</h3>

            <div style={{ padding: "0 16px 16px" }}>
                <div style={{ marginBottom: 12 }}>
                    Loại:&nbsp;
                    <select
                        name="type"
                        style={{ padding: "4px 8px", minWidth: 200 }}
                    >
                        <option value="">Chọn loại</option>
                        <option value="TPCN">Thực Phẩm Chức Năng</option>
                        <option value="THUOC_KE_DON">Thuốc Kê Theo Đơn</option>
                        <option value="THUOC_KHONG_KE_DON">Thuốc Không Kê Đơn</option>
                    </select>
                </div>

                <div style={{ marginBottom: 16 }}>
                    Tên: <input style={{ width: 300 }} />
                    &nbsp;&nbsp;&nbsp;
                    <button>Tìm</button>
                    <button onClick={toAddpage}>Thêm Mới Dược Phẩm</button>
                </div>

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
                        <span>Dược phẩm</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={safePage === 1}
                        >
                            Trước
                        </button>
                        <button
                            onClick={() =>
                                setCurrentPage((p) => Math.min(totalPages, p + 1))
                            }
                            disabled={safePage === totalPages}
                        >
                            Sau
                        </button>
                    </div>
                </div>

                <table border="1" width="100%" cellPadding="6">
                    <thead>
                        <tr style={{ background: "#8faadc" }}>
                            <th>STT</th>
                            <th>Mã</th>
                            <th>Tên</th>
                            <th>Loại</th>
                            <th>Công dụng</th>
                            <th>Nhà SX</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {pagedPhamacy.map((phamacy, index) => (
                            <tr key={phamacy.id}>
                                <td>{index + 1}</td>
                                <td>{phamacy.id}</td>
                                <td>{phamacy.name}</td>
                                <td>{phamacy.type}</td>
                                <td>{phamacy.cdung}</td>
                                <td>{phamacy.nsanxuat}</td>
                                <td></td>
                                <td>
                                    <button onClick={() => setselectedPhamacy(phamacy)}>
                                        Xem Chi Tiết
                                    </button>
                                    <button onClick={() => navigate("/edit-phamacy", { state: { phamacy } })}>
                                        Sửa
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
                    Hiển thị từ {displayStart} đến {endIndex} trên {phamacy.length} dược phẩm
                </div>
            </div>
        </div>
    );
}

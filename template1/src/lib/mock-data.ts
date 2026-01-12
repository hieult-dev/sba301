export interface Spa {
  id: string
  name: string
  description: string
  address: string
  lat: number
  lng: number
  rating: number
  reviews: number
  image: string
  services: string[]
  priceRange: string
  phone: string
  hours: string
  featured: boolean
}

export const mockSpas: Spa[] = [
  {
    id: "1",
    name: "PawSpa Premium",
    description: "Spa thú cưng cao cấp với dịch vụ grooming chuyên nghiệp và không gian hiện đại",
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    lat: 10.7769,
    lng: 106.7009,
    rating: 4.8,
    reviews: 234,
    image: "/luxury-pet-spa.png",
    services: ["Cắt Tỉa Lông", "Tắm & Vệ Sinh", "Spa Thư Giãn", "Chăm Sóc Răng"],
    priceRange: "500.000 - 2.000.000đ",
    phone: "0901234567",
    hours: "8:00 - 20:00",
    featured: true,
  },
  {
    id: "2",
    name: "Pet Paradise Spa",
    description: "Thiên đường cho thú cưng với dịch vụ massage và chăm sóc toàn diện",
    address: "456 Lê Lợi, Quận 3, TP.HCM",
    lat: 10.7756,
    lng: 106.6919,
    rating: 4.9,
    reviews: 189,
    image: "/modern-pet-grooming-salon.png",
    services: ["Spa Thư Giãn", "Massage", "Nhuộm Tạo Màu", "Chụp Ảnh"],
    priceRange: "400.000 - 1.500.000đ",
    phone: "0902345678",
    hours: "7:30 - 19:30",
    featured: true,
  },
  {
    id: "3",
    name: "Happy Paws Grooming",
    description: "Dịch vụ cắt tỉa và chăm sóc lông chuyên nghiệp cho mọi giống chó mèo",
    address: "789 Trần Hưng Đạo, Quận 5, TP.HCM",
    lat: 10.7545,
    lng: 106.6762,
    rating: 4.7,
    reviews: 156,
    image: "/pet-grooming-station.jpg",
    services: ["Cắt Tỉa Lông", "Tắm & Vệ Sinh", "Chăm Sóc Răng"],
    priceRange: "300.000 - 1.000.000đ",
    phone: "0903456789",
    hours: "8:30 - 18:30",
    featured: true,
  },
  {
    id: "4",
    name: "Royal Pet Spa & Hotel",
    description: "Kết hợp spa và khách sạn thú cưng 5 sao với tiện nghi đầy đủ",
    address: "321 Võ Văn Tần, Quận 3, TP.HCM",
    lat: 10.7813,
    lng: 106.6925,
    rating: 4.9,
    reviews: 298,
    image: "/luxury-pet-hotel-lobby.jpg",
    services: ["Cắt Tỉa Lông", "Spa Thư Giãn", "Khách Sạn", "Chụp Ảnh"],
    priceRange: "600.000 - 3.000.000đ",
    phone: "0904567890",
    hours: "24/7",
    featured: false,
  },
  {
    id: "5",
    name: "Fluffy Cloud Spa",
    description: "Chuyên về chăm sóc lông mượt và tạo kiểu cho giống chó lông dài",
    address: "654 Hai Bà Trưng, Quận 1, TP.HCM",
    lat: 10.7855,
    lng: 106.7035,
    rating: 4.6,
    reviews: 127,
    image: "/fluffy-dog-grooming.jpg",
    services: ["Cắt Tỉa Lông", "Tắm & Vệ Sinh", "Nhuộm Tạo Màu"],
    priceRange: "350.000 - 1.200.000đ",
    phone: "0905678901",
    hours: "9:00 - 19:00",
    featured: false,
  },
  {
    id: "6",
    name: "Zen Pet Wellness",
    description: "Tập trung vào sức khỏe và thư giãn với liệu pháp tự nhiên",
    address: "987 Nguyễn Trãi, Quận 5, TP.HCM",
    lat: 10.7599,
    lng: 106.6728,
    rating: 4.8,
    reviews: 203,
    image: "/zen-pet-spa-relaxation.jpg",
    services: ["Spa Thư Giãn", "Massage", "Chăm Sóc Răng", "Tắm & Vệ Sinh"],
    priceRange: "400.000 - 1.800.000đ",
    phone: "0906789012",
    hours: "8:00 - 20:00",
    featured: false,
  },
]

export const serviceCategories = [
  "Tất Cả",
  "Cắt Tỉa Lông",
  "Tắm & Vệ Sinh",
  "Spa Thư Giãn",
  "Chăm Sóc Răng",
  "Massage",
  "Nhuộm Tạo Màu",
  "Chụp Ảnh",
  "Khách Sạn",
]

import { Navigation } from "./components/navigation"
import { SearchBar } from "./components/search-bar"
import { ServiceFilter } from "./components/service-filter"
import { SpaCard } from "./components/spa-card"
import { InteractiveMap } from "./components/interactive-map"
import { Button } from "./components/ui/button"
import { mockSpas, serviceCategories, type Spa } from "./lib/mock-data"
import { useState, useMemo } from "react"
import { MapPin, Star, TrendingUp } from "lucide-react"

function App() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedService, setSelectedService] = useState("Tất Cả")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | undefined>()
  const [selectedSpa, setSelectedSpa] = useState<Spa | null>(null)

  const handleUseLocation = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (error) => {
        console.error("Error getting location:", error)
        alert("Không thể lấy vị trí của bạn. Vui lòng cho phép truy cập vị trí.")
      },
    )
  }

  const filteredSpas = useMemo(() => {
    return mockSpas.filter((spa) => {
      const matchesSearch =
        searchQuery === "" ||
        spa.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spa.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spa.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesService = selectedService === "Tất Cả" || spa.services.includes(selectedService)
      return matchesSearch && matchesService
    })
  }, [searchQuery, selectedService])

  const featuredSpas = mockSpas.filter((spa) => spa.featured)

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              Tìm Spa Thú Cưng Tốt Nhất Gần Bạn
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed max-w-2xl mx-auto">
              Kết nối với hàng trăm spa thú cưng uy tín, so sánh dịch vụ và đặt lịch ngay lập tức
            </p>

            <div className="pt-6">
              <SearchBar onSearch={setSearchQuery} onUseLocation={handleUseLocation} />
            </div>

            <div className="flex items-center justify-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{mockSpas.length}+</div>
                <div className="text-sm text-muted-foreground">Spa Thú Cưng</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Đánh Giá</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4.8★</div>
                <div className="text-sm text-muted-foreground">Trung Bình</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Filter */}
      <section className="py-8 border-b border-border bg-background sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <ServiceFilter
            services={serviceCategories}
            selectedService={selectedService}
            onSelectService={setSelectedService}
          />
        </div>
      </section>

      {/* Featured Spas */}
      <section id="featured" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Star className="h-6 w-6 text-primary fill-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">Spa Nổi Bật</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSpas.map((spa) => (
              <SpaCard key={spa.id} spa={spa} onViewDetails={setSelectedSpa} />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section id="map" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="h-6 w-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">Bản Đồ Spa</h2>
          </div>

          <InteractiveMap spas={filteredSpas} onSpaSelect={setSelectedSpa} userLocation={userLocation} />
        </div>
      </section>

      {/* All Spas */}
      <section id="spas" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">Tất Cả Spa ({filteredSpas.length})</h2>
          </div>
          {filteredSpas.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSpas.map((spa) => (
                <SpaCard key={spa.id} spa={spa} onViewDetails={setSelectedSpa} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">Không tìm thấy spa phù hợp với tiêu chí của bạn</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Bạn Là Chủ Spa Thú Cưng?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-pretty opacity-90 leading-relaxed">
            Đăng ký ngay để tiếp cận hàng ngàn khách hàng tiềm năng và phát triển doanh nghiệp của bạn
          </p>
          <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
            Đăng Ký Spa Của Bạn
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-3xl">🐾</div>
                <span className="text-2xl font-bold text-primary">PetSpaHub</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Nền tảng kết nối spa thú cưng và người yêu thú cưng hàng đầu Việt Nam
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Dành Cho Khách</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Tìm Spa</li>
                <li>Đặt Lịch</li>
                <li>Đánh Giá</li>
                <li>Ưu Đãi</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Dành Cho Spa</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Đăng Ký Spa</li>
                <li>Quản Lý</li>
                <li>Bảng Giá</li>
                <li>Hỗ Trợ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liên Hệ</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Email: info@petspahub.vn</li>
                <li>Hotline: 1900-xxxx</li>
                <li>Facebook</li>
                <li>Instagram</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; 2026 PetSpaHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

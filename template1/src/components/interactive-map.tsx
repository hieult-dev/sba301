import type { Spa } from "../lib/mock-data"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { useEffect, useMemo } from "react"
import L from "leaflet"

interface InteractiveMapProps {
  spas: Spa[]
  onSpaSelect: (spa: Spa) => void
  userLocation?: { lat: number; lng: number }
}

function Recenter({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center)
  }, [center, map])
  return null
}

function circleIcon(color: string, size = 16) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:${size}px;height:${size}px;border-radius:9999px;
      background:${color};border:2px solid #fff;box-sizing:border-box;
      box-shadow: 0 1px 6px rgba(0,0,0,.25);
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  })
}

// ✅ tạo link Google Maps directions
function buildGoogleDirectionsUrl(opts: {
  dest: { lat: number; lng: number }
  origin?: { lat: number; lng: number }
}) {
  const destination = `${opts.dest.lat},${opts.dest.lng}`

  // Nếu có userLocation -> mở chế độ chỉ đường từ vị trí user
  if (opts.origin) {
    const origin = `${opts.origin.lat},${opts.origin.lng}`
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
      origin
    )}&destination=${encodeURIComponent(destination)}&travelmode=driving`
  }

  // Nếu không có userLocation -> mở điểm đến để user tự chọn điểm xuất phát
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    destination
  )}&travelmode=driving`
}

export function InteractiveMap({ spas, onSpaSelect, userLocation }: InteractiveMapProps) {
  const defaultCenter: [number, number] = [10.7769, 106.7009]
  const center: [number, number] = userLocation ? [userLocation.lat, userLocation.lng] : defaultCenter

  const spaIcon = useMemo(() => circleIcon("#f97316", 18), [])
  const userIcon = useMemo(() => circleIcon("#22c55e", 14), [])

  return (
    <div className="w-full h-[600px] rounded-lg border border-border overflow-hidden">
      <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Recenter center={center} />

        {spas.map((spa) => {
          const directionsUrl = buildGoogleDirectionsUrl({
            dest: { lat: spa.lat, lng: spa.lng },
            origin: userLocation,
          })

          return (
            <Marker
              key={spa.id}
              position={[spa.lat, spa.lng]}
              icon={spaIcon}
              eventHandlers={{ click: () => onSpaSelect(spa) }}
            >
              <Popup>
                <div style={{ padding: 8, maxWidth: 260 }}>
                  <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700 }}>{spa.name}</h3>
                  <p style={{ margin: "0 0 8px", fontSize: 14, color: "#666" }}>{spa.address}</p>

                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <span style={{ color: "#f97316" }}>★</span>
                    <b>{spa.rating}</b>
                    <span style={{ color: "#666" }}>({spa.reviews})</span>
                  </div>

                  <p style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 700, color: "#f97316" }}>
                    {spa.priceRange}
                  </p>

                  {/* ✅ Button chỉ đường */}
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      padding: "8px 10px",
                      borderRadius: 10,
                      background: "#2563eb",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: 14,
                      textDecoration: "none",
                      width: "100%",
                    }}
                  >
                    Chỉ đường trên Google Maps
                  </a>

                  {!userLocation && (
                    <p style={{ margin: "8px 0 0", fontSize: 12, color: "#666" }}>
                      (Bật vị trí để Google Maps tự điền điểm xuất phát)
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          )
        })}

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>Vị trí của bạn</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}

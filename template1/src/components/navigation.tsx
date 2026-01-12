"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "./ui/button"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="text-3xl">🐾</div>
            <span className="text-2xl font-bold text-primary">PetSpaHub</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#featured" className="text-foreground hover:text-primary transition-colors">
              Spa Nổi Bật
            </a>
            <a href="#map" className="text-foreground hover:text-primary transition-colors">
              Bản Đồ
            </a>
            <a href="#spas" className="text-foreground hover:text-primary transition-colors">
              Tất Cả Spa
            </a>
            <Button>Đăng Ký Spa</Button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <a
              href="#featured"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Spa Nổi Bật
            </a>
            <a
              href="#map"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Bản Đồ
            </a>
            <a
              href="#spas"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Tất Cả Spa
            </a>
            <Button className="w-full">Đăng Ký Spa</Button>
          </div>
        )}
      </div>
    </nav>
  )
}

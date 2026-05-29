import Link from 'next/link'
import { Camera, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-vh-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Camera className="w-8 h-8 text-vh-accent" />
              <span className="text-xl font-bold text-gradient">Vision Hub</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              منصة الإبداع البصري المتكاملة للمصورين والمصممين
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">الخدمات</h3>
            <ul className="space-y-2">
              <li><Link href="/revive" className="text-gray-400 hover:text-vh-accent text-sm transition-colors">Revive - استعادة الصور</Link></li>
              <li><Link href="/frameai" className="text-gray-400 hover:text-vh-accent text-sm transition-colors">FrameAI - توليد التصاميم</Link></li>
              <li><Link href="/lens-coach" className="text-gray-400 hover:text-vh-accent text-sm transition-colors">Lens Coach - تحليل الصور</Link></li>
              <li><Link href="/academy" className="text-gray-400 hover:text-vh-accent text-sm transition-colors">AI Academy - التدريب</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><Link href="/dashboard" className="text-gray-400 hover:text-vh-accent text-sm transition-colors">لوحة التحكم</Link></li>
              <li><Link href="/login" className="text-gray-400 hover:text-vh-accent text-sm transition-colors">تسجيل الدخول</Link></li>
              <li><Link href="/register" className="text-gray-400 hover:text-vh-accent text-sm transition-colors">إنشاء حساب</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-vh-accent" />
                info@visionhub.pro
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-vh-accent" />
                +966 50 000 0000
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-vh-accent" />
                المملكة العربية السعودية
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 Vision Hub. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  )
}

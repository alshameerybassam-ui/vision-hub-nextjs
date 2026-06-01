'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Aperture, Sparkles, Award, Zap, ArrowLeft, PlayCircle,
  ImagePlus, Palette, Camera, GraduationCap, Upload, Cpu,
  UserCheck, Download, Star, ChevronDown, Instagram, Twitter,
  Linkedin, Youtube, Mail, Phone, MapPin, Menu, X, CheckCircle
} from 'lucide-react'

// ===== NAVIGATION =====
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-yellow-500 flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <Aperture className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-english tracking-tight">Vision Hub</span>
              <span className="text-xs text-muted -mt-1">بسام الإبداعية</span>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm text-gray-300 hover:text-accent transition-colors">الخدمات</a>
            <a href="#how-it-works" className="text-sm text-gray-300 hover:text-accent transition-colors">كيف يعمل</a>
            <a href="#portfolio" className="text-sm text-gray-300 hover:text-accent transition-colors">أعمالنا</a>
            <a href="#academy" className="text-sm text-gray-300 hover:text-accent transition-colors">الأكاديمية</a>
            <a href="#contact" className="text-sm text-gray-300 hover:text-accent transition-colors">تواصل معنا</a>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1 bg-secondary rounded-lg p-1">
              <button className="px-3 py-1.5 rounded-lg bg-accent text-white text-sm font-semibold">عربي</button>
              <button className="px-3 py-1.5 rounded-lg text-gray-400 text-sm font-semibold hover:bg-white/10 transition-colors">EN</button>
            </div>
            <a href="#services" className="hidden md:inline-flex btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold text-white">
              ابدأ الآن
            </a>
            <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu fixed top-0 right-0 w-80 h-full bg-primary z-50 p-6 shadow-2xl ${menuOpen ? 'active' : ''}`}>
        <div className="flex justify-between items-center mb-8">
          <span className="text-xl font-bold">القائمة</span>
          <button onClick={() => setMenuOpen(false)} className="p-2">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <a href="#services" onClick={() => setMenuOpen(false)} className="text-lg py-3 border-b border-border hover:text-accent transition-colors">الخدمات</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="text-lg py-3 border-b border-border hover:text-accent transition-colors">كيف يعمل</a>
          <a href="#portfolio" onClick={() => setMenuOpen(false)} className="text-lg py-3 border-b border-border hover:text-accent transition-colors">أعمالنا</a>
          <a href="#academy" onClick={() => setMenuOpen(false)} className="text-lg py-3 border-b border-border hover:text-accent transition-colors">الأكاديمية</a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="text-lg py-3 border-b border-border hover:text-accent transition-colors">تواصل معنا</a>
          <a href="#services" onClick={() => setMenuOpen(false)} className="btn-primary mt-4 py-3 rounded-xl text-center font-semibold">ابدأ الآن</a>
        </div>
      </div>
    </nav>
  )
}

// ===== PARTICLES BACKGROUND =====
function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Array<{
      x: number; y: number; size: number; speedX: number; speedY: number; opacity: number
    }> = []
    const particleCount = 50

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function init() {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        })
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.x += particle.speedX
        particle.y += particle.speedY
        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 122, 0, ${particle.opacity})`
        ctx.fill()
      })

      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(255, 122, 0, ${0.1 * (1 - distance / 150)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    resize()
    init()
    animate()

    window.addEventListener('resize', () => { resize(); init() })
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-30" />
}

// ===== HERO SECTION =====
function HeroSection() {
  const [counts, setCounts] = useState({ clients: 0, projects: 0, courses: 0 })
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(500, 'clients')
          animateCounter(1200, 'projects')
          animateCounter(50, 'courses')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.5 })

    if (statsRef.current) observer.observe(statsRef.current)
  }, [])

  function animateCounter(target: number, key: string) {
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0
    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        setCounts(prev => ({ ...prev, [key]: target }))
        clearInterval(timer)
      } else {
        setCounts(prev => ({ ...prev, [key]: Math.floor(current) }))
      }
    }, 16)
  }

  return (
    <section className="hero-bg min-h-screen flex items-center justify-center relative pt-20">
      <div className="grid-pattern absolute inset-0 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-right"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-gray-300">المنصة الإبداعية الأولى من نوعها</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
              حيث يلتقي
              <span className="gradient-text block mt-2">الإبداع البشري</span>
              <span className="text-surface">بالذكاء</span>
              <span className="gradient-text">الاصطناعي</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              منصة Vision Hub تجمع بين خبرة بسام الإبداعية وقوة الذكاء الاصطناعي لتقديم خدمات تصميم، 
              تحسين صور، هوية بصرية، وتدريب بمعايير احترافية لا مثيل لها.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#services" className="btn-primary px-8 py-4 rounded-2xl text-lg font-bold text-white inline-flex items-center justify-center gap-2">
                <span>استكشف خدماتنا</span>
                <ArrowLeft className="w-5 h-5" />
              </a>
              <a href="#how-it-works" className="btn-outline px-8 py-4 rounded-2xl text-lg font-semibold inline-flex items-center justify-center gap-2">
                <PlayCircle className="w-5 h-5" />
                <span>شاهد كيف يعمل</span>
              </a>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
              <div>
                <div className="stat-number">{counts.clients}+</div>
                <div className="text-sm text-gray-400 mt-1">عميل سعيد</div>
              </div>
              <div>
                <div className="stat-number">{counts.projects}+</div>
                <div className="text-sm text-gray-400 mt-1">مشروع منجز</div>
              </div>
              <div>
                <div className="stat-number">{counts.courses}+</div>
                <div className="text-sm text-gray-400 mt-1">دورة تدريبية</div>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-3xl overflow-hidden border border-border">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop"
                  alt="Creative AI Art"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -top-4 -right-4 glass rounded-2xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">AI + Human</div>
                    <div className="text-xs text-gray-400">أفضل النتائج</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                className="absolute -bottom-4 -left-4 glass rounded-2xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">جودة احترافية</div>
                    <div className="text-xs text-gray-400">معايير عالمية</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, delay: 4 }}
                className="absolute top-1/2 -left-8 glass rounded-2xl p-3"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-semibold">سرعة فائقة</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-accent" />
      </motion.div>
    </section>
  )
}

// ===== SERVICES SECTION =====
function ServicesSection() {
  const services = [
    {
      icon: ImagePlus,
      title: 'Revive — إحياء الصور',
      description: 'ارفع صورتك القديمة أو الضبابية، ودع الذكاء الاصطناعي يرفع دقتها ويلونها، ثم تدخل أنا (بسام) لإضافة اللمسة الفنية النهائية التي لا يمكن للآلة تقليدها.',
      features: ['رفع الدقة بتقنية AI متقدمة', 'تلوين الصور الأبيض والأسود', 'لمسة فنية بشرية نهائية', 'معاينة قبل/بعد تفاعلية'],
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Palette,
      title: 'FrameAI — الهوية البصرية',
      description: 'أجب على استبيان ذكي حول علامتك التجارية، ويولد AI ~20 تصميماً مبدئياً. أختار أنا أفضل 3 تصاميم وأعدلها يدوياً لتقديم هوية بصرية فريدة.',
      features: ['استبيان ذكي متعدد الخطوات', '~20 تصميم مولد بالـ AI', 'اختيار وتعديل يدوي من بسام', 'ملفات بصيغ متعددة (PNG, SVG, PDF)'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Camera,
      title: 'Lens Coach — المدرب البصري',
      description: 'حمّل صورتك واحصل على تحليل AI فوري لمبادئ التصوير (التكوين، الإضاءة، الألوان). وإذا أردت المزيد، اطلب تحليلاً فيديوياً شخصياً مني مباشرة.',
      features: ['تحليل AI فوري في المتصفح', 'تقييم مفصل بالنقاط والاقتراحات', 'تحليل فيديو شخصي من بسام (2-3 دقائق)', 'تتبع التقدم والتحسن'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: GraduationCap,
      title: 'AI Academy — الأكاديمية',
      description: 'مساران تدريبيان (أساسي ومتقدم) يجمعان بين محتوى AI ذكي وفيديوهات احترافية. اختبر معرفتك باختبارات تفاعلية واحصل على شهادة إتمام رقمية.',
      features: ['مساران: أساسي ومتقدم', '80% محتوى AI مُنشأ + فيديوهات احترافية', 'اختبارات تفاعلية وتمارين عملية', 'شهادة رقمية قابلة للتنزيل'],
      color: 'from-purple-500 to-pink-500',
    },
  ]

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">خدماتنا</span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">
            نظام بيئي إبداعي
            <span className="gradient-text">متكامل</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            أربع وحدات متخصصة تجمع بين الذكاء الاصطناعي واللمسة البشرية الاحترافية
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="service-card glass rounded-3xl p-8 relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150`} />

              <div className={`card-icon w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 transition-transform duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a href="/revive" className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-4 transition-all">
                <span>جرب الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===== HOW IT WORKS =====
function HowItWorks() {
  const steps = [
    { icon: Upload, title: 'ارفع صورتك', desc: 'اسحب وأفلت صورتك أو اخترها من جهازك بسهولة' },
    { icon: Cpu, title: 'معالجة AI', desc: 'يحلل الذكاء الاصطناعي صورتك ويُحسنها بأحدث التقنيات' },
    { icon: UserCheck, title: 'اللمسة البشرية', desc: 'بسام يُراجع ويُعدل النتيجة لضمان الجودة الاحترافية' },
    { icon: Download, title: 'استلم النتيجة', desc: 'احصل على النتيجة النهائية بجودة عالية جاهزة للاستخدام' },
  ]

  return (
    <section id="how-it-works" className="py-24 relative bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">العملية</span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">
            كيف يعمل
            <span className="gradient-text">Vision Hub</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            عملية بسيطة وسلسة تجمع بين سرعة الذكاء الاصطناعي ودقة اللمسة البشرية
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center reveal"
            >
              <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6 relative">
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-white font-bold flex items-center justify-center text-sm">
                  {i + 1}
                </span>
                <step.icon className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===== TESTIMONIALS =====
function Testimonials() {
  const testimonials = [
    {
      text: 'لم أتخيل أن صور جدي القديمة يمكن أن تبدو بهذا الوضوح. الفرق صارخ، واللمسة الفنية واضحة جداً.',
      name: 'أحمد الزهراني',
      role: 'مصور هواة',
      initial: 'أح',
      color: 'bg-accent/20 text-accent',
    },
    {
      text: 'FrameAI أنقذني! حصلت على هوية بصرية كاملة لشركتي الناشئة بجزء بسيط من التكلفة والوقت.',
      name: 'سارة القحطاني',
      role: 'مؤسسة شركة تقنية',
      initial: 'س',
      color: 'bg-blue/20 text-blue-400',
    },
    {
      text: 'تحليل Lens Coach غيّر طريقة تصويري. النصائح العملية من بسام كانت ذهبية، أنصح كل مصور بها.',
      name: 'محمد العتيبي',
      role: 'مصور محترف',
      initial: 'م',
      color: 'bg-green-500/20 text-green-400',
    },
  ]

  return (
    <section className="py-24 relative bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">آراء العملاء</span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">
            ماذا يقول
            <span className="gradient-text">عملاؤنا</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="testimonial-card rounded-2xl p-6 reveal"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center`}>
                  <span className="font-bold">{t.initial}</span>
                </div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-gray-400">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===== CTA SECTION =====
function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-blue/10" />
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 reveal">
        <h2 className="text-4xl md:text-5xl font-black mb-6">
          جاهز لتحويل
          <span className="gradient-text">رؤيتك إلى واقع؟</span>
        </h2>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          انضم إلى مئات العملاء الذين وثقوا بـ Vision Hub لتحقيق أحلامهم الإبداعية. 
          ابدأ رحلتك الآن مجاناً.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#services" className="btn-primary px-10 py-4 rounded-2xl text-lg font-bold text-white inline-flex items-center justify-center gap-2 animate-glow">
            <span>ابدأ مجاناً</span>
            <ArrowLeft className="w-5 h-5" />
          </a>
          <a href="#contact" className="btn-outline px-10 py-4 rounded-2xl text-lg font-semibold inline-flex items-center justify-center gap-2">
            <Mail className="w-5 h-5" />
            <span>تحدث مع بسام</span>
          </a>
        </div>
      </div>
    </section>
  )
}

// ===== FOOTER =====
function Footer() {
  return (
    <footer id="contact" className="relative pt-24 pb-8 bg-secondary/50">
      <div className="footer-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#0A0A0A" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-yellow-500 flex items-center justify-center">
                <Aperture className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold font-english">Vision Hub</span>
                <span className="text-xs text-muted block -mt-1">بسام الإبداعية</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              منصة إبداعية متكاملة تجمع بين خبرة المصور والمصمم بسام وقوة الذكاء الاصطناعي.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-6">الخدمات</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors text-sm">Revive — إحياء الصور</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors text-sm">FrameAI — الهوية البصرية</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors text-sm">Lens Coach — المدرب البصري</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors text-sm">AI Academy — الأكاديمية</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-6">الشركة</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors text-sm">عن بسام</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors text-sm">أعمالنا</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors text-sm">المدونة</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors text-sm">الوظائف</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-6">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-accent" />
                <span>hello@visionhub.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-accent" />
                <span>+966 50 000 0000</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-accent" />
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Vision Hub. جميع الحقوق محفوظة. بسام الإبداعية.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-accent text-sm transition-colors">سياسة الخصوصية</a>
            <a href="#" className="text-gray-500 hover:text-accent text-sm transition-colors">شروط الاستخدام</a>
            <a href="#" className="text-gray-500 hover:text-accent text-sm transition-colors">الدعم الفني</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ===== MAIN PAGE =====
export default function Home() {
  useEffect(() => {
    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href')!)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    })
  }, [])

  return (
    <>
      <ParticlesCanvas />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <HowItWorks />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

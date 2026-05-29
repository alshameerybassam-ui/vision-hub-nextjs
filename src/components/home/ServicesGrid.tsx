'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Wand2, Camera, Brain, GraduationCap, ArrowLeft } from 'lucide-react'

const services = [
  {
    id: 'revive',
    title: 'Revive',
    description: 'استعد صورك القديمة والتالفة بجودة احترافية باستخدام أحدث تقنيات الذكاء الاصطناعي',
    icon: Wand2,
    color: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-400',
    features: ['إزالة الخدوش', 'تحسين الألوان', 'زيادة الدقة', 'معاينة فورية'],
  },
  {
    id: 'frameai',
    title: 'FrameAI',
    description: 'ولد تصاميم فريدة ومخصصة بناءً على تفضيلاتك باستخدام الذكاء الاصطناعي المتقدم',
    icon: Camera,
    color: 'from-vh-accent/20 to-purple-500/20',
    iconColor: 'text-vh-accent',
    features: ['توليد فوري', 'تخصيص كامل', 'تعديلات لا محدودة', 'تصدير عالي الجودة'],
  },
  {
    id: 'lens-coach',
    title: 'Lens Coach',
    description: 'احصل على تحليل AI احترافي لصورك مع تقييم دقيق واقتراحات للتحسين',
    icon: Brain,
    color: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400',
    features: ['تحليل 4 معايير', 'اقتراحات ذكية', 'تقرير مفصل', 'تحسين مستمر'],
  },
  {
    id: 'academy',
    title: 'AI Academy',
    description: 'تعلم فنون التصوير والتصميم من خلال دورات تفاعلية مع شهادات معتمدة',
    icon: GraduationCap,
    color: 'from-rose-500/20 to-pink-500/20',
    iconColor: 'text-rose-400',
    features: ['6 دورات متخصصة', 'اختبارات تفاعلية', 'شهادات معتمدة', 'دعم مستمر'],
  },
]

export default function ServicesGrid() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            خدماتنا <span className="text-gradient">المتكاملة</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            كل ما تحتاجه لإطلاق إبداعك البصري في مكان واحد
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/${service.id}`}>
                <div className="group relative glass rounded-2xl p-8 hover:border-vh-accent/30 transition-all duration-300 h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />

                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
                      <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-vh-accent transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-vh-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-2 text-vh-accent font-medium group-hover:gap-3 transition-all">
                      اكتشف الخدمة
                      <ArrowLeft className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

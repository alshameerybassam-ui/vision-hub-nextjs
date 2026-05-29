'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Camera, Brain, GraduationCap, Wand2 } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-vh-dark">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-vh-accent/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-vh-accent/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vh-accent/10 border border-vh-accent/20 text-vh-accent text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            منصة الإبداع البصري المتكاملة
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="text-white">حوّل رؤيتك إلى</span>
          <br />
          <span className="text-gradient">واقع بصري مذهل</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          منصة متكاملة تجمع بين الذكاء الاصطناعي والإبداع البصري.
          استعد صورك، حلل أعمالك، تولد تصاميم فريدة، وتعلم من الأفضل.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/frameai"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-vh-accent text-white rounded-xl hover:bg-vh-accent-hover transition-colors font-semibold"
          >
            <Wand2 className="w-5 h-5" />
            ابدأ بالإبداع
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Link
            href="/academy"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors font-semibold"
          >
            <GraduationCap className="w-5 h-5" />
            استكشف الأكاديمية
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-3xl mx-auto"
        >
          {[
            { icon: Camera, value: '10K+', label: 'صورة تمت معالجتها' },
            { icon: Brain, value: '5K+', label: 'تحليل AI' },
            { icon: Wand2, value: '2K+', label: 'تصميم مولد' },
            { icon: GraduationCap, value: '1K+', label: 'متدرب' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="glass rounded-xl p-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <stat.icon className="w-6 h-6 text-vh-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

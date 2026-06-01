'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { GraduationCap, Play, Clock, Award, Lock, CheckCircle, ArrowLeft, Star } from 'lucide-react'
import Link from 'next/link'

const courses = [
  {
    id: 1,
    title: 'أساسيات التصوير الفوتوغرافي',
    description: 'تعلم أساسيات الكاميرا، التعريض، والتكوين',
    duration: '4 ساعات',
    level: 'basic',
    lessons: 12,
    completed: true,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    title: 'التصوير الاحترافي',
    description: 'تقنيات متقدمة للتصوير الاحترافي',
    duration: '6 ساعات',
    level: 'advanced',
    lessons: 18,
    completed: false,
    color: 'from-accent to-yellow-500',
  },
  {
    id: 3,
    title: 'التصميم الجرافيكي',
    description: 'تعلم Photoshop وIllustrator من الصفر',
    duration: '8 ساعات',
    level: 'basic',
    lessons: 24,
    completed: false,
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 4,
    title: 'تصوير المنتجات',
    description: 'تقنيات تصوير المنتجات للتجارة الإلكترونية',
    duration: '5 ساعات',
    level: 'advanced',
    lessons: 15,
    completed: false,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 5,
    title: 'تصوير البورتريه',
    description: 'أسرار تصوير الوجوه والتعبيرات',
    duration: '7 ساعات',
    level: 'advanced',
    lessons: 20,
    completed: false,
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 6,
    title: 'الذكاء الاصطناعي في التصوير',
    description: 'استخدام AI لتحسين وتوليد الصور',
    duration: '3 ساعات',
    level: 'basic',
    lessons: 10,
    completed: false,
    color: 'from-purple-500 to-violet-500',
  },
]

const levelLabels = {
  basic: { label: 'أساسي', color: 'bg-green-500/20 text-green-400' },
  advanced: { label: 'متقدم', color: 'bg-accent/20 text-accent' },
}

export default function AcademyPage() {
  const [userProgress, setUserProgress] = useState<Record<number, number>>({})

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="grid-pattern absolute inset-0 z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">AI Academy — الأكاديمية</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            تعلم فنون التصوير والتصميم من خلال دورات تفاعلية مع شهادات معتمدة
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { icon: GraduationCap, value: '6', label: 'دورات' },
            { icon: Play, value: '99', label: 'درس' },
            { icon: Clock, value: '33', label: 'ساعة' },
            { icon: Award, value: '1', label: 'شهادة' },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-xl p-4 text-center">
              <stat.icon className="w-6 h-6 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="glass rounded-2xl p-6 h-full hover:border-accent/30 transition-all cursor-pointer relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-5 transition-opacity`} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs ${levelLabels[course.level as keyof typeof levelLabels].color}`}>
                      {levelLabels[course.level as keyof typeof levelLabels].label}
                    </div>
                    {course.completed && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Play className="w-4 h-4" />
                      {course.lessons} درس
                    </div>
                  </div>

                  <button className="mt-4 w-full py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent hover:text-white transition-colors text-sm font-medium">
                    {course.completed ? 'إعادة المشاهدة' : 'بدء الدورة'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-gray-400 hover:text-accent transition-colors inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  )
}

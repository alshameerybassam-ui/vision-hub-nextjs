'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Play, Clock, BarChart3, Award, Lock, CheckCircle } from 'lucide-react'

const courses = [
  {
    id: 1,
    title: 'أساسيات التصوير الفوتوغرافي',
    description: 'تعلم أساسيات الكاميرا، التعريض، والتكوين',
    duration: '4 ساعات',
    level: 'مبتدئ',
    lessons: 12,
    completed: true,
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    id: 2,
    title: 'التصوير الاحترافي',
    description: 'تقنيات متقدمة للتصوير الاحترافي',
    duration: '6 ساعات',
    level: 'متوسط',
    lessons: 18,
    completed: false,
    color: 'from-vh-accent/20 to-purple-500/20',
  },
  {
    id: 3,
    title: 'التصميم الجرافيكي',
    description: 'تعلم Photoshop وIllustrator من الصفر',
    duration: '8 ساعات',
    level: 'مبتدئ',
    lessons: 24,
    completed: false,
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    id: 4,
    title: 'تصوير المنتجات',
    description: 'تقنيات تصوير المنتجات للتجارة الإلكترونية',
    duration: '5 ساعات',
    level: 'متوسط',
    lessons: 15,
    completed: false,
    color: 'from-green-500/20 to-emerald-500/20',
  },
  {
    id: 5,
    title: 'تصوير البورتريه',
    description: 'أسرار تصوير الوجوه والتعبيرات',
    duration: '7 ساعات',
    level: 'متقدم',
    lessons: 20,
    completed: false,
    color: 'from-pink-500/20 to-rose-500/20',
  },
  {
    id: 6,
    title: 'الذكاء الاصطناعي في التصوير',
    description: 'استخدام AI لتحسين وتوليد الصور',
    duration: '3 ساعات',
    level: 'متوسط',
    lessons: 10,
    completed: false,
    color: 'from-violet-500/20 to-purple-500/20',
  },
]

const levelColors: Record<string, string> = {
  'مبتدئ': 'bg-green-500/20 text-green-400',
  'متوسط': 'bg-yellow-500/20 text-yellow-400',
  'متقدم': 'bg-red-500/20 text-red-400',
}

export default function AcademyPage() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-rose-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-rose-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">AI Academy</h1>
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
              <stat.icon className="w-6 h-6 text-vh-accent mx-auto mb-2" />
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
              <div className={`glass rounded-2xl p-6 h-full hover:border-vh-accent/30 transition-all cursor-pointer relative overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs ${levelColors[course.level]}`}>
                      {course.level}
                    </div>
                    {course.completed && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-vh-accent transition-colors">
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

                  <button className="mt-4 w-full py-2 bg-vh-accent/10 text-vh-accent rounded-lg hover:bg-vh-accent hover:text-white transition-colors text-sm font-medium">
                    {course.completed ? 'إعادة المشاهدة' : 'بدء الدورة'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

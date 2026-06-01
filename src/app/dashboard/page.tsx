'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, ShoppingBag, Users, DollarSign, TrendingUp,
  Clock, CheckCircle, AlertCircle, ArrowLeft, Bell, Settings,
  Aperture, LogOut
} from 'lucide-react'
import Link from 'next/link'

const stats = [
  { label: 'إجمالي الطلبات', value: '156', icon: ShoppingBag, color: 'bg-accent/20 text-accent' },
  { label: 'المستخدمين', value: '89', icon: Users, color: 'bg-green-500/20 text-green-400' },
  { label: 'الإيرادات', value: '12,450 ر.س', icon: DollarSign, color: 'bg-yellow-500/20 text-yellow-400' },
  { label: 'معدل النمو', value: '+23%', icon: TrendingUp, color: 'bg-blue/20 text-blue-400' },
]

const recentOrders = [
  { id: '#ORD-001', service: 'Revive', customer: 'أحمد محمد', status: 'completed', date: '2026-05-28', amount: '150 ر.س' },
  { id: '#ORD-002', service: 'FrameAI', customer: 'سارة علي', status: 'ai_processing', date: '2026-05-28', amount: '200 ر.س' },
  { id: '#ORD-003', service: 'Lens Coach', customer: 'خالد عبدالله', status: 'pending', date: '2026-05-27', amount: '100 ر.س' },
  { id: '#ORD-004', service: 'Revive', customer: 'نورة سعد', status: 'completed', date: '2026-05-27', amount: '150 ر.س' },
  { id: '#ORD-005', service: 'FrameAI', customer: 'فهد أحمد', status: 'human_review', date: '2026-05-26', amount: '200 ر.س' },
]

const statusConfig = {
  completed: { label: 'مكتمل', color: 'bg-green-500/20 text-green-400', icon: CheckCircle },
  ai_processing: { label: 'معالجة AI', color: 'bg-blue-500/20 text-blue-400', icon: Clock },
  human_review: { label: 'مراجعة يدوية', color: 'bg-purple-500/20 text-purple-400', icon: AlertCircle },
  pending: { label: 'معلق', color: 'bg-red-500/20 text-red-400', icon: AlertCircle },
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        setProfile(data)
      }

      setLoading(false)
    }
    getProfile()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
      </div>
    )
  }

  const isAdmin = profile?.role === 'admin'

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="grid-pattern absolute inset-0 z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">لوحة التحكم</h1>
            <p className="text-gray-400">
              مرحباً، {profile?.full_name || 'بسام'} 👋
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 glass rounded-lg hover:bg-white/10 transition-colors relative">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="p-2 glass rounded-lg hover:bg-white/10 transition-colors">
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
            <button onClick={handleLogout} className="p-2 glass rounded-lg hover:bg-red-500/20 transition-colors">
              <LogOut className="w-5 h-5 text-red-400" />
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">أحدث الطلبيات</h2>
            <button className="text-accent text-sm hover:text-accent-hover transition-colors flex items-center gap-1">
              عرض الكل
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-right text-gray-400 text-sm font-medium pb-3 pr-4">الطلب</th>
                  <th className="text-right text-gray-400 text-sm font-medium pb-3">الخدمة</th>
                  <th className="text-right text-gray-400 text-sm font-medium pb-3">العميل</th>
                  <th className="text-right text-gray-400 text-sm font-medium pb-3">الحالة</th>
                  <th className="text-right text-gray-400 text-sm font-medium pb-3">التاريخ</th>
                  <th className="text-right text-gray-400 text-sm font-medium pb-3 pl-4">المبلغ</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => {
                  const status = statusConfig[order.status as keyof typeof statusConfig]
                  return (
                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 pr-4 text-white font-medium">{order.id}</td>
                      <td className="py-4 text-gray-300">{order.service}</td>
                      <td className="py-4 text-gray-300">{order.customer}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${status.color}`}>
                          <status.icon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </td>
                      <td className="py-4 text-gray-400 text-sm">{order.date}</td>
                      <td className="py-4 pl-4 text-white font-medium">{order.amount}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { title: 'إدارة الخدمات', desc: 'تعديل وإضافة خدمات جديدة' },
            { title: 'إدارة المستخدمين', desc: 'عرض وإدارة حسابات المستخدمين' },
            { title: 'التقارير', desc: 'عرض التقارير المالية والإحصائيات' },
          ].map((action, i) => (
            <div
              key={i}
              className="glass rounded-xl p-6 hover:border-accent/30 transition-colors cursor-pointer"
            >
              <h3 className="text-white font-semibold mb-1">{action.title}</h3>
              <p className="text-gray-400 text-sm">{action.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Admin Section */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 glass rounded-2xl p-6 border-accent/30"
          >
            <h2 className="text-xl font-bold text-white mb-4">🔧 أدوات المشرف</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl">
                <h3 className="text-white font-medium mb-2">مراجعة الطلبات</h3>
                <p className="text-gray-400 text-sm">5 طلبات بانتظار المراجعة اليدوية</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <h3 className="text-white font-medium mb-2">تحليلات Lens Coach</h3>
                <p className="text-gray-400 text-sm">3 طلبات تحليل من بسام</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

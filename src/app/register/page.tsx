'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Aperture } from 'lucide-react'
import { motion } from 'framer-motion'

export default function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  const getPasswordStrength = (pass: string) => {
    let strength = 0
    if (pass.length >= 8) strength++
    if (/[A-Z]/.test(pass)) strength++
    if (/[0-9]/.test(pass)) strength++
    if (/[^A-Za-z0-9]/.test(pass)) strength++
    return strength
  }

  const strength = getPasswordStrength(password)
  const strengthLabels = ['ضعيفة جداً', 'ضعيفة', 'متوسطة', 'قوية', 'قوية جداً']
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-emerald-500']

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('كلمات المرور غير متطابقة')
      setLoading(false)
      return
    }

    if (strength < 2) {
      setError('كلمة المرور ضعيفة جداً')
      setLoading(false)
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    })

    if (error) {
      setError(error.message === 'User already registered' 
        ? 'هذا البريد الإلكتروني مسجل مسبقاً' 
        : error.message)
    } else {
      setSuccess(true)
    }

    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-4 relative">
        <div className="grid-pattern absolute inset-0 z-0" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="glass rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">تم إنشاء الحساب!</h2>
            <p className="text-gray-400 mb-6">
              تم إرسال رابط التفعيل إلى بريدك الإلكتروني. يرجى التحقق من بريدك لتفعيل الحساب.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 btn-primary text-white rounded-xl"
            >
              <ArrowLeft className="w-5 h-5" />
              الذهاب إلى تسجيل الدخول
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4 relative">
      <div className="grid-pattern absolute inset-0 z-0" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-yellow-500 flex items-center justify-center mx-auto mb-4">
              <Aperture className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">إنشاء حساب</h1>
            <p className="text-gray-400">انضم إلى مجتمع Vision Hub</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">الاسم الكامل</label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                  placeholder="محمد أحمد"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10 pl-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          strength >= level ? strengthColors[strength] : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    قوة كلمة المرور: <span className={strengthColors[strength].replace('bg-', 'text-')}>{strengthLabels[strength]}</span>
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">تأكيد كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 btn-primary text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            لديك حساب بالفعل؟{' '}
            <Link href="/login" className="text-accent hover:text-accent-hover transition-colors">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

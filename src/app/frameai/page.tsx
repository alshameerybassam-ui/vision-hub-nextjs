'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Palette, Camera, Brush, Sparkles, Send, Loader2, ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const fields = [
  { id: 'photography', label: 'تصوير فوتوغرافي', icon: Camera },
  { id: 'graphic', label: 'تصميم جرافيكي', icon: Palette },
  { id: 'branding', label: 'هوية بصرية', icon: Brush },
  { id: 'social', label: 'محتوى سوشيال ميديا', icon: Sparkles },
]

const colors = [
  { id: 'warm', label: 'دافئة', bg: 'bg-orange-500' },
  { id: 'cool', label: 'باردة', bg: 'bg-blue-500' },
  { id: 'neutral', label: 'محايدة', bg: 'bg-gray-500' },
  { id: 'vibrant', label: 'نابضة', bg: 'bg-purple-500' },
]

const styles = [
  { id: 'minimal', label: 'مينيمالي' },
  { id: 'modern', label: 'عصري' },
  { id: 'classic', label: 'كلاسيكي' },
  { id: 'artistic', label: 'فني' },
]

const feelings = [
  { id: 'calm', label: 'هادئ' },
  { id: 'energetic', label: 'حيوي' },
  { id: 'luxury', label: 'فاخر' },
  { id: 'friendly', label: 'ودود' },
]

export default function FrameAIPage() {
  const [step, setStep] = useState(1)
  const [selections, setSelections] = useState<Record<string, string>>({})
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState(false)

  const handleSelect = (category: string, value: string) => {
    setSelections((prev) => ({ ...prev, [category]: value }))
  }

  const handleGenerate = async () => {
    setGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 4000))
    setGenerating(false)
    setResult(true)
  }

  const steps = [
    {
      title: 'اختر المجال',
      description: 'ما هو مجال عملك؟',
      options: fields,
      category: 'field',
      renderOption: (opt: any) => (
        <div className="flex flex-col items-center gap-2">
          <opt.icon className="w-8 h-8" />
          <span className="text-sm">{opt.label}</span>
        </div>
      ),
    },
    {
      title: 'اختر الألوان',
      description: 'ما هي الألوان المفضلة؟',
      options: colors,
      category: 'color',
      renderOption: (opt: any) => (
        <div className="flex flex-col items-center gap-2">
          <div className={`w-10 h-10 rounded-full ${opt.bg}`} />
          <span className="text-sm">{opt.label}</span>
        </div>
      ),
    },
    {
      title: 'اختر الأسلوب',
      description: 'ما هو الأسلوب المفضل؟',
      options: styles,
      category: 'style',
      renderOption: (opt: any) => (
        <span className="text-lg font-medium">{opt.label}</span>
      ),
    },
    {
      title: 'اختر الشعور',
      description: 'ما الشعور الذي تريد إيصاله؟',
      options: feelings,
      category: 'feeling',
      renderOption: (opt: any) => (
        <span className="text-lg font-medium">{opt.label}</span>
      ),
    },
  ]

  const currentStep = steps[step - 1]

  if (result) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 relative">
        <div className="grid-pattern absolute inset-0 z-0" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Sparkles className="w-16 h-16 text-accent mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-4">تم إنشاء التصميم!</h1>
            <p className="text-gray-400 mb-8">بناءً على اختياراتك، إليك التصميم المقترح</p>

            <div className="glass rounded-2xl p-8 mb-8">
              <div className="aspect-video bg-gradient-to-br from-accent/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                <Palette className="w-24 h-24 text-white/20" />
              </div>
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {Object.entries(selections).map(([key, value]) => (
                  <span key={key} className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300">
                    {key}: {value}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => { setStep(1); setSelections({}); setResult(false); }}
                className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors"
              >
                إعادة المحاولة
              </button>
              <button className="px-6 py-3 btn-primary text-white rounded-xl">
                تحميل التصميم
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="grid-pattern absolute inset-0 z-0" />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">FrameAI — الهوية البصرية</h1>
          <p className="text-gray-400">أجب على بعض الأسئلة وسنولد لك تصميماً فريداً</p>
        </motion.div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-colors ${
                i + 1 <= step ? 'bg-accent' : 'bg-white/10'
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-2">{currentStep.title}</h2>
          <p className="text-gray-400 mb-6">{currentStep.description}</p>

          <div className="grid grid-cols-2 gap-4">
            {currentStep.options.map((opt: any) => (
              <button
                key={opt.id}
                onClick={() => handleSelect(currentStep.category, opt.id)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selections[currentStep.category] === opt.id
                    ? 'border-accent bg-accent/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="text-white">
                  {currentStep.renderOption(opt)}
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
              >
                السابق
              </button>
            )}

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!selections[currentStep.category]}
                className="px-6 py-3 btn-primary text-white rounded-xl disabled:opacity-50 mr-auto"
              >
                التالي
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={generating || !selections[currentStep.category]}
                className="px-6 py-3 btn-primary text-white rounded-xl disabled:opacity-50 mr-auto inline-flex items-center gap-2"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    جاري التوليد...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    إنشاء التصميم
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-gray-400 hover:text-accent transition-colors inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  )
}

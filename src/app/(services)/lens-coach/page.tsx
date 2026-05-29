'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { Brain, Upload, Star, Lightbulb, Loader2, CheckCircle, ImageIcon } from 'lucide-react'

interface AnalysisResult {
  composition: number
  exposure: number
  focus: number
  creativity: number
  suggestions: string[]
}

export default function LensCoachPage() {
  const [file, setFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
      setResult(null)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 1,
  })

  const handleAnalyze = async () => {
    if (!file) return
    setAnalyzing(true)
    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3500))
    setResult({
      composition: 85,
      exposure: 72,
      focus: 90,
      creativity: 78,
      suggestions: [
        'حاول استخدام قاعدة الأثلاث لتحسين التكوين',
        'يمكنك زيادة التباين قليلاً لإبراز التفاصيل',
        'التقط من زاوية أقل لإضافة عمق أكثر',
        'استخدم الإضاءة الطبيعية من الجانب',
      ],
    })
    setAnalyzing(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Lens Coach</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            احصل على تحليل AI احترافي لصورك مع تقييم دقيق واقتراحات للتحسين
          </p>
        </motion.div>

        {!result ? (
          <>
            {/* Upload Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                  isDragActive
                    ? 'border-emerald-500 bg-emerald-500/5'
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <input {...getInputProps()} />
                {file ? (
                  <div className="flex items-center justify-center gap-3">
                    <ImageIcon className="w-8 h-8 text-emerald-400" />
                    <div className="text-left">
                      <p className="text-white">{file.name}</p>
                      <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    {isDragActive ? (
                      <p className="text-emerald-400 text-lg">أفلت الصورة هنا...</p>
                    ) : (
                      <>
                        <p className="text-white text-lg mb-2">اسحب صورتك هنا أو انقر للاختيار</p>
                        <p className="text-gray-500 text-sm">JPEG, PNG, WebP</p>
                      </>
                    )}
                  </>
                )}
              </div>
            </motion.div>

            {/* Analyze Button */}
            {file && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="px-8 py-4 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-semibold disabled:opacity-50 inline-flex items-center gap-2"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      جاري التحليل...
                    </>
                  ) : (
                    <>
                      <Brain className="w-5 h-5" />
                      تحليل الصورة
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </>
        ) : (
          /* Results */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Overall Score */}
            <div className="glass rounded-2xl p-8 mb-6 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/20 mb-4">
                <span className="text-3xl font-bold text-emerald-400">
                  {Math.round((result.composition + result.exposure + result.focus + result.creativity) / 4)}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">النتيجة الإجمالية</h2>
              <p className="text-gray-400">صورة ممتازة! إليك التفاصيل:</p>
            </div>

            {/* Detailed Scores */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'التكوين', value: result.composition },
                { label: 'الإضاءة', value: result.exposure },
                { label: 'التركيز', value: result.focus },
                { label: 'الإبداع', value: result.creativity },
              ].map((item) => (
                <div key={item.label} className="glass rounded-xl p-4 text-center">
                  <div className={`text-3xl font-bold mb-1 ${getScoreColor(item.value)}`}>
                    {item.value}
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full ${getScoreBg(item.value)}`}
                    />
                  </div>
                  <div className="text-sm text-gray-400">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Suggestions */}
            <div className="glass rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <Lightbulb className="w-6 h-6 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">اقتراحات التحسين</h3>
              </div>
              <div className="space-y-4">
                {result.suggestions.map((suggestion, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-white/5 rounded-xl"
                  >
                    <Star className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300">{suggestion}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Request Analysis from Bassam */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 glass rounded-2xl p-8 text-center"
            >
              <h3 className="text-xl font-bold text-white mb-2">هل تريد تحليلاً أعمق؟</h3>
              <p className="text-gray-400 mb-4">
                يمكنك طلب تحليل شخصي من بسام (مدرب التصوير) لصورتك
              </p>
              <button className="px-6 py-3 bg-vh-accent text-white rounded-xl hover:bg-vh-accent-hover transition-colors inline-flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                طلب تحليل من بسام
              </button>
            </motion.div>

            <div className="text-center mt-8">
              <button
                onClick={() => { setFile(null); setResult(null); }}
                className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors"
              >
                تحليل صورة جديدة
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

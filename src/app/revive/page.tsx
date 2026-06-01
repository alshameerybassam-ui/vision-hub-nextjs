'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { Upload, ImagePlus, Wand2, Download, CheckCircle, Loader2, ArrowLeft, Aperture } from 'lucide-react'
import Link from 'next/link'

export default function RevivePage() {
  const [files, setFiles] = useState<File[]>([])
  const [processing, setProcessing] = useState(false)
  const [completed, setCompleted] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
    setCompleted(false)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 5,
  })

  const handleProcess = async () => {
    if (files.length === 0) return
    setProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setProcessing(false)
    setCompleted(true)
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="grid-pattern absolute inset-0 z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4">
            <ImagePlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Revive — إحياء الصور</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            استعد صورك القديمة والتالفة بجودة احترافية باستخدام أحدث تقنيات الذكاء الاصطناعي
          </p>
        </motion.div>

        {/* Drop Zone */}
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
                ? 'border-accent bg-accent/5'
                : 'border-white/20 hover:border-white/40'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            {isDragActive ? (
              <p className="text-accent text-lg">أفلت الصور هنا...</p>
            ) : (
              <>
                <p className="text-white text-lg mb-2">اسحب الصور هنا أو انقر للاختيار</p>
                <p className="text-gray-500 text-sm">JPEG, PNG, WebP - حتى 5 صور</p>
              </>
            )}
          </div>
        </motion.div>

        {/* File List */}
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h3 className="text-white font-semibold mb-4">الصور المحددة ({files.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {files.map((file, i) => (
                <div key={i} className="glass rounded-xl p-4">
                  <ImagePlus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-300 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Process Button */}
        {files.length > 0 && !completed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <button
              onClick={handleProcess}
              disabled={processing}
              className="px-8 py-4 btn-primary text-white rounded-xl font-semibold disabled:opacity-50 inline-flex items-center gap-2"
            >
              {processing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  جاري المعالجة...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  بدء الاستعادة
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Success */}
        {completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-8 text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">تمت المعالجة بنجاح!</h2>
            <p className="text-gray-400 mb-6">تم استعادة صورك بجودة عالية</p>
            <button className="px-6 py-3 btn-primary text-white rounded-xl inline-flex items-center gap-2">
              <Download className="w-5 h-5" />
              تحميل الصور
            </button>
          </motion.div>
        )}

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

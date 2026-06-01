import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vision Hub | منصة بسام الإبداعية',
  description: 'منصة بسام الإبداعية. خدمات تصميم، تحسين صور، هوية بصرية، وتدريب بشراكة بين الذكاء الاصطناعي والعنصر البشري المحترف.',
  keywords: 'تصميم, تصوير, هوية بصرية, ذكاء اصطناعي, تدريب, بسام, Vision Hub',
  authors: [{ name: 'Bassam Creative Ecosystem' }],
  openGraph: {
    title: 'Vision Hub | منصة بسام الإبداعية',
    description: 'حيث يلتقي الإبداع البشري بالذكاء الاصطناعي',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#0A0A0A" />
      </head>
      <body className="font-arabic">
        {children}
      </body>
    </html>
  )
}

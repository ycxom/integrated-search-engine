import './globals.css'

// 这是一个 Vite + React 项目，不需要 Next.js 的 metadata 和 RootLayout
// 如果需要设置页面标题和描述，应该在 index.html 中设置

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}

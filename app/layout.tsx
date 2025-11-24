export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#000', color: '#fff' }}>{children}</body>
    </html>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#FFD700', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  );
}

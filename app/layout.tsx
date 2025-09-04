import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FitPro Gym - Management System',
  description: 'Complete gym management solution for fitness centers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
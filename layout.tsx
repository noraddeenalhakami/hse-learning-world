import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'السلامة والصحة المهنية — HSE Immersive Learning World',
  description: 'عالم تعليمي تفاعلي غامر في مجال السلامة والصحة المهنية — إعداد نورالدين الحكمي',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@100;200;300;400;500;600;700&family=Noto+Kufi+Arabic:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}

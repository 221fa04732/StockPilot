import { ReactNode } from 'react';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Product | StockPilot',
  description: 'Sample layout using App Router',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (<div>
    {children}
    <Footer />
  </div>);
}

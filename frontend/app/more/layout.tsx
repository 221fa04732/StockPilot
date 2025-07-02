import { ReactNode } from 'react';
import Footer from '@/components/footer';

export const metadata = {
  title: 'More | StockPilot',
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

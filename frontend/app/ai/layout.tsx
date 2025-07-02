import { ReactNode } from 'react';

export const metadata = {
  title: 'AI | StockPilot',
  description: 'Sample layout using App Router',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (<div>{children}</div>);
}

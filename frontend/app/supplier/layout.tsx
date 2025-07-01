import { ReactNode } from 'react';

export const metadata = {
  title: 'Supplier | StockPilot',
  description: 'Sample layout using App Router',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}

import { ReactNode } from 'react';

export const metadata = {
  title: 'About Us | Vulcan Consulting',
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

'use client';

import { useAuth } from '@clerk/nextjs';
import { SWRConfig } from 'swr';
import type { ReactNode } from 'react';

/** Clear all cached private responses when the active Clerk account changes. */
export default function AuthenticatedCache({ children }: { children: ReactNode }) {
  const { isLoaded, userId } = useAuth();
  if (!isLoaded) return null;
  return (
    <SWRConfig key={userId ?? 'signed-out'} value={{ provider: () => new Map() }}>
      {children}
    </SWRConfig>
  );
}

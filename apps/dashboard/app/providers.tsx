'use client';
import { ToroProvider } from '@reactforge/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToroProvider network="testnet" baseURL="https://testnet.toronet.org/api">
      {children}
    </ToroProvider>
  );
}

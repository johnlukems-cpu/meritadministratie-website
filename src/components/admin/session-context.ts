import { createContext, useContext } from 'react';

export interface AdminSession {
  /** Meldt de gebruiker af en toont weer het inlogscherm */
  signOut: () => void;
}

export const AdminSessionContext = createContext<AdminSession | null>(null);

/** Alleen bruikbaar binnen <AdminGate>. */
export function useAdminSession(): AdminSession {
  const session = useContext(AdminSessionContext);
  if (!session) throw new Error('useAdminSession moet binnen <AdminGate> worden gebruikt.');
  return session;
}

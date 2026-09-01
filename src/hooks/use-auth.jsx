import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

function nameFromEmail(email) {
  const local = email?.split('@')[0]?.trim();
  if (!local) {
    return 'Letícia';
  }

  return local.charAt(0).toUpperCase() + local.slice(1);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const value = useMemo(
    () => ({
      user,
      signIn({ email = '', name } = {}) {
        const trimmed = email.trim();
        setUser({
          name: name || nameFromEmail(trimmed),
          email: trimmed || 'leticia@focaai.app',
        });
      },
      signOut() {
        setUser(null);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth precisa estar dentro de AuthProvider');
  }
  return context;
}

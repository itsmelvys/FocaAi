import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export const DEMO_PROFILE = {
  name: 'Letícia Viviane',
  fullName: 'Letícia Viviane Pereira da Silva',
  email: 'leticia@email.com',
  bio: 'Disciplina hoje, conquistas amanhã. ♡',
  birthDate: '20 de setembro de 2002',
  school: 'UNINASSAU Caruaru',
  course: 'Análise e Desenvolvimento de Sistemas (ADS)',
  reminders: true,
  theme: 'Claro',
  language: 'Português (Brasil)',
};

function nameFromEmail(email) {
  const local = email?.split('@')[0]?.trim();
  if (!local) {
    return DEMO_PROFILE.name;
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
        const displayName = name?.trim() || nameFromEmail(trimmed);
        setUser({
          ...DEMO_PROFILE,
          name: displayName,
          fullName: name?.trim() || DEMO_PROFILE.fullName,
          email: trimmed || DEMO_PROFILE.email,
        });
      },
      updateProfile(patch) {
        setUser((current) => ({ ...(current || DEMO_PROFILE), ...patch }));
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

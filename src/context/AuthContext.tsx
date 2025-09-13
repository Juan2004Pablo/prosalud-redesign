import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api from '@/services/api';

export interface AuthUser {
  id?: number | string;
  name?: string;
  email: string;
  // Extiende según tu backend
  [key: string]: any;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  getUser: () => Promise<AuthUser | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const getUser = useCallback(async () => {
    try {
      const { data } = await api.get<AuthUser>('/api/user');
      setUser(data);
      return data;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // 1) Asegura la cookie CSRF
    await api.get('/sanctum/csrf-cookie');
    // 2) Login
    await api.post('/api/login', { email, password });
    // 3) Cargar usuario
    await getUser();
  }, [getUser]);

  const logout = useCallback(async () => {
    try {
      await api.post('/api/logout');
    } finally {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        // Importante: primero obtiene el CSRF cookie para peticiones seguras
        await api.get('/sanctum/csrf-cookie');
        if (!isMounted) return;
        await getUser();
      } catch {
        // Ignorar
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [getUser]);

  const value = useMemo(() => ({ user, loading, login, getUser, logout }), [user, loading, login, getUser, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
};

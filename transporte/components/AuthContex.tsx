import React, { createContext, useState, ReactNode, useContext } from 'react';

// Definir los tipos para el contexto
interface AuthContextType {
  userId: number | null;
  login: (id: number) => void;
  logout: () => void;
}

// Crear el contexto con un valor por defecto
const AuthContex = createContext<AuthContextType | undefined>(undefined);

// Definir los tipos para las props del proveedor
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userId, setUserId] = useState<number | null>(null);

  const login = (id: number) => {
    setUserId(id);
  };

  const logout = () => {
    setUserId(null);
  };

  return (
    <AuthContex.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContex.Provider>
  );
};

// Custom hook para usar el contexto
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContex);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };

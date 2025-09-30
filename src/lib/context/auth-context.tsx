"use client"
import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";


type User = {
    name: string;
    email: string;
  };
  
type authContextType = {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;

  };
    

const AuthContext = createContext<authContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);
  return (
    <AuthContext.Provider
      value={{user, login, logout }}
    >
    {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
  };

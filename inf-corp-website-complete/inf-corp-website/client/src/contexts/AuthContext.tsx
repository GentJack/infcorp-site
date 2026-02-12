import React, { createContext, useContext, useEffect, useState } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  isAdmin?: boolean;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("inf-corp-user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("inf-corp-user");
      }
    }
    // Initialize admin user if not exists
    const users = JSON.parse(localStorage.getItem("inf-corp-users") || "[]");
    if (!users.some((u: any) => u.email === "Admin@gmail.com")) {
      users.push({
        id: "admin_001",
        email: "Admin@gmail.com",
        password: "admin@1",
        name: "Administrator",
        createdAt: new Date().toISOString(),
        isAdmin: true,
      });
      localStorage.setItem("inf-corp-users", JSON.stringify(users));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    const users = JSON.parse(localStorage.getItem("inf-corp-users") || "[]");
    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error("Invalid email or password");
    }

    const userData: User = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
      createdAt: foundUser.createdAt,
      isAdmin: foundUser.isAdmin || false,
    };

    setUser(userData);
    localStorage.setItem("inf-corp-user", JSON.stringify(userData));
  };

  const signup = async (email: string, password: string, name: string) => {
    const users = JSON.parse(localStorage.getItem("inf-corp-users") || "[]");

    // Check if user already exists
    if (users.some((u: any) => u.email === email)) {
      throw new Error("Email already registered");
    }

    const newUser = {
      id: `user_${Date.now()}`,
      email,
      password, // In production, this should be hashed
      name,
      createdAt: new Date().toISOString(),
      isAdmin: false,
    };

    users.push(newUser);
    localStorage.setItem("inf-corp-users", JSON.stringify(users));

    const userData: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      createdAt: newUser.createdAt,
      isAdmin: false,
    };

    setUser(userData);
    localStorage.setItem("inf-corp-user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("inf-corp-user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

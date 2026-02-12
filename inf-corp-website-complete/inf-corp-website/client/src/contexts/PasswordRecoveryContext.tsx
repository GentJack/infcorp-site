import React, { createContext, useContext, useState } from "react";

export interface PasswordResetToken {
  id: string;
  email: string;
  token: string;
  createdAt: string;
  expiresAt: string;
  used: boolean;
}

export interface PasswordRecoveryContextType {
  requestPasswordReset: (email: string) => Promise<{ token: string; resetLink: string }>;
  validateResetToken: (token: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  getResetTokenByEmail: (email: string) => PasswordResetToken | null;
}

const PasswordRecoveryContext = createContext<PasswordRecoveryContextType | undefined>(undefined);

export function PasswordRecoveryProvider({ children }: { children: React.ReactNode }) {
  const [resetTokens, setResetTokens] = useState<PasswordResetToken[]>(() => {
    const stored = localStorage.getItem("inf-corp-reset-tokens");
    return stored ? JSON.parse(stored) : [];
  });

  const generateToken = (): string => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const requestPasswordReset = async (email: string): Promise<{ token: string; resetLink: string }> => {
    // Check if user exists
    const users = JSON.parse(localStorage.getItem("inf-corp-users") || "[]");
    const userExists = users.some((u: any) => u.email === email);

    if (!userExists) {
      throw new Error("Email not found in our system");
    }

    // Generate reset token
    const token = generateToken();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours

    const resetToken: PasswordResetToken = {
      id: `reset_${Date.now()}`,
      email,
      token,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      used: false,
    };

    // Save token
    const updatedTokens = [...resetTokens, resetToken];
    setResetTokens(updatedTokens);
    localStorage.setItem("inf-corp-reset-tokens", JSON.stringify(updatedTokens));

    // In production, send email with reset link
    // For now, we'll return the token and link for demo purposes
    const resetLink = `/reset-password?token=${token}`;

    return { token, resetLink };
  };

  const validateResetToken = async (token: string): Promise<boolean> => {
    const resetToken = resetTokens.find((t) => t.token === token && !t.used);

    if (!resetToken) {
      return false;
    }

    // Check if token has expired
    const expiresAt = new Date(resetToken.expiresAt);
    const now = new Date();

    if (now > expiresAt) {
      return false;
    }

    return true;
  };

  const resetPassword = async (token: string, newPassword: string): Promise<void> => {
    // Validate token
    const isValid = await validateResetToken(token);
    if (!isValid) {
      throw new Error("Invalid or expired reset token");
    }

    // Find the reset token
    const resetToken = resetTokens.find((t) => t.token === token);
    if (!resetToken) {
      throw new Error("Reset token not found");
    }

    // Update user password
    const users = JSON.parse(localStorage.getItem("inf-corp-users") || "[]");
    const userIndex = users.findIndex((u: any) => u.email === resetToken.email);

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    users[userIndex].password = newPassword;
    localStorage.setItem("inf-corp-users", JSON.stringify(users));

    // Mark token as used
    const updatedTokens = resetTokens.map((t) =>
      t.id === resetToken.id ? { ...t, used: true } : t
    );
    setResetTokens(updatedTokens);
    localStorage.setItem("inf-corp-reset-tokens", JSON.stringify(updatedTokens));
  };

  const getResetTokenByEmail = (email: string): PasswordResetToken | null => {
    const token = resetTokens.find((t) => t.email === email && !t.used);
    return token || null;
  };

  return (
    <PasswordRecoveryContext.Provider
      value={{
        requestPasswordReset,
        validateResetToken,
        resetPassword,
        getResetTokenByEmail,
      }}
    >
      {children}
    </PasswordRecoveryContext.Provider>
  );
}

export function usePasswordRecovery() {
  const context = useContext(PasswordRecoveryContext);
  if (!context) {
    throw new Error("usePasswordRecovery must be used within PasswordRecoveryProvider");
  }
  return context;
}

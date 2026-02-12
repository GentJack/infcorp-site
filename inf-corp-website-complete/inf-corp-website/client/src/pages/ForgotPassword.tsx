import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { usePasswordRecovery } from "@/contexts/PasswordRecoveryContext";
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

export default function ForgotPassword() {
  const [, setLocation] = useLocation();
  const { requestPasswordReset } = usePasswordRecovery();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resetToken, setResetToken] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!email.trim()) {
        throw new Error("Please enter your email address");
      }

      const { token } = await requestPasswordReset(email);
      setResetToken(token);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process password reset request");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Check Your Email</h1>
            <p className="text-foreground/70 mb-6">
              We've sent a password reset link to <strong>{email}</strong>. The link will expire in 24 hours.
            </p>

            <div className="bg-secondary/30 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-foreground/70 mb-2">
                <strong>For Demo Purposes:</strong>
              </p>
              <p className="text-xs text-foreground/60 font-mono break-all">
                Reset Token: {resetToken}
              </p>
              <p className="text-xs text-foreground/60 mt-2">
                Use this token to reset your password on the reset page.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => setLocation("/reset-password")}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Go to Reset Password
              </Button>
              <Button
                onClick={() => setLocation("/login")}
                variant="outline"
                className="w-full"
              >
                Back to Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mb-8">
          <button
            onClick={() => setLocation("/login")}
            className="flex items-center gap-2 text-accent hover:opacity-80 transition-opacity mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Login
          </button>
          <h1 className="text-3xl font-bold mb-2">Forgot Password?</h1>
          <p className="text-foreground/60">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-foreground/40" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-2"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        {/* Additional Info */}
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-xs text-foreground/50 text-center">
            Remember your password?{" "}
            <button
              onClick={() => setLocation("/login")}
              className="text-accent font-medium hover:underline transition-colors"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

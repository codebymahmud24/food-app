import React, { useState } from "react";
import { LockKeyhole, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { password?: string; confirmPassword?: string } = {};
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match.";
    }
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setPassword("");
      setConfirmPassword("");
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-white to-orange-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-4 md:p-10 p-7 rounded-3xl bg-white/95 shadow-2xl border border-orange-100 animate-fadeIn backdrop-blur-md"
        style={{ backdropFilter: "blur(4px)" }}
      >
        <h2 className="font-extrabold text-3xl text-gray-800 mb-2 text-center">
          Reset Password
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Enter your new password below.
        </p>
        {success ? (
          <div className="text-green-600 text-center mb-6">
            Your password has been reset!<br />
            <Link to="/login" className="text-orange-600 hover:underline font-semibold">
              Go to Login
            </Link>
          </div>
        ) : (
          <>
            {/* Password */}
            <div className="mb-6 relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={`pl-12 pr-12 py-3 rounded-xl border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange-100 transition shadow-sm ${formErrors.password ? "border-red-400" : ""}`}
                autoComplete="new-password"
                required
              />
              <LockKeyhole className="absolute top-3 left-4 text-orange-400 pointer-events-none h-5 w-5" />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(v => !v)}
                className="absolute top-2.5 right-4 text-orange-400 hover:text-orange-600 transition"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              {formErrors.password && (
                <span className="block mt-1 ml-12 text-xs text-red-500">{formErrors.password}</span>
              )}
            </div>
            {/* Confirm Password */}
            <div className="mb-7 relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className={`pl-12 pr-12 py-3 rounded-xl border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange-100 transition shadow-sm ${formErrors.confirmPassword ? "border-red-400" : ""}`}
                autoComplete="new-password"
                required
              />
              <LockKeyhole className="absolute top-3 left-4 text-orange-400 pointer-events-none h-5 w-5" />
              <button
                type="button"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                onClick={() => setShowConfirmPassword(v => !v)}
                className="absolute top-2.5 right-4 text-orange-400 hover:text-orange-600 transition"
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              {formErrors.confirmPassword && (
                <span className="block mt-1 ml-12 text-xs text-red-500">{formErrors.confirmPassword}</span>
              )}
            </div>
            {/* Submit Button */}
            <div className="mb-7">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-400 rounded-xl py-3 text-lg font-semibold shadow transition"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </div>
          </>
        )}
        <div className="text-center mt-4">
          <Link to="/login" className="text-orange-600 hover:underline font-semibold">
            Back to Login
          </Link>
        </div>
      </form>
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1);
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
};

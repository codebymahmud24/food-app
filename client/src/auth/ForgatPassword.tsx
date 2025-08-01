import React, { useState } from "react";
import { Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export const ForgatPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
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
          Forgot Password
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Enter your email address and we'll send you a reset link.
        </p>
        {sent ? (
          <div className="text-green-600 text-center mb-6">
            If an account exists for <b>{email}</b>, a reset link has been sent.
          </div>
        ) : (
          <>
            <div className="mb-6 relative">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`pl-12 py-3 rounded-xl border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange-100 transition shadow-sm ${
                  error ? "border-red-400" : ""
                }`}
                autoComplete="email"
                required
              />
              <Mail className="absolute top-3 left-4 text-orange-400 pointer-events-none h-5 w-5" />
              {error && (
                <span className="block mt-1 ml-12 text-xs text-red-500">
                  {error}
                </span>
              )}
            </div>
            <div className="mb-6">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-400 rounded-xl py-3 text-lg font-semibold shadow transition"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Email"
                )}
              </Button>
            </div>
          </>
        )}
        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-orange-600 hover:underline font-semibold"
          >
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

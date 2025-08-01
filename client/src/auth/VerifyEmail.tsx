import React, { useRef, useState } from 'react'
import { MailCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create refs for each input
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) {
      // If empty, just update and don't move focus
      const newOtp = [...otp];
      newOtp[idx] = "";
      setOtp(newOtp);
      return;
    }
    const newOtp = [...otp];
    newOtp[idx] = value[0];
    setOtp(newOtp);
    // Move to next input if not last and value entered
    if (value && idx < 5) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace") {
      if (otp[idx] === "") {
        if (idx > 0) {
          inputsRef.current[idx - 1]?.focus();
        }
      } else {
        const newOtp = [...otp];
        newOtp[idx] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    } else if (e.key === "ArrowRight" && idx < 5) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (paste.length === 6) {
      setOtp(paste.split(""));
      setTimeout(() => {
        inputsRef.current[5]?.focus();
      }, 0);
      e.preventDefault();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter the 6-digit OTP sent to your email.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-white to-orange-200">
      <div className="w-full max-w-md mx-4 md:p-10 p-7 rounded-3xl bg-white/95 shadow-2xl border border-orange-100 animate-fadeIn backdrop-blur-md text-center">
        <MailCheck className="mx-auto h-16 w-16 text-orange-500 mb-6 drop-shadow-lg" />
        <h2 className="font-extrabold text-3xl text-gray-800 mb-2">
          Verify Your Email
        </h2>
        <p className="text-gray-500 mb-6">
          Enter the 6-digit OTP sent to your email address to verify your account.
        </p>
        {success ? (
          <div className="text-green-600 text-center mb-6">
            Your email has been verified!<br />
            <Link to="/login" className="text-orange-600 hover:underline font-semibold">
              Go to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleVerify}>
            <div className="mb-6 flex justify-center gap-2">
              {otp.map((digit, idx) => (
                <Input
                  key={idx}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleChange(e, idx)}
                  onKeyDown={e => handleKeyDown(e, idx)}
                  onPaste={handlePaste}
                  ref={el => { inputsRef.current[idx] = el; }}
                  className={`w-12 h-12 text-center text-xl font-bold border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange-100 transition shadow-sm ${error ? "border-red-400" : ""}`}
                  autoFocus={idx === 0}
                />
              ))}
            </div>
            {error && (
              <span className="block mt-1 text-xs text-red-500">{error}</span>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-400 rounded-xl py-3 text-lg font-semibold shadow transition mb-4"
            >
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </form>
        )}
        <div className="text-sm text-gray-500">
          Didn&apos;t receive the email?&nbsp;
          <button
            type="button"
            className="text-orange-600 hover:underline font-semibold"
            // onClick={handleResend} // Add resend logic if needed
            disabled
          >
            Resend
          </button>
        </div>
      </div>
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
  )
}

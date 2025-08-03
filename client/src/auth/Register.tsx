import React, { useState } from "react";
import {
  Mail,
  LockKeyhole,
  Loader2,
  UtensilsCrossed,
  Eye,
  EyeOff,
  User,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { registerSchema } from "@/schema/userSchema";
import type { RegisterFormData } from "@/schema/userSchema";

// Define a dedicated error type for form errors
type RegisterFormErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  contactNumber?: string;
  termsAccepted?: string;
};

export const Register = () => {
  const [input, setInput] = useState<RegisterFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    termsAccepted: false,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<RegisterFormErrors>({});

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setInput({
        ...input,
        termsAccepted: checked,
      });
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }
    setFormErrors({});
  };

  const registerSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate with zod
    const result = registerSchema.safeParse({ ...input });
    if (!result.success) {
      // Collect errors
      const errors: RegisterFormErrors = {};
      result.error.issues.forEach((err) => {
        if (err.path.length) {
          errors[String(err.path[0]) as keyof RegisterFormErrors] = err.message;
        }
      });
      setFormErrors(errors);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setInput({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        contactNumber: "",
        termsAccepted: false,
      });
      setFormErrors({});
      // You can show a success message here if needed
    }, 1500);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-white to-orange-200"
      style={{
        backgroundImage:
          "radial-gradient(circle at 80% 20%, #ffe5b4 0%, transparent 60%), radial-gradient(circle at 20% 80%, #ffd6d6 0%, transparent 60%)",
      }}
    >
      <form
        onSubmit={registerSubmitHandler}
        className="w-full max-w-md mx-4 md:p-10 p-7 rounded-3xl bg-white/95 shadow-2xl border border-orange-100 animate-fadeIn backdrop-blur-md"
        style={{ backdropFilter: "blur(4px)" }}
      >
        <div className="mb-8 text-center flex flex-col items-center">
          <UtensilsCrossed className="h-14 w-14 text-orange mb-3 drop-shadow-lg" />
          <h1 className="font-extrabold text-4xl text-gray-800 tracking-tight mb-2">
            Food Delivery App
          </h1>
          <span className="text-gray-400 text-base">Create your account</span>
        </div>

        {/* Full Name */}
        <div className="mb-6 relative">
          <Input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={input.fullName}
            onChange={changeEventHandler}
            className={`pl-12 py-3 rounded-xl border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange-100 transition shadow-sm ${
              formErrors.fullName ? "border-red-400" : ""
            }`}
            autoComplete="name"
          />
          <User className="absolute top-3 left-4 text-orange-400 pointer-events-none h-5 w-5" />
          {formErrors.fullName && (
            <span className="block mt-1 ml-12 text-xs text-red-500">
              {formErrors.fullName}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="mb-6 relative">
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className={`pl-12 py-3 rounded-xl border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange-100 transition shadow-sm ${
              formErrors.email ? "border-red-400" : ""
            }`}
            autoComplete="email"
          />
          <Mail className="absolute top-3 left-4 text-orange-400 pointer-events-none h-5 w-5" />
          {formErrors.email && (
            <span className="block mt-1 ml-12 text-xs text-red-500">
              {formErrors.email}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className={`pl-12 pr-12 py-3 rounded-xl border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange-100 transition shadow-sm ${
              formErrors.password ? "border-red-400" : ""
            }`}
            autoComplete="new-password"
          />
          <LockKeyhole className="absolute top-3 left-4 text-orange-400 pointer-events-none h-5 w-5" />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((v) => !v)}
            className="absolute top-2.5 right-4 text-orange-400 hover:text-orange-600 transition"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
          {formErrors.password && (
            <span className="block mt-1 ml-12 text-xs text-red-500">
              {formErrors.password}
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-6 relative">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={changeEventHandler}
            className={`pl-12 pr-12 py-3 rounded-xl border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange-100 transition shadow-sm ${
              formErrors.confirmPassword ? "border-red-400" : ""
            }`}
            autoComplete="new-password"
          />
          <LockKeyhole className="absolute top-3 left-4 text-orange-400 pointer-events-none h-5 w-5" />
          <button
            type="button"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            onClick={() => setShowConfirmPassword((v) => !v)}
            className="absolute top-2.5 right-4 text-orange-400 hover:text-orange-600 transition"
            tabIndex={-1}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
          {formErrors.confirmPassword && (
            <span className="block mt-1 ml-12 text-xs text-red-500">
              {formErrors.confirmPassword}
            </span>
          )}
        </div>

        {/* Contact Number */}
        <div className="mb-6 relative">
          <Input
            type="tel"
            placeholder="Contact Number"
            name="contactNumber"
            value={input.contactNumber}
            onChange={changeEventHandler}
            className={`pl-12 py-3 rounded-xl border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange-100 transition shadow-sm ${
              formErrors.contactNumber ? "border-red-400" : ""
            }`}
            autoComplete="tel"
          />
          <Phone className="absolute top-3 left-4 text-orange-400 pointer-events-none h-5 w-5" />
          {formErrors.contactNumber && (
            <span className="block mt-1 ml-12 text-xs text-red-500">
              {formErrors.contactNumber}
            </span>
          )}
        </div>

        {/* Terms & Conditions */}
        <div className="mb-7 ">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              name="termsAccepted"
              checked={input.termsAccepted}
              onChange={changeEventHandler}
              className="mr-2 accent-orange-500"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I accept the&nbsp;
              <a
                href="/terms"
                target="_blank"
                className="text-orange-600 hover:underline font-semibold"
              >
                Terms & Conditions
              </a>
            </label>
          </div>
          {formErrors.termsAccepted && (
            <span className="block mt-1 ml-5 text-xs text-red-500">
              {formErrors.termsAccepted}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div className="mb-7">
          {loading ? (
            <Button
              disabled
              className="w-full bg-orange hover:bg-hoverOrange rounded-xl py-3 text-lg font-semibold shadow"
            >
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-400 rounded-xl py-3 text-lg font-semibold shadow transition"
            >
              Register
            </Button>
          )}
        </div>

        <Separator>
          <span className="text-gray-400 text-xs px-2">or</span>
        </Separator>

        {/* Login link */}
        <p className="mt-7 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-600 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
      {/* Modern fade-in animation */}
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

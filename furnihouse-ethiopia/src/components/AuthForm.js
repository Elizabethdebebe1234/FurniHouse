
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

import { useAuth } from "@/components/AuthProvider";
import { useLanguage } from "@/components/LanguageProvider";

export default function AuthForm({
  mode = "login",
  role = "customer",
}) {
  const { login, register } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const isRegister = mode === "register";
  const isAdmin = role === "admin";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (loading) return;

    if (isRegister) {
      if (name.trim().length < 2) {
        setError(t("authNameError"));
        return;
      }

      if (password.length < 8) {
        setError(t("authPasswordError"));
        return;
      }

      if (password !== confirmPassword) {
        setError(t("authPasswordMismatch"));
        return;
      }
    }

    setLoading(true);

    try {
      const result = isRegister
        ? register(name, email, password)
        : login(email, password, role);

      if (!result.success) {
        setError(result.message || t("authGenericError"));
        setLoading(false);
        return;
      }

      router.replace(isAdmin ? "/admin" : "/account");
      router.refresh();
    } catch {
      setError(t("authRequestError"));
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-[#deded5] bg-[#FCFCF9] py-3.5 pl-11 pr-12 text-sm text-[#242820] outline-none transition placeholder:text-gray-400 focus:border-[#173D2E] focus:ring-2 focus:ring-[#173D2E]/10";

  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#F8F6EF] px-4 py-14">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#C69B5C]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#173D2E]/10 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-2xl border border-[#e9e5da] bg-white shadow-xl md:grid-cols-2">
        {/* LEFT INFORMATION PANEL */}
        <section className="relative hidden min-h-[620px] flex-col justify-between overflow-hidden bg-[#173D2E] p-10 text-white md:flex">
          <div className="absolute -right-20 top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -right-10 top-32 h-44 w-44 rounded-full border border-white/10" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#C69B5C]/10 blur-2xl" />

          <div className="relative z-10">
            <Link href="/" className="inline-block">
              <p className="text-3xl font-bold tracking-tight">
                FurniHouse
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.4em] text-[#D6B77D]">
                Ethiopia
              </p>
            </Link>
          </div>

          <div className="relative z-10 max-w-sm">
            <div className="mb-6 h-1 w-14 rounded-full bg-[#C69B5C]" />

            <h2 className="text-4xl font-semibold leading-tight">
              {isAdmin
                ? t("authAdminHeadline")
                : t("authCustomerHeadline")}
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/70">
              {isAdmin
                ? t("authAdminStory")
                : t("authCustomerStory")}
            </p>
          </div>

          <div className="relative z-10 border-t border-white/15 pt-5">
            <p className="text-xs tracking-wide text-white/60">
              {t("announcement")}
            </p>
          </div>
        </section>

        {/* RIGHT FORM PANEL */}
        <section className="flex items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-md">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#173D2E]"
            >
              <ArrowLeft size={16} />
              {t("authBackHome")}
            </Link>

            <div className="mb-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#173D2E]/10 text-[#173D2E]">
                {isAdmin ? (
                  <ShieldCheck size={24} />
                ) : isRegister ? (
                  <UserRound size={24} />
                ) : (
                  <LockKeyhole size={24} />
                )}
              </div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#B28A4D]">
                {isAdmin
                  ? t("authAdministration")
                  : t("authCustomerAccount")}
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-[#173D2E]">
                {isAdmin
                  ? t("authAdminPortal")
                  : isRegister
                    ? t("authCreateAccount")
                    : t("authWelcomeBack")}
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                {isAdmin
                  ? t("authAdminDescription")
                  : isRegister
                    ? t("authRegisterDescription")
                    : t("authCustomerDescription")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* FULL NAME - REGISTER ONLY */}
              {isRegister && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#30352E]">
                    {t("authFullName")}
                  </label>

                  <div className="relative">
                    <UserRound
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      autoComplete="name"
                      required
                      minLength={2}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("authFullNamePlaceholder")}
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              {/* EMAIL OR ADMIN USERNAME */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#30352E]">
                  {isAdmin
                    ? t("authAdminUsername")
                    : t("authEmail")}
                </label>

                <div className="relative">
                  {isAdmin ? (
                    <UserRound
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  ) : (
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  )}

                  <input
                    type={isAdmin ? "text" : "email"}
                    autoComplete={isAdmin ? "username" : "email"}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      isAdmin
                        ? t("authAdminUsernamePlaceholder")
                        : t("authEmailPlaceholder")
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#30352E]">
                  {t("authPassword")}
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete={
                      isRegister ? "new-password" : "current-password"
                    }
                    required
                    minLength={isRegister ? 8 : 1}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("authPasswordPlaceholder")}
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword
                        ? t("authHidePassword")
                        : t("authShowPassword")
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#173D2E]"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {isRegister && (
                  <p className="mt-2 text-xs text-gray-400">
                    {t("authPasswordHint")}
                  </p>
                )}
              </div>

              {/* CONFIRM PASSWORD - REGISTER ONLY */}
              {isRegister && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#30352E]">
                    {t("authConfirmPassword")}
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type={showConfirm ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={t("authConfirmPasswordPlaceholder")}
                      className={inputClass}
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      aria-label={
                        showConfirm
                          ? t("authHidePassword")
                          : t("authShowPassword")
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#173D2E]"
                    >
                      {showConfirm ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* ERROR MESSAGE */}
              {error && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#173D2E] px-5 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#102B21] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? t("authPleaseWait")
                  : isAdmin
                    ? t("authAdminSubmit")
                    : isRegister
                      ? t("authRegisterSubmit")
                      : t("authLoginSubmit")}
              </button>
            </form>

            {/* CUSTOMER LOGIN / REGISTER LINKS */}
            {!isAdmin && (
              <div className="mt-7 text-center text-sm text-gray-500">
                {isRegister ? (
                  <>
                    {t("authAlreadyAccount")}{" "}
                    <Link
                      href="/login"
                      className="font-semibold text-[#173D2E] hover:underline"
                    >
                      {t("authSignIn")}
                    </Link>
                  </>
                ) : (
                  <>
                    {t("authNewCustomer")}{" "}
                    <Link
                      href="/register"
                      className="font-semibold text-[#173D2E] hover:underline"
                    >
                      {t("authCreateAccountLink")}
                    </Link>
                  </>
                )}
              </div>
            )}

            {/* ADMIN NOTICE */}
            {isAdmin && (
              <div className="mt-6 rounded-lg bg-[#F8F6EF] p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#173D2E]">
                  <ShieldCheck size={17} />
                  {t("authAuthorized")}
                </div>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {t("authAuthorizedDescription")}
                </p>
              </div>
            )}

            {/* CUSTOMER NOTICE */}
            {!isAdmin && (
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                <CheckCircle2 size={14} />
                {t("authCustomerPromise")}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

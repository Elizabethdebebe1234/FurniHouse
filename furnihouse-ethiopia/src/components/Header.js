
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ShoppingBag,
  Globe,
  UserRound,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";
import { useAuth } from "@/components/AuthProvider";

const headerTranslations = {
  en: {
    adminSignIn: "Admin Sign In",
    customerSignIn: "Customer Sign In",
    adminDashboard: "Admin Dashboard",
    myAccount: "My Account",
    logout: "Logout",
    language: "Choose language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  am: {
    adminSignIn: "የአስተዳዳሪ መግቢያ",
    customerSignIn: "የደንበኛ መግቢያ",
    adminDashboard: "የአስተዳዳሪ ዳሽቦርድ",
    myAccount: "የእኔ መለያ",
    logout: "ውጣ",
    language: "ቋንቋ ይምረጡ",
    openMenu: "ምናሌ ክፈት",
    closeMenu: "ምናሌ ዝጋ",
  },
  om: {
    adminSignIn: "Seensa Bulchaa",
    customerSignIn: "Seensa Maamilaa",
    adminDashboard: "Daashboordii Bulchaa",
    myAccount: "Herrega Koo",
    logout: "Ba'i",
    language: "Afaan filadhu",
    openMenu: "Baafata bani",
    closeMenu: "Baafata cufi",
  },
};

export default function Header() {
  const { language, changeLanguage, t } = useLanguage();
  const { user, ready, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const ht = (key) =>
    headerTranslations[language]?.[key] ||
    headerTranslations.en[key];

  const navItems = [
    { label: t("home"), href: "/" },
    { label: t("shop"), href: "/products" },
    { label: t("collections"), href: "/#categories" },
    { label: t("custom"), href: "/custom" },
    { label: t("about"), href: "/#about" },
    { label: t("contact"), href: "/#contact" },
  ];

  const languages = [
    { code: "en", label: "EN" },
    { code: "am", label: "አማ" },
    { code: "om", label: "OR" },
  ];

  const dashboardLink =
    user?.role === "admin" ? "/admin" : "/account";

  function closeMenu() {
    setMenuOpen(false);
  }

  function AccountActions({ mobile = false }) {
    const linkStyle = mobile
      ? "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold"
      : "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition";

    return (
      <div className={mobile ? "flex flex-col gap-2" : "flex items-center gap-2"}>
        {!ready ? null : user ? (
          <>
            <Link
              href={dashboardLink}
              onClick={closeMenu}
              className={`${linkStyle} ${
                mobile
                  ? "bg-[#173D2E] text-white"
                  : "border border-[#173D2E] text-[#173D2E] hover:bg-[#173D2E] hover:text-white"
              }`}
            >
              <UserRound size={17} />
              {user.role === "admin"
                ? ht("adminDashboard")
                : ht("myAccount")}
            </Link>

            <button
              onClick={() => {
                logout();
                closeMenu();
              }}
              className={`${linkStyle} text-red-700 hover:bg-red-50`}
            >
              <LogOut size={17} />
              {ht("logout")}
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              onClick={closeMenu}
              className={`${linkStyle} ${
                mobile
                  ? "bg-[#173D2E] text-white"
                  : "bg-[#173D2E] text-white hover:bg-[#102B21]"
              }`}
            >
              <UserRound size={17} />
              {ht("customerSignIn")}
            </Link>

            <Link
              href="/admin/login"
              onClick={closeMenu}
              className={`${linkStyle} ${
                mobile
                  ? "border border-[#C69B5C] text-[#173D2E]"
                  : "border border-[#C69B5C] text-[#173D2E] hover:bg-[#C69B5C]/10"
              }`}
            >
              <ShieldCheck size={17} />
              {ht("adminSignIn")}
            </Link>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#102B21] px-4 py-2 text-center text-xs tracking-wide text-white">
        {t("announcement")}
      </div>

      <header className="sticky top-0 z-50 border-b border-[#e9e5da] bg-[#F8F6EF]/95 backdrop-blur-md">
        <div className="container-width flex min-h-[82px] items-center justify-between gap-4 px-5">
          <Link href="/" className="flex shrink-0 flex-col">
            <span className="text-2xl font-bold tracking-tight text-[#173D2E]">
              FurniHouse
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#806044]">
              Ethiopia
            </span>
          </Link>

          <nav className="hidden items-center gap-5 xl:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-sm font-medium text-[#242820] transition hover:text-[#C69B5C]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="flex items-center gap-1">
              <Globe size={16} className="text-[#806044]" />

              <select
                value={language}
                onChange={(event) => changeLanguage(event.target.value)}
                aria-label={ht("language")}
                className="cursor-pointer bg-transparent text-sm font-medium outline-none"
              >
                {languages.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <Link
              href="/cart"
              aria-label={t("cart")}
              className="rounded-full p-2 text-[#173D2E] transition hover:bg-[#e9e5da]"
            >
              <ShoppingBag size={20} />
            </Link>

            <AccountActions />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/cart"
              aria-label={t("cart")}
              className="rounded-full p-2 text-[#173D2E]"
            >
              <ShoppingBag size={20} />
            </Link>

            <select
              value={language}
              onChange={(event) => changeLanguage(event.target.value)}
              aria-label={ht("language")}
              className="max-w-[60px] bg-transparent text-sm outline-none"
            >
              {languages.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? ht("closeMenu") : ht("openMenu")}
              className="rounded-full p-2 text-[#173D2E]"
            >
              {menuOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-[#e9e5da] bg-[#F8F6EF] px-5 py-5 shadow-lg lg:hidden">
            <nav className="mb-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="text-sm font-medium text-[#242820] transition hover:text-[#C69B5C]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="border-t border-[#e9e5da] pt-5">
              <AccountActions mobile />
            </div>
          </div>
        )}
      </header>
    </>
  );
}

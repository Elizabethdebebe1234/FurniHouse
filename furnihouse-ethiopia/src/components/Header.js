
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, Globe } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function Header() {
  const { language, changeLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <>
      <div className="bg-[#102B21] px-4 py-2 text-center text-xs tracking-wide text-white">
        {t("announcement")}
      </div>

      <header className="sticky top-0 z-50 border-b border-[#e9e5da] bg-[#F8F6EF]">
        <div className="container-width flex min-h-[82px] items-center justify-between px-5">

          <Link href="/" className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-[#173D2E]">
              FurniHouse
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#806044]">
              Ethiopia
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[#242820] transition hover:text-[#C69B5C]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <div className="flex items-center gap-2">
              <Globe size={17} className="text-[#806044]" />
              <select
                value={language}
                onChange={(event) => changeLanguage(event.target.value)}
                aria-label={t("language")}
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
              className="rounded-full p-2 transition hover:bg-[#e9e5da]"
            >
              <ShoppingBag size={21} />
            </Link>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <select
              value={language}
              onChange={(event) => changeLanguage(event.target.value)}
              aria-label={t("language")}
              className="max-w-[65px] bg-transparent text-sm outline-none"
            >
              {languages.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="rounded-full p-2"
            >
              {menuOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-[#e9e5da] bg-[#F8F6EF] px-6 py-5 lg:hidden">
            <div className="flex flex-col gap-5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-[#242820]"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/cart"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-medium text-[#173D2E]"
              >
                <ShoppingBag size={18} />
                {t("cart")}
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

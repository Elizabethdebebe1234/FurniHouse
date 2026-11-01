"use client"
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  const categoryLinks = [
    { label: t("beds"), href: "/products?category=beds" },
    { label: t("doors"), href: "/products?category=doors" },
    { label: t("storage"), href: "/products?category=storage" },
    { label: t("living"), href: "/products?category=living" },
  ];

  return (
    <footer className="bg-[#102B21] px-6 py-16 text-white">
      <div className="container-width">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          <div>
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-bold">FurniHouse</h2>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-[#C69B5C]">
                Ethiopia
              </p>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-white/65">
              {t("footerDescription")}
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold tracking-wider text-[#C69B5C]">
              {t("quickLinks")}
            </h3>

            <div className="flex flex-col gap-3 text-sm text-white/75">
              <Link href="/" className="hover:text-white">{t("home")}</Link>
              <Link href="/products" className="hover:text-white">{t("shop")}</Link>
              <Link href="/#custom" className="hover:text-white">{t("custom")}</Link>
              <Link href="/#about" className="hover:text-white">{t("about")}</Link>
              <Link href="/#contact" className="hover:text-white">{t("contact")}</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold tracking-wider text-[#C69B5C]">
              {t("categories")}
            </h3>

            <div className="flex flex-col gap-3 text-sm text-white/75">
              {categoryLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold tracking-wider text-[#C69B5C]">
              {t("contactUs")}
            </h3>

            <p className="text-sm leading-7 text-white/75">
              {t("footerDescription")}
            </p>
          </div>

        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/15 pt-7 text-xs text-white/55 sm:flex-row">
          <p>© 2026 FurniHouse Ethiopia. {t("madeIn")}</p>
          <p>{t("currency")}</p>
        </div>

      </div>
    </footer>
  );
}

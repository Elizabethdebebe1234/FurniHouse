
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import {
  ArrowRight,
  ShoppingBag,
  Heart,
  Hammer,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";
import { categories, products } from "@/data/products";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-ET").format(price) + " ETB";

export default function Home() {
  const { t } = useLanguage();

  const [favorites, setFavorites] = useState([]);
  const [addedProductId, setAddedProductId] = useState(null);

  function toggleFavorite(id) {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  function handleAddToCart(product) {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("furnihouse-cart") || "[]"
      );

      const existingItem = savedCart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        savedCart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        });
      }

      localStorage.setItem(
        "furnihouse-cart",
        JSON.stringify(savedCart)
      );

      window.dispatchEvent(new Event("cartUpdated"));

      setAddedProductId(product.id);

    } catch (error) {
      console.error("Could not add product to cart:", error);
    }
  }

  return (
    <main className="overflow-hidden">

      {/* Hero */}
      <section
        id="home"
        className="relative flex min-h-[650px] items-center bg-[#173d2e]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(13,37,27,.94) 0%, rgba(13,37,27,.78) 48%, rgba(13,37,27,.12) 100%), url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2000&q=90')",
          }}
        />

        <div className="container-width relative z-10 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-[650px]"
          >
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[#c69b5c]" />

              <span className="text-[11px] font-bold tracking-[4px] text-[#dfc18e]">
                {t("heroLabel")}
              </span>
            </div>

            <h1 className="mb-7 font-serif text-5xl leading-[1.15] text-[#fffaf0] sm:text-6xl lg:text-7xl">
              {t("heroTitle")}
            </h1>

            <p className="mb-9 max-w-[490px] text-sm leading-8 text-[#e4e5db] sm:text-base">
              {t("heroDescription")}
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#categories" className="gold-button">
                {t("explore")}
                <ArrowRight size={16} />
              </a>

              <a
                href="#custom"
                className="inline-flex items-center gap-2 border border-white/60 px-6 py-4 text-xs font-bold tracking-wide text-white transition hover:bg-white hover:text-[#173d2e]"
              >
                {t("customButton")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="section-padding">
        <div className="container-width">

          <div className="mb-12 text-center">
            <p className="eyebrow mb-4">
              {t("categoriesLabel")}
            </p>

            <h2 className="section-title">
              {t("categoriesTitle")}
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#77766e]">
              {t("categoriesDescription")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {categories.map((category, index) => (
              <motion.a
                key={category.id}
                href={`/products?category=${category.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group"
              >
                <div className="product-image relative mb-4 aspect-[4/5] overflow-hidden bg-[#e7e0d3]">
                  <div
                    role="img"
                    aria-label={t(category.nameKey)}
                    className="image-cover bg-cover bg-center"
                    style={{
                      backgroundImage: `url("${category.image}")`,
                    }}
                  />

                  <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                </div>

                <h3 className="text-center font-serif text-lg text-[#173d2e] transition group-hover:text-[#b48a4e]">
                  {t(category.nameKey)}
                </h3>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section id="products" className="bg-white py-24">
        <div className="container-width">

          <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow mb-4">
                {t("featuredLabel")}
              </p>

              <h2 className="section-title">
                {t("featuredTitle")}
              </h2>

              <p className="mt-4 text-sm text-[#77766e]">
                {t("featuredDescription")}
              </p>
            </div>

            <a href="/products" className="outline-button w-fit">
              {t("viewAll")}
              <ArrowRight size={15} className="ml-2" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">

            {products.slice(0, 4).map((product) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="product-image relative aspect-[4/5] overflow-hidden bg-[#f0eee7]">

                  <a href={`/products/${product.id}`}>
                    <div
                      role="img"
                      aria-label={product.name}
                      className="image-cover bg-cover bg-center"
                      style={{
                        backgroundImage: `url("${product.image}")`,
                      }}
                    />
                  </a>

                  {product.badge && (
                    <span className="absolute left-4 top-4 bg-[#173d2e] px-3 py-2 text-[9px] font-bold tracking-widest text-white">
                      {product.badge}
                    </span>
                  )}

                  <button
                    onClick={() => toggleFavorite(product.id)}
                    aria-label="Add to favorites"
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#173d2e] shadow-sm transition hover:bg-[#173d2e] hover:text-white"
                  >
                    <Heart
                      size={17}
                      fill={
                        favorites.includes(product.id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="absolute bottom-0 left-0 w-full translate-y-full bg-[#173d2e] py-4 text-[10px] font-bold tracking-widest text-white transition duration-300 group-hover:translate-y-0"
                  >
                    {addedProductId === product.id
                      ? t("addedToCart")
                      : t("addToCart")}

                    <ShoppingBag size={14} className="ml-2 inline" />
                  </button>
                </div>

                <div className="pt-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#a18a6a]">
                    {t(product.category)}
                  </p>

                  <h3 className="font-serif text-xl text-[#173d2e]">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-sm font-bold text-[#806044]">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </motion.article>
            ))}

          </div>

          <p className="mt-8 text-center text-xs text-[#99958b]">
            {t("demoNotice")}
          </p>

        </div>
      </section>

      {/* Custom furniture */}
      <section
        id="custom"
        className="section-padding bg-[#173d2e] text-white"
      >
        <div className="container-width grid items-center gap-12 md:grid-cols-2">

          <div className="relative">
            <div
              className="aspect-[5/4] bg-cover bg-center"
              role="img"
              aria-label={t("customTitle")}
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85')",
              }}
            />

            <div className="absolute -bottom-5 -right-5 hidden border border-[#c69b5c] bg-[#102b21] p-6 md:block">
              <p className="font-serif text-2xl italic text-[#e1c18c]">
                {t("customTitle")}
              </p>
            </div>
          </div>

          <div className="py-5">
            <p className="eyebrow mb-5">
              {t("customLabel")}
            </p>

            <h2 className="mb-6 font-serif text-4xl leading-tight text-[#fffaf0] sm:text-5xl">
              {t("customTitle")}
            </h2>

            <p className="mb-9 text-sm leading-8 text-[#d7ded5]">
              {t("customDescription")}
            </p>

            <a href="#contact" className="gold-button">
              {t("requestQuote")}
              <ArrowRight size={16} />
            </a>
          </div>

        </div>
      </section>

      {/* Why choose us */}
      <section id="about" className="section-padding">
        <div className="container-width">

          <div className="mb-14 text-center">
            <p className="eyebrow mb-4">
              {t("whyLabel")}
            </p>

            <h2 className="section-title">
              {t("whyTitle")}
            </h2>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: Hammer,
                title: t("quality"),
                description: t("qualityDescription"),
              },
              {
                icon: Sparkles,
                title: t("design"),
                description: t("designDescription"),
              },
              {
                icon: ShieldCheck,
                title: t("service"),
                description: t("serviceDescription"),
              },
              {
                icon: Truck,
                title: t("delivery"),
                description: t("deliveryDescription"),
              },
            ].map((item, index) => (
              <div key={index} className="text-center">

                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#e8eee8] text-[#173d2e]">
                  <item.icon size={27} strokeWidth={1.5} />
                </div>

                <h3 className="mb-3 font-serif text-xl text-[#173d2e]">
                  {item.title}
                </h3>

                <p className="text-sm leading-7 text-[#77766e]">
                  {item.description}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>

    </main>
  );
}

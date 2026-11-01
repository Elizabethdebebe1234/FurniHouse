
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  X,
} from "lucide-react";

import { categories, products } from "@/data/products";
import { useLanguage } from "@/components/LanguageProvider";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-ET").format(price) + " ETB";

export default function ProductsPage() {
  const { t } = useLanguage();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "all") {
      result = result.filter(
        (product) => product.category === activeCategory
      );
    }

    if (search.trim()) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortOrder === "low-high") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, activeCategory, sortOrder]);

  return (
    <main className="min-h-screen bg-[#F8F6EF] text-[#242820]">

      {/* Page heading */}
      <section className="bg-[#173D2E] px-6 py-20 text-center text-white">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#C69B5C]">
          FurniHouse Ethiopia
        </p>

        <h1 className="mb-5 text-4xl font-semibold md:text-6xl">
          {t("shopTitle")}
        </h1>

        <p className="mx-auto max-w-2xl text-sm leading-7 text-white/75 md:text-base">
          {t("shopDescription")}
        </p>
      </section>

      <section className="container-width section-padding">

        {/* Search and sorting */}
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="relative w-full lg:max-w-md">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full rounded-full border border-[#dedbd0] bg-white py-4 pl-12 pr-12 outline-none transition focus:border-[#173D2E]"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                aria-label={t("clearFilters")}
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <ArrowUpDown
              size={18}
              className="text-[#806044]"
            />

            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="rounded-full border border-[#dedbd0] bg-white px-5 py-3 outline-none"
              aria-label={t("sortProducts")}
            >
              <option value="default">
                {t("featured")}
              </option>

              <option value="low-high">
                {t("priceLowHigh")}
              </option>

              <option value="high-low">
                {t("priceHighLow")}
              </option>
            </select>
          </div>
        </div>

        {/* Category filters */}
        <div className="mb-8">

          <div className="mb-4 flex items-center gap-2 text-sm font-medium">
            <SlidersHorizontal size={17} />
            {t("browseCategory")}
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={() => setActiveCategory("all")}
              className={`rounded-full px-5 py-3 text-sm transition ${
                activeCategory === "all"
                  ? "bg-[#173D2E] text-white"
                  : "border border-[#dedbd0] bg-white hover:border-[#173D2E]"
              }`}
            >
              {t("allFurniture")}
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full px-5 py-3 text-sm transition ${
                  activeCategory === category.id
                    ? "bg-[#173D2E] text-white"
                    : "border border-[#dedbd0] bg-white hover:border-[#173D2E]"
                }`}
              >
                {t(category.nameKey)}
              </button>
            ))}

          </div>
        </div>

        {/* Product count */}
        <div className="mb-6 flex items-center justify-between border-b border-[#dedbd0] pb-5">

          <p className="text-sm text-gray-600">
            {t("showing")}{" "}
            <span className="font-semibold text-[#173D2E]">
              {filteredProducts.length}
            </span>{" "}
            {t("products")}
          </p>

          {(search || activeCategory !== "all") && (
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
              }}
              className="text-sm font-medium text-[#806044] underline"
            >
              {t("clearFilters")}
            </button>
          )}

        </div>

        {/* Product grid */}
        {filteredProducts.length > 0 ? (

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredProducts.map((product) => (

              <article key={product.id} className="group">

                <Link href={`/products/${product.id}`}>

                  <div className="relative mb-4 aspect-[4/5] overflow-hidden bg-[#e9e5da]">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    {product.badge && (
                      <span className="absolute left-4 top-4 bg-[#173D2E] px-3 py-2 text-xs text-white">
                        {product.badge}
                      </span>
                    )}

                  </div>

                  <div className="flex items-start justify-between gap-3">

                    <div>
                      <h2 className="font-medium transition group-hover:text-[#806044]">
                        {product.name}
                      </h2>

                      <p className="mt-2 text-xs uppercase tracking-wider text-gray-500">
                        {t(
                          categories.find(
                            (category) =>
                              category.id === product.category
                          )?.nameKey
                        )}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-sm font-semibold text-[#173D2E]">
                      {formatPrice(product.price)}
                    </p>

                  </div>

                </Link>

              </article>

            ))}

          </div>

        ) : (

          <div className="py-20 text-center">

            <h2 className="mb-3 text-2xl font-semibold">
              {t("noProducts")}
            </h2>

            <p className="mb-6 text-gray-500">
              {t("noProductsDescription")}
            </p>

            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
              }}
              className="gold-button"
            >
              {t("showAll")}
            </button>

          </div>

        )}

      </section>
    </main>
  );
}

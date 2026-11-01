
"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ShoppingBag,
  Minus,
  Plus,
  Check,
} from "lucide-react";

import { products, categories } from "@/data/products";
import { useLanguage } from "@/components/LanguageProvider";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-ET").format(price) + " ETB";

// This component contains the actual product details.
function ProductDetailsContent() {
  const { id } = useParams();
  const { t } = useLanguage();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  if (!product) {
    return (
      <main className="min-h-[60vh] bg-[#F8F6EF] px-6 py-24 text-center">
        <h1 className="mb-4 text-3xl font-semibold">
          {t("productNotFound")}
        </h1>

        <Link href="/products" className="gold-button inline-block">
          {t("backToShop")}
        </Link>
      </main>
    );
  }

  const category = categories.find(
    (item) => item.id === product.category
  );

  function addToCart() {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("furnihouse-cart") || "[]"
      );

      const existingItem = savedCart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        savedCart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
        });
      }

      localStorage.setItem(
        "furnihouse-cart",
        JSON.stringify(savedCart)
      );

      window.dispatchEvent(new Event("cartUpdated"));
      setAdded(true);
    } catch (error) {
      console.error("Could not update cart:", error);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8F6EF] px-5 py-12">
      <div className="container-width">

        <Link
          href="/products"
          className="mb-10 inline-flex items-center gap-2 text-sm text-[#806044] hover:text-[#173D2E]"
        >
          <ArrowLeft size={17} />
          {t("backToShop")}
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">

          {/* Product image */}
          <div className="overflow-hidden bg-[#e9e5da]">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-[4/5] h-full w-full object-cover"
            />
          </div>

          {/* Product information */}
          <div className="flex flex-col justify-center">

            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#806044]">
              {category ? t(category.nameKey) : ""}
            </p>

            <h1 className="mb-5 text-3xl font-semibold leading-tight text-[#173D2E] md:text-5xl">
              {product.name}
            </h1>

            <p className="mb-7 text-2xl font-semibold text-[#806044]">
              {formatPrice(product.price)}
            </p>

            <div className="mb-8 border-y border-[#dedbd0] py-6">
              <h2 className="mb-3 font-semibold">
                {t("productDescriptionTitle")}
              </h2>

              <p className="leading-8 text-gray-600">
                {t("productDescription")}
              </p>
            </div>

            {/* Quantity selector */}
            <div className="mb-8">
              <p className="mb-3 text-sm font-medium">
                {t("chooseQuantity")}
              </p>

              <div className="flex w-fit items-center border border-[#dedbd0] bg-white">
                <button
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  disabled={quantity === 1}
                  aria-label="Decrease quantity"
                  className="p-3 disabled:opacity-40"
                >
                  <Minus size={17} />
                </button>

                <span className="min-w-12 text-center">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity((current) => current + 1)
                  }
                  aria-label="Increase quantity"
                  className="p-3"
                >
                  <Plus size={17} />
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={addToCart}
              className="gold-button flex w-full items-center justify-center gap-3 py-4"
            >
              {added ? (
                <>
                  <Check size={19} />
                  {t("addedToCart")}
                </>
              ) : (
                <>
                  <ShoppingBag size={19} />
                  {t("addToCart")}
                </>
              )}
            </button>

            {added && (
              <Link
                href="/cart"
                className="mt-4 text-center text-sm font-medium text-[#173D2E] underline"
              >
                {t("viewCart")}
              </Link>
            )}

            <p className="mt-6 text-sm leading-7 text-gray-500">
              {t("currency")}
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}

// Suspense handles the runtime route parameter.
export default function ProductDetailsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-[60vh] bg-[#F8F6EF] px-6 py-24 text-center">
          Loading product details...
        </main>
      }
    >
      <ProductDetailsContent />
    </Suspense>
  );
}

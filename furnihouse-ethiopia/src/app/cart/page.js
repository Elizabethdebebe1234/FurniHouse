
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-ET").format(price) + " ETB";

export default function CartPage() {
  const { t } = useLanguage();
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Read the saved cart when the page opens.
  useEffect(() => {
    function loadCart() {
      try {
        const savedCart = JSON.parse(
          localStorage.getItem("furnihouse-cart") || "[]"
        );

        setCart(Array.isArray(savedCart) ? savedCart : []);
      } catch (error) {
        console.error("Could not load cart:", error);
        setCart([]);
      }

      setLoaded(true);
    }

    loadCart();

    // Listen for changes made on other pages.
    window.addEventListener("cartUpdated", loadCart);
    window.addEventListener("storage", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
      window.removeEventListener("storage", loadCart);
    };
  }, []);

  // Save changes and update the page.
  function updateCart(updatedCart) {
    setCart(updatedCart);

    localStorage.setItem(
      "furnihouse-cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));
  }

  // Increase or decrease an item's quantity.
  function changeQuantity(id, amount) {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + amount),
            }
          : item
      );

    updateCart(updatedCart);
  }

  // Remove a product.
  function removeItem(id) {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    updateCart(updatedCart);
  }

  // Calculate the subtotal.
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#F8F6EF] px-5 py-24 text-center">
        {t("loadingCart")}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F6EF] px-5 py-14">
      <div className="container-width">

        {/* Page heading */}
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[#806044]">
            FurniHouse Ethiopia
          </p>

          <h1 className="text-3xl font-semibold text-[#173D2E] md:text-5xl">
            {t("cartTitle")}
          </h1>

          <p className="mt-3 text-gray-600">
            {t("cartSubtitle")}
          </p>
        </div>

        {cart.length === 0 ? (

          /* Empty cart */
          <div className="bg-white px-6 py-20 text-center shadow-sm">
            <ShoppingBag
              size={55}
              className="mx-auto mb-6 text-[#806044]"
            />

            <h2 className="mb-3 text-2xl font-semibold text-[#173D2E]">
              {t("emptyCart")}
            </h2>

            <p className="mb-8 text-gray-500">
              {t("emptyCartMessage")}
            </p>

            <Link
              href="/products"
              className="gold-button inline-flex items-center gap-2"
            >
              <ShoppingBag size={18} />
              {t("continueShopping")}
            </Link>
          </div>

        ) : (

          /* Cart with products */
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">

            {/* Product list */}
            <section className="space-y-5">

              <div className="flex items-center justify-between border-b border-[#dedbd0] pb-4">
                <h2 className="text-xl font-semibold text-[#173D2E]">
                  {t("yourItems")}
                </h2>

                <span className="text-sm text-gray-500">
                  {totalItems} {t("items")}
                </span>
              </div>

              {cart.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col gap-5 bg-white p-5 shadow-sm sm:flex-row"
                >

                  {/* Product image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-40 w-full object-cover sm:w-36"
                  />

                  {/* Product details */}
                  <div className="flex flex-1 flex-col justify-between">

                    <div>
                      <h3 className="text-lg font-semibold text-[#173D2E]">
                        {item.name}
                      </h3>

                      <p className="mt-2 text-[#806044]">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">

                      {/* Quantity controls */}
                      <div className="flex items-center border border-[#dedbd0]">
                        <button
                          onClick={() =>
                            changeQuantity(item.id, -1)
                          }
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                          className="p-2 disabled:opacity-40"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="min-w-10 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            changeQuantity(item.id, 1)
                          }
                          aria-label="Increase quantity"
                          className="p-2"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Remove product */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                        {t("remove")}
                      </button>
                    </div>
                  </div>

                  {/* Item total */}
                  <div className="font-semibold text-[#173D2E] sm:text-right">
                    {formatPrice(item.price * item.quantity)}
                  </div>

                </article>
              ))}

              <Link
                href="/products"
                className="inline-flex items-center gap-2 pt-3 text-sm font-medium text-[#806044] hover:text-[#173D2E]"
              >
                <ArrowLeft size={17} />
                {t("continueShopping")}
              </Link>

            </section>

            {/* Order summary */}
            <aside className="h-fit bg-white p-6 shadow-sm">

              <h2 className="mb-6 text-xl font-semibold text-[#173D2E]">
                {t("orderSummary")}
              </h2>

              <div className="space-y-4 border-b border-[#dedbd0] pb-6">

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-600">
                    {t("subtotal")}
                  </span>

                  <span className="font-medium">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-600">
                    {t("shipping")}
                  </span>

                  <span className="text-right text-gray-500">
                    {t("shippingCalculated")}
                  </span>
                </div>

              </div>

              <div className="flex justify-between gap-4 py-6 text-lg font-semibold text-[#173D2E]">
                <span>{t("total")}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <Link
  href="/checkout"
  className="block w-full rounded-xl bg-[#173D2E] px-6 py-4 text-center font-semibold text-white transition hover:bg-[#102B21]"
>
  {t("proceedToCheckout")}
</Link>

              <p className="mt-4 text-center text-xs leading-6 text-gray-500">
                {t("checkoutNotice")}
              </p>

            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

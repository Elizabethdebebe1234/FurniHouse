
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  CalendarDays,
  Sofa,
  ArrowRight,
  LogOut,
  ShoppingBag,
} from "lucide-react";

import { useAuth } from "@/components/AuthProvider";
import ProtectedRoute from "@/components/ProtectedRoute";

function readCustomerRecords(key, email) {
  try {
    const records = JSON.parse(localStorage.getItem(key) || "[]");

    return records.filter(
      (item) =>
        item.customer?.email?.trim().toLowerCase() ===
        email.trim().toLowerCase()
    );
  } catch {
    return [];
  }
}

function CustomerDashboard() {
  const { user, logout } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    function loadMyData() {
      setAppointments(
        readCustomerRecords("furnihouse-appointments", user.email)
      );

      setOrders(
        readCustomerRecords("furnihouse-orders", user.email)
      );

      setRequests(
        readCustomerRecords("furnihouse-custom-requests", user.email)
      );
    }

    loadMyData();

    window.addEventListener("appointmentUpdated", loadMyData);
    window.addEventListener("orderUpdated", loadMyData);
    window.addEventListener("customRequestUpdated", loadMyData);
    window.addEventListener("storage", loadMyData);

    return () => {
      window.removeEventListener("appointmentUpdated", loadMyData);
      window.removeEventListener("orderUpdated", loadMyData);
      window.removeEventListener("customRequestUpdated", loadMyData);
      window.removeEventListener("storage", loadMyData);
    };
  }, [user]);

  return (
    <main className="min-h-screen bg-[#F8F6EF] px-5 py-12">
      <div className="mx-auto max-w-6xl">
        <section className="mb-10 flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B28A4D]">
              MY FURNIHOUSE
            </p>

            <h1 className="mt-3 text-3xl font-bold text-[#173D2E]">
              Welcome, {user.name}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {user.email}
            </p>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-lg border border-[#173D2E] px-5 py-3 text-sm font-semibold text-[#173D2E] transition hover:bg-[#173D2E] hover:text-white"
          >
            <LogOut size={17} />
            Sign Out
          </button>
        </section>

        <section className="mb-8 grid gap-5 sm:grid-cols-3">
          {[
            {
              label: "My Orders",
              count: orders.length,
              icon: Package,
            },
            {
              label: "My Appointments",
              count: appointments.length,
              icon: CalendarDays,
            },
            {
              label: "Custom Requests",
              count: requests.length,
              icon: Sofa,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-xl border border-[#e9e5da] bg-white p-6"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <Icon className="text-[#B28A4D]" size={21} />
                </div>

                <p className="mt-3 text-3xl font-bold text-[#173D2E]">
                  {item.count}
                </p>
              </div>
            );
          })}
        </section>

        <section className="mb-8 rounded-xl border border-[#e9e5da] bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#173D2E]">
              My Orders
            </h2>
            <Package size={21} className="text-[#B28A4D]" />
          </div>

          {orders.length === 0 ? (
            <div className="py-8 text-center">
              <ShoppingBag
                size={38}
                className="mx-auto mb-3 text-gray-300"
              />
              <h3 className="font-semibold text-[#173D2E]">
                No orders yet
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Your furniture orders will appear here when you make one.
              </p>
              <Link
                href="/products"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#173D2E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#102B21]"
              >
                Explore Furniture <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <div
                  key={order.id || index}
                  className="rounded-lg border border-[#e9e5da] p-4"
                >
                  <div className="flex flex-wrap justify-between gap-3">
                    <p className="font-semibold text-[#173D2E]">
                      {order.reference || order.id || `Order ${index + 1}`}
                    </p>
                    <span className="rounded-full bg-[#F8F6EF] px-3 py-1 text-xs capitalize text-[#806044]">
                      {order.status || "Submitted"}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "Date not available"}
                  </p>

                  <p className="mt-2 text-sm text-gray-600">
                    Total: {Number(order.estimatedSubtotal || order.total || 0).toLocaleString()} ETB
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mb-8 rounded-xl border border-[#e9e5da] bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#173D2E]">
              My Showroom Appointments
            </h2>
            <CalendarDays size={21} className="text-[#B28A4D]" />
          </div>

          {appointments.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-500">
              You have no showroom appointments yet.
            </p>
          ) : (
            <div className="space-y-4">
              {appointments.map((item, index) => (
                <div
                  key={item.id || index}
                  className="rounded-lg border border-[#e9e5da] p-4"
                >
                  <p className="font-semibold text-[#173D2E]">
                    {item.reference || item.id || `Appointment ${index + 1}`}
                  </p>

                  <p className="mt-2 text-sm text-gray-600">
                    Date: {item.appointment?.date || "Not specified"}
                  </p>

                  <p className="text-sm text-gray-600">
                    Time: {item.appointment?.time || "Not specified"}
                  </p>

                  <p className="mt-2 text-sm capitalize text-[#806044]">
                    Status: {item.appointment?.status || "Pending confirmation"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-xl border border-[#e9e5da] bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#173D2E]">
              My Custom Furniture Requests
            </h2>
            <Sofa size={21} className="text-[#B28A4D]" />
          </div>

          {requests.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-500">
              You have no custom furniture requests yet.
            </p>
          ) : (
            <div className="space-y-4">
              {requests.map((item, index) => (
                <div
                  key={item.id || index}
                  className="rounded-lg border border-[#e9e5da] p-4"
                >
                  <p className="font-semibold text-[#173D2E]">
                    {item.reference || item.id || `Request ${index + 1}`}
                  </p>

                  <p className="mt-2 text-sm text-gray-600">
                    {item.design?.furnitureType || "Custom furniture"}
                  </p>

                  <p className="mt-2 text-sm capitalize text-[#806044]">
                    Status: {item.status || "Submitted"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default function AccountPage() {
  return (
    <ProtectedRoute role="customer">
      <CustomerDashboard />
    </ProtectedRoute>
  );
}

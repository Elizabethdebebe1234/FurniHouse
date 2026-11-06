"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import ProtectedRoute from "@/components/ProtectedRoute";

const STORAGE_KEYS = {
  appointments: "furnihouse-appointments",
  orders: "furnihouse-orders",
  requests: "furnihouse-custom-requests",
  inquiries: "furnihouse-inquiries",
  notifications: "furnihouse-notifications",
};

function readStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function AdminDashboard() {
  const { user, logout } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [requests, setRequests] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [replyTexts, setReplyTexts] = useState({});
  const [expandedAppointment, setExpandedAppointment] = useState(null);


  useEffect(() => {
    setAppointments(readStorage(STORAGE_KEYS.appointments));
    setOrders(readStorage(STORAGE_KEYS.orders));
    setRequests(readStorage(STORAGE_KEYS.requests));
    setInquiries(readStorage(STORAGE_KEYS.inquiries));
  }, []);

  function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function updateAppointment(id, status) {
    const updated = appointments.map((item) =>
      item.id === id
        ? {
            ...item,
            appointment: {
              ...item.appointment,
              status,
            },
          }
        : item
    );

    setAppointments(updated);
    saveData(STORAGE_KEYS.appointments, updated);

    const appointment = updated.find((item) => item.id === id);

    const notification = {
      id: crypto.randomUUID(),
      title:
        status === "confirmed"
          ? "Appointment confirmed"
          : "Appointment update",
      message:
        status === "confirmed"
          ? "Your showroom appointment has been confirmed."
          : "Your showroom appointment was declined. Please contact us to arrange another time.",
      role: "customer",
      customerEmail: appointment?.customer?.email || "",
      createdAt: new Date().toISOString(),
      read: false,
    };

    const notifications = readStorage(STORAGE_KEYS.notifications);
    notifications.push(notification);
    saveData(STORAGE_KEYS.notifications, notifications);

    window.dispatchEvent(new Event("appointmentUpdated"));
    window.dispatchEvent(new Event("notificationsUpdated"));
  }

  function updateOrder(id, status) {
    const updated = orders.map((item) =>
      item.id === id ? { ...item, status } : item
    );

    setOrders(updated);
    saveData(STORAGE_KEYS.orders, updated);
  }

  function updateRequest(id, status) {
    const updated = requests.map((item) =>
      item.id === id ? { ...item, status } : item
    );

    setRequests(updated);
    saveData(STORAGE_KEYS.requests, updated);
  }

  function sendReply(id) {
    const reply = (replyTexts[id] || "").trim();

    if (!reply) return;

    const updated = inquiries.map((item) =>
      item.id === id
        ? {
            ...item,
            reply,
            status: "answered",
            repliedAt: new Date().toISOString(),
          }
        : item
    );

    setInquiries(updated);
    saveData(STORAGE_KEYS.inquiries, updated);

    setReplyTexts((previous) => ({
      ...previous,
      [id]: "",
    }));
  }

  const stats = [
    { label: "Appointments", value: appointments.length },
    { label: "Orders", value: orders.length },
    { label: "Custom Requests", value: requests.length },
    {
      label: "Unanswered Questions",
      value: inquiries.filter((item) => item.status !== "answered").length,
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "appointments", label: "Appointments" },
    { id: "orders", label: "Orders" },
    { id: "requests", label: "Custom Requests" },
    { id: "inquiries", label: "Customer Questions" },
  ];

  return (
    <main className="min-h-screen bg-[#F8F6EF] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#C69B5C]">
              FurniHouse Management
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[#173D2E]">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Welcome, {user.name}
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-lg bg-[#173D2E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#102B21]"
          >
            Logout
          </button>
        </header>

        <nav className="mb-8 flex gap-2 overflow-x-auto rounded-xl bg-white p-2 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap rounded-lg px-4 py-3 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-[#173D2E] text-white"
                  : "text-gray-600 hover:bg-[#F8F6EF]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {activeTab === "overview" && (
          <>
            <section className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl bg-white p-6 shadow-sm"
                >
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="mt-2 text-3xl font-bold text-[#173D2E]">
                    {item.value}
                  </p>
                </div>
              ))}
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-[#173D2E]">
                  Recent Appointments
                </h2>

                {appointments.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No appointments have been booked.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {appointments.slice(0, 5).map((item) => (
                      <div key={item.id} className="rounded-lg border p-4">
                        <p className="font-semibold text-[#173D2E]">
                          {item.customer?.name || "Customer"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.appointment?.date} · {item.appointment?.time}
                        </p>
                        <p className="mt-1 text-xs capitalize text-[#806044]">
                          {item.appointment?.status || "Pending"}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-[#173D2E]">
                  Recent Customer Questions
                </h2>

                {inquiries.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No customer questions yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {inquiries.slice(0, 5).map((item) => (
                      <div key={item.id} className="rounded-lg border p-4">
                        <p className="font-semibold text-[#173D2E]">
                          {item.subject}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.name} · {item.email}
                        </p>
                        <p className="mt-1 text-xs capitalize text-[#806044]">
                          {item.status || "Pending"}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {activeTab === "appointments" && (
  <section className="rounded-xl bg-white p-6 shadow-sm">
    <h2 className="mb-5 text-xl font-bold text-[#173D2E]">
      Showroom Appointments
    </h2>

    {appointments.length === 0 ? (
      <p className="text-gray-500">No appointments available.</p>
    ) : (
      <div className="space-y-4">
        {appointments.map((item) => (
          <article
            key={item.id}
            className="rounded-xl border border-[#E8E1D4] p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-[#173D2E]">
                  {item.customer?.name || "Customer"}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.customer?.email}
                </p>

                <p className="text-sm text-gray-500">
                  Phone: {item.customer?.phone || "Not provided"}
                </p>

                <p className="mt-2 text-sm text-gray-600">
                  {item.appointment?.date} · {item.appointment?.time}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Reference: {item.reference || item.id}
                </p>

                <p className="mt-1 text-sm font-semibold capitalize text-[#806044]">
                  Status: {item.appointment?.status || "Pending"}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    setExpandedAppointment(
                      expandedAppointment === item.id ? null : item.id
                    )
                  }
                  className="rounded-lg border border-[#173D2E] px-4 py-2 text-sm font-semibold text-[#173D2E]"
                >
                  {expandedAppointment === item.id
                    ? "Hide Details"
                    : "View Full Details"}
                </button>

                {item.appointment?.status !== "confirmed" &&
                  item.appointment?.status !== "rejected" && (
                    <>
                      <button
                        onClick={() => updateAppointment(item.id, "confirmed")}
                        className="rounded-lg bg-[#173D2E] px-4 py-2 text-sm font-semibold text-white"
                      >
                        Confirm
                      </button>

                      <button
                        onClick={() => updateAppointment(item.id, "rejected")}
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600"
                      >
                        Reject
                      </button>
                    </>
                  )}
              </div>
            </div>

            {expandedAppointment === item.id && (
              <div className="mt-6 space-y-5 border-t border-[#E8E1D4] pt-5">
                <div>
                  <h4 className="mb-2 font-bold text-[#173D2E]">
                    Customer Information
                  </h4>
                  <p>Name: {item.customer?.name || "Not provided"}</p>
                  <p>Email: {item.customer?.email || "Not provided"}</p>
                  <p>Phone: {item.customer?.phone || "Not provided"}</p>
                </div>

                <div>
                  <h4 className="mb-2 font-bold text-[#173D2E]">
                    Selected Furniture
                  </h4>

                  {item.items?.length ? (
                    <div className="space-y-2">
                      {item.items.map((product, index) => (
                        <div
                          key={product.id || index}
                          className="rounded-lg bg-[#F8F6EF] p-3"
                        >
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-sm text-gray-600">
                            Quantity: {product.quantity || 1}
                          </p>
                          <p className="text-sm text-gray-600">
                            Unit price: ETB {Number(product.price || 0).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No furniture details available.</p>
                  )}

                  <p className="mt-3 font-semibold text-[#173D2E]">
                    Estimated total: ETB{" "}
                    {Number(item.estimatedSubtotal || 0).toLocaleString()}
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 font-bold text-[#173D2E]">
                    Material Preferences
                  </h4>

                  {item.materialPreferences?.length ? (
                    <ul className="list-inside list-disc text-sm text-gray-700">
                      {item.materialPreferences.map((material) => (
                        <li key={material}>
                          {{
                            naturalWood: "Natural wood",
                            engineeredWood: "Engineered wood",
                            upholstery: "Fabric and upholstery",
                            colors: "Colors and finishes",
                            handles: "Handles and accessories",
                          }[material] || material}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No materials selected.</p>
                  )}

                  <p className="mt-2 text-sm text-gray-700">
                    Other preferences:{" "}
                    {item.otherMaterialPreferences || "None"}
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 font-bold text-[#173D2E]">
                    Appointment Details
                  </h4>
                  <p>Date: {item.appointment?.date || "Not provided"}</p>
                  <p>Time: {item.appointment?.time || "Not provided"}</p>
                  <p>Location: {item.appointment?.location || "Not provided"}</p>
                  <p>Status: {item.appointment?.status || "Pending"}</p>
                </div>

                <div>
                  <h4 className="mb-2 font-bold text-[#173D2E]">
                    Additional Customer Requests
                  </h4>
                  <p className="whitespace-pre-wrap text-sm text-gray-700">
                    {item.notes || "No additional requests."}
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 font-bold text-[#173D2E]">
                    Booking Information
                  </h4>
                  <p>Reference: {item.reference || item.id}</p>
                  <p>Payment status: {item.paymentStatus || "Not specified"}</p>
                  <p>Production status: {item.productionStatus || "Not specified"}</p>
                  <p>
                    Submitted:{" "}
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : "Not available"}
                  </p>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    )}
  </section>
)}

        {activeTab === "orders" && (
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-[#173D2E]">
              Customer Orders
            </h2>

            {orders.length === 0 ? (
              <p className="text-gray-500">No orders available.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4"
                  >
                    <div>
                      <p className="font-semibold text-[#173D2E]">
                        {item.reference || item.id || `Order ${index + 1}`}
                      </p>
                      <p className="text-sm text-gray-600">
                        Customer: {item.customer?.name || "Not specified"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Email: {item.customer?.email || "Not specified"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Total: {item.total || item.totalAmount || "Not specified"}
                      </p>
                    </div>

                    <select
                      value={item.status || "Submitted"}
                      onChange={(e) => updateOrder(item.id, e.target.value)}
                      className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Processing">Processing</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "requests" && (
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-[#173D2E]">
              Custom Furniture Requests
            </h2>

            {requests.length === 0 ? (
              <p className="text-gray-500">No custom requests available.</p>
            ) : (
              <div className="space-y-4">
                {requests.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="rounded-lg border p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[#173D2E]">
                          {item.customer?.name || "Customer"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.customer?.email}
                        </p>
                      </div>

                      <select
                        value={item.status || "Submitted"}
                        onChange={(e) => updateRequest(item.id, e.target.value)}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                      >
                        <option value="Submitted">Submitted</option>
                        <option value="Reviewing">Reviewing</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    <div className="mt-3 text-sm text-gray-600">
                      <p>
                        Furniture: {item.design?.furnitureType || "Not specified"}
                      </p>
                      {item.design?.description && (
                        <p className="mt-1">
                          Details: {item.design.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "inquiries" && (
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-[#173D2E]">
              Customer Questions and Replies
            </h2>

            {inquiries.length === 0 ? (
              <p className="text-gray-500">
                No customer questions yet. Messages submitted through the
                contact form will appear here.
              </p>
            ) : (
              <div className="space-y-5">
                {inquiries.map((item) => (
                  <article key={item.id} className="rounded-xl border p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-[#173D2E]">
                          {item.subject}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.name} · {item.email}
                        </p>
                        <p className="text-xs text-gray-400">
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleString()
                            : ""}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === "answered"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status === "answered" ? "Answered" : "Pending"}
                      </span>
                    </div>

                    <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-gray-700">
                      {item.message}
                    </p>

                    {item.reply && (
                      <div className="mt-4 rounded-lg bg-[#F8F6EF] p-4">
                        <p className="text-xs font-bold uppercase tracking-wide text-[#806044]">
                          Your reply
                        </p>
                        <p className="mt-2 whitespace-pre-wrap text-sm text-gray-700">
                          {item.reply}
                        </p>
                      </div>
                    )}

                    <div className="mt-4">
                      <label className="mb-2 block text-sm font-semibold text-[#173D2E]">
                        Write a reply
                      </label>
                      <textarea
                        rows={3}
                        value={replyTexts[item.id] || ""}
                        onChange={(e) =>
                          setReplyTexts((previous) => ({
                            ...previous,
                            [item.id]: e.target.value,
                          }))
                        }
                        placeholder="Write your answer to this customer..."
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-[#173D2E]"
                      />

                      <button
                        onClick={() => sendReply(item.id)}
                        className="mt-3 rounded-lg bg-[#173D2E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#102B21]"
                      >
                        {item.status === "answered" ? "Update Reply" : "Send Reply"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute role="admin">
      <AdminDashboard />
    </ProtectedRoute>
  );
}
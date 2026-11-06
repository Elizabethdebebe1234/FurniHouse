"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { Send, MessageCircle, ArrowLeft } from "lucide-react";

export default function ContactPage() {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    setSuccess("");
    setError("");

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setError("Please complete all fields.");
      return;
    }

    try {
      const inquiries = JSON.parse(
        localStorage.getItem("furnihouse-inquiries") || "[]"
      );

      const newInquiry = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
        status: "pending",
        reply: "",
        createdAt: new Date().toISOString(),
      };

      inquiries.unshift(newInquiry);

      localStorage.setItem(
        "furnihouse-inquiries",
        JSON.stringify(inquiries)
      );

      setSubject("");
      setMessage("");
      setSuccess("Your question has been submitted successfully!");
    } catch {
      setError("Unable to submit your question. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-[#F8F6EF] px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#173D2E]"
        >
          <ArrowLeft size={16} />
          Back to homepage
        </Link>

        <div className="rounded-2xl border border-[#e9e5da] bg-white p-6 shadow-sm sm:p-10">
          <div className="mb-8">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#173D2E]/10 text-[#173D2E]">
              <MessageCircle size={27} />
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B28A4D]">
              We are here to help
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#173D2E]">
              Contact FurniHouse
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Have a question about our furniture, orders, showroom visits, or
              custom designs? Send us a message.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#30352E]">
                  Your name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-lg border border-[#deded5] bg-[#FCFCF9] px-4 py-3 text-sm outline-none focus:border-[#173D2E]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#30352E]">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-lg border border-[#deded5] bg-[#FCFCF9] px-4 py-3 text-sm outline-none focus:border-[#173D2E]"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#30352E]">
                Subject
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What is your question about?"
                className="w-full rounded-lg border border-[#deded5] bg-[#FCFCF9] px-4 py-3 text-sm outline-none focus:border-[#173D2E]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#30352E]">
                Your message
              </label>
              <textarea
                rows={6}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your question here..."
                className="w-full resize-y rounded-lg border border-[#deded5] bg-[#FCFCF9] px-4 py-3 text-sm outline-none focus:border-[#173D2E]"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            {success && (
              <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                {success}
              </p>
            )}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#173D2E] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#102B21]"
            >
              <Send size={17} />
              Submit Question
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}


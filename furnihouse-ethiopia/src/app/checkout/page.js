
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import {
  CalendarDays,
  Clock,
  MapPin,
  Package,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ClipboardCheck,
} from "lucide-react";

const translations = {
  en: {
    title: "Book Your Showroom Visit",
    subtitle:
      "Choose a convenient time to visit FurniHouse, explore real materials, and discuss your furniture order with our team.",
    step1: "Your furniture",
    step2: "Material preferences",
    step3: "Appointment details",
    orderSummary: "Your selected furniture",
    quantity: "Quantity",
    subtotal: "Estimated product total",
    priceNote:
      "Final prices and specifications will be discussed and agreed upon at the showroom.",
    materialsTitle: "What would you like to explore?",
    materialsSubtitle:
      "Select the materials and finishes you would like to inspect during your visit.",
    naturalWood: "Natural wood",
    engineeredWood: "Engineered wood",
    upholstery: "Fabric and upholstery",
    colors: "Colors and finishes",
    handles: "Handles and accessories",
    otherMaterial: "Other material preferences",
    otherPlaceholder: "Tell us what you would like to see...",
    appointmentTitle: "Choose your appointment",
    appointmentSubtitle:
      "Select your preferred date and time. Your appointment will be confirmed by our admin team.",
    date: "Preferred date",
    time: "Preferred time",
    morning: "Morning · 9:00 AM – 12:00 PM",
    afternoon: "Afternoon · 12:00 PM – 3:00 PM",
    evening: "Late afternoon · 3:00 PM – 5:00 PM",
    location: "Inspection location",
    showroom: "FurniHouse Showroom",
    showroomNote: "All material inspections and consultations take place at our showroom.",
    customerTitle: "Your contact information",
    fullName: "Full name",
    email: "Email address",
    phone: "Phone number",
    namePlaceholder: "Enter your full name",
    emailPlaceholder: "Enter your email",
    phonePlaceholder: "Enter your phone number",
    notes: "Additional requests",
    notesPlaceholder:
      "Tell us anything that could help us prepare for your visit...",
    back: "Back to cart",
    submit: "Request appointment",
    submitting: "Submitting...",
    required: "Please complete all required fields.",
    selectMaterial: "Please select at least one material preference.",
    emptyTitle: "Your cart is empty",
    emptyMessage: "Add some furniture before booking a showroom visit.",
    shop: "Explore furniture",
    successTitle: "Appointment request submitted!",
    successMessage:
      "Thank you for choosing FurniHouse. Your appointment is waiting for admin confirmation.",
    reference: "Appointment reference",
    pending: "Pending admin confirmation",
    confirmationNote:
      "Our team will review your preferred date and time. Your visit is not confirmed until the admin approves it.",
    showroomAddress: "Showroom visit",
    viewDashboard: "Go to customer dashboard",
    continueShopping: "Continue shopping",
    noOnlinePayment: "No online payment is required at this stage.",
    datePast: "Please choose today or a future date.",
    demoNotice:
      "Demo mode: appointment information is saved in this browser. Real email and scheduled reminders require backend integration.",
  },

  am: {
    title: "የሾውሩም ጉብኝት ይያዙ",
    subtitle:
      "የተመቸዎትን ጊዜ በመምረጥ ፉርኒሀውስን ይጎብኙ፣ ቁሳቁሶችን በአካል ይመልከቱ እና የቤት ዕቃ ትዕዛዝዎን ከቡድናችን ጋር ይወያዩ።",
    step1: "የመረጧቸው ዕቃዎች",
    step2: "የቁሳቁስ ምርጫዎች",
    step3: "የቀጠሮ ዝርዝሮች",
    orderSummary: "የመረጧቸው የቤት ዕቃዎች",
    quantity: "ብዛት",
    subtotal: "ግምታዊ የዕቃዎች ድምር",
    priceNote:
      "የመጨረሻ ዋጋና ዝርዝር መግለጫዎች በሾውሩማችን ይወሰናሉ።",
    materialsTitle: "ምን ዓይነት ቁሳቁሶችን ማየት ይፈልጋሉ?",
    materialsSubtitle: "በጉብኝትዎ ወቅት ማየት የሚፈልጓቸውን ቁሳቁሶችና የገጽታ አይነቶች ይምረጡ።",
    naturalWood: "ተፈጥሯዊ እንጨት",
    engineeredWood: "በኢንጂነሪንግ የተዘጋጀ እንጨት",
    upholstery: "ጨርቅና የመቀመጫ ሽፋን",
    colors: "ቀለሞችና የገጽታ አጨራረስ",
    handles: "እጀታዎችና መለዋወጫዎች",
    otherMaterial: "ሌሎች የቁሳቁስ ምርጫዎች",
    otherPlaceholder: "ማየት የሚፈልጉትን ይግለጹ...",
    appointmentTitle: "የቀጠሮ ጊዜ ይምረጡ",
    appointmentSubtitle: "የሚመችዎትን ቀንና ሰዓት ይምረጡ። የቀጠሮዎ ማረጋገጫ በአስተዳዳሪያችን ይደረጋል።",
    date: "የሚመርጡት ቀን",
    time: "የሚመርጡት ሰዓት",
    morning: "ጠዋት · 3:00 – 6:00",
    afternoon: "ከሰዓት · 6:00 – 9:00",
    evening: "ከሰዓት በኋላ · 9:00 – 11:00",
    location: "የቁሳቁስ ምርመራ ቦታ",
    showroom: "ፉርኒሀውስ ሾውሩም",
    showroomNote: "ሁሉም የቁሳቁስ ምርመራና ውይይቶች በሾውሩማችን ይካሄዳሉ።",
    customerTitle: "የእውቂያ መረጃዎ",
    fullName: "ሙሉ ስም",
    email: "ኢሜይል አድራሻ",
    phone: "ስልክ ቁጥር",
    namePlaceholder: "ሙሉ ስምዎን ያስገቡ",
    emailPlaceholder: "ኢሜይልዎን ያስገቡ",
    phonePlaceholder: "ስልክ ቁጥርዎን ያስገቡ",
    notes: "ተጨማሪ ጥያቄዎች",
    notesPlaceholder: "ለጉብኝትዎ ዝግጅት የሚረዳንን መረጃ ይጻፉ...",
    back: "ወደ ጋሪ ተመለስ",
    submit: "የቀጠሮ ጥያቄ ላክ",
    submitting: "በመላክ ላይ...",
    required: "እባክዎ አስፈላጊ መረጃዎችን ይሙሉ።",
    selectMaterial: "እባክዎ ቢያንስ አንድ የቁሳቁስ ምርጫ ይምረጡ።",
    emptyTitle: "ጋሪዎ ባዶ ነው",
    emptyMessage: "የሾውሩም ቀጠሮ ከመያዝዎ በፊት የቤት ዕቃዎችን ወደ ጋሪ ይጨምሩ።",
    shop: "የቤት ዕቃዎችን ይመልከቱ",
    successTitle: "የቀጠሮ ጥያቄዎ ተልኳል!",
    successMessage: "ፉርኒሀውስን ስለመረጡ እናመሰግናለን። ቀጠሮዎ የአስተዳዳሪ ማረጋገጫ እየጠበቀ ነው።",
    reference: "የቀጠሮ መለያ ቁጥር",
    pending: "የአስተዳዳሪ ማረጋገጫ በመጠባበቅ ላይ",
    confirmationNote: "ቡድናችን የመረጡትን ቀንና ሰዓት ይገመግማል። አስተዳዳሪው እስካላጸደቀው ድረስ ቀጠሮው አልተረጋገጠም።",
    showroomAddress: "የሾውሩም ጉብኝት",
    viewDashboard: "ወደ ደንበኛ ዳሽቦርድ ይሂዱ",
    continueShopping: "ግዢዎን ይቀጥሉ",
    noOnlinePayment: "በዚህ ደረጃ የኦንላይን ክፍያ አያስፈልግም።",
    datePast: "እባክዎ የዛሬን ወይም የወደፊት ቀን ይምረጡ።",
    demoNotice: "የሙከራ ሁኔታ፦ የቀጠሮ መረጃው በዚህ ብራውዘር ውስጥ ይቀመጣል። እውነተኛ ኢሜይልና የታቀዱ ማሳሰቢያዎች የባክኤንድ ግንኙነት ይፈልጋሉ።",
  },

  om: {
    title: "Daawwannaa Showroomii Beellami",
    subtitle:
      "Yeroo siif mijatu filadhu; FurniHouse daawwadhu, meeshaalee ijaan ilaali, ajaja meeshaalee mana keessaa irrattis garee keenya waliin mari'adhu.",
    step1: "Meeshaalee filataman",
    step2: "Filannoo meeshaalee",
    step3: "Odeeffannoo beellamaa",
    orderSummary: "Meeshaalee ati filatte",
    quantity: "Baay'ina",
    subtotal: "Ida'ama gatii meeshaalee tilmaamaa",
    priceNote:
      "Gatiin dhumaa fi ibsi meeshaalee showroomii keessatti irratti walii galama.",
    materialsTitle: "Meeshaalee akkamii ilaaluu barbaadda?",
    materialsSubtitle: "Meeshaalee fi xumura isaanii daawwannaa kee irratti ilaaluu barbaaddu filadhu.",
    naturalWood: "Muka uumamaa",
    engineeredWood: "Muka injinariingiidhaan qophaa'e",
    upholstery: "Huccuu fi haguuggii teessumaa",
    colors: "Halluu fi xumura fuulaa",
    handles: "Qabduu fi meeshaalee dabalataa",
    otherMaterial: "Filannoo meeshaalee biroo",
    otherPlaceholder: "Waan ilaaluu barbaaddu ibsi...",
    appointmentTitle: "Yeroo beellamaa filadhu",
    appointmentSubtitle: "Guyyaa fi yeroo siif mijatu filadhu. Beellamni kee bulchaa keenya biratti ni mirkanaa'a.",
    date: "Guyyaa filatame",
    time: "Yeroo filatame",
    morning: "Ganama · 9:00 – 12:00",
    afternoon: "Waaree booda · 12:00 – 3:00",
    evening: "Waaree booda · 3:00 – 5:00",
    location: "Bakka meeshaalee itti ilaalan",
    showroom: "Showroomii FurniHouse",
    showroomNote: "Qorannoon meeshaalee fi mariin hundi showroomii keenya keessatti raawwatama.",
    customerTitle: "Odeeffannoo qunnamtii kee",
    fullName: "Maqaa guutuu",
    email: "Teessoo imeelii",
    phone: "Lakkoofsa bilbilaa",
    namePlaceholder: "Maqaa kee guutuu galchi",
    emailPlaceholder: "Imeelii kee galchi",
    phonePlaceholder: "Lakkoofsa bilbilaa kee galchi",
    notes: "Gaaffii dabalataa",
    notesPlaceholder: "Waan daawwannaa kee qopheessuuf nu gargaaru barreessi...",
    back: "Gara gaarii deebi'i",
    submit: "Gaaffii beellamaa ergi",
    submitting: "Ergamaa jira...",
    required: "Maaloo odeeffannoo barbaachisu hunda guuti.",
    selectMaterial: "Maaloo yoo xiqqaate filannoo meeshaa tokko filadhu.",
    emptyTitle: "Gaariin kee duwwaa dha",
    emptyMessage: "Beellama showroomii qabachuu kee dura meeshaalee gara gaarii keetti dabali.",
    shop: "Meeshaalee mana keessaa ilaali",
    successTitle: "Gaaffiin beellamaa kee ergameera!",
    successMessage: "FurniHouse waan filatteef galatoomi. Beellamni kee mirkaneessa bulchaa eeggachaa jira.",
    reference: "Lakkoofsa wabii beellamaa",
    pending: "Mirkaneessa bulchaa eeggachaa jira",
    confirmationNote: "Gareen keenya guyyaa fi yeroo ati filatte ni ilaala. Bulchaan hanga hin mirkaneessinetti beellamni kee hin mirkanoofne.",
    showroomAddress: "Daawwannaa showroomii",
    viewDashboard: "Gara daashboordii maamilaa deemi",
    continueShopping: "Bittaa itti fufi",
    noOnlinePayment: "Sadarkaa kana irratti kaffaltiin interneetii hin barbaachisu.",
    datePast: "Maaloo guyyaa har'aa ykn guyyaa fuulduraa filadhu.",
    demoNotice: "Haala agarsiisaa: odeeffannoon beellamaa biraawzara kana keessatti kuufama. Imeelii dhugaa fi yaadachiisni yeroo murtaa'e backend waliin walqabsiisuu barbaada.",
  },
};

const materialOptions = [
  ["naturalWood", "naturalWood"],
  ["engineeredWood", "engineeredWood"],
  ["upholstery", "upholstery"],
  ["colors", "colors"],
  ["handles", "handles"],
];

const timeOptions = [
  ["morning", "morning"],
  ["afternoon", "afternoon"],
  ["evening", "evening"],
];

function getLocalDateString() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatETB(amount) {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

export default function CheckoutPage() {
  const { language } = useLanguage();
  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  const [cart, setCart] = useState([]);
  const [today, setToday] = useState("");
  const [materials, setMaterials] = useState([]);
  const [otherMaterial, setOtherMaterial] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("morning");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    setToday(getLocalDateString());

    const loadCart = () => {
      try {
        const saved = JSON.parse(localStorage.getItem("furnihouse-cart") || "[]");
        setCart(Array.isArray(saved) ? saved : []);
      } catch {
        setCart([]);
      }
    };

    loadCart();
    window.addEventListener("cartUpdated", loadCart);

    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  function toggleMaterial(value) {
    setMaterials((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!cart.length) return;
    if (!name.trim() || !email.trim() || !phone.trim() || !date || !time) {
      setError(t("required"));
      return;
    }

    if (date < today) {
      setError(t("datePast"));
      return;
    }

    if (!materials.length && !otherMaterial.trim()) {
      setError(t("selectMaterial"));
      return;
    }

    setSubmitting(true);

    try {
      const reference = `FH-VISIT-${Date.now().toString().slice(-8)}`;

      const appointment = {
        id: reference,
        reference,
        customer: {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
        },
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: Number(item.price || 0),
          image: item.image,
          quantity: Number(item.quantity || 1),
        })),
        estimatedSubtotal: subtotal,
        materialPreferences: materials,
        otherMaterialPreferences: otherMaterial.trim(),
        appointment: {
          date,
          time,
          location: "FurniHouse Showroom",
          status: "pending",
        },
        notes: notes.trim(),
        status: "appointment_requested",
        paymentStatus: "not_started",
        productionStatus: "not_started",
        createdAt: new Date().toISOString(),
      };

      const existingAppointments = JSON.parse(
        localStorage.getItem("furnihouse-appointments") || "[]"
      );

      const existingOrders = JSON.parse(
        localStorage.getItem("furnihouse-orders") || "[]"
      );

      const existingNotifications = JSON.parse(
        localStorage.getItem("furnihouse-notifications") || "[]"
      );

      localStorage.setItem(
        "furnihouse-appointments",
        JSON.stringify([appointment, ...existingAppointments])
      );

      localStorage.setItem(
        "furnihouse-orders",
        JSON.stringify([appointment, ...existingOrders])
      );

      const notification = {
        id: `notification-${Date.now()}`,
        type: "appointment_requested",
        title: "New showroom appointment request",
        message: `${name.trim()} requested a showroom visit for ${date}.`,
        reference,
        read: false,
        createdAt: new Date().toISOString(),
        audience: "admin",
      };

      const customerNotification = {
        ...notification,
        id: `notification-customer-${Date.now()}`,
        title: "Your appointment request was received",
        message: `Your showroom appointment ${reference} is waiting for admin confirmation.`,
        audience: "customer",
      };

      localStorage.setItem(
        "furnihouse-notifications",
        JSON.stringify([
          customerNotification,
          notification,
          ...existingNotifications,
        ])
      );

      localStorage.removeItem("furnihouse-cart");

      window.dispatchEvent(new Event("cartUpdated"));
      window.dispatchEvent(new Event("appointmentUpdated"));
      window.dispatchEvent(new Event("orderUpdated"));
      window.dispatchEvent(new Event("notificationsUpdated"));

      setBooking(appointment);
    } catch (err) {
      console.error("Appointment booking error:", err);
      setError("Something went wrong while saving your appointment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (booking) {
    return (
      <main className="min-h-screen bg-[#F8F6EF] px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-[#173D2E]">
            <CheckCircle2 size={42} />
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#C69B5C]">
            FurniHouse Ethiopia
          </p>

          <h1 className="mb-4 text-3xl font-bold text-[#173D2E]">
            {t("successTitle")}
          </h1>

          <p className="mb-8 leading-7 text-gray-600">
            {t("successMessage")}
          </p>

          <div className="mb-6 rounded-2xl border border-[#E9E4D8] bg-[#F8F6EF] p-6">
            <p className="mb-2 text-sm text-gray-500">{t("reference")}</p>
            <p className="text-xl font-bold tracking-wide text-[#173D2E]">
              {booking.reference}
            </p>

            <div className="mt-5 flex items-center justify-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
              <Clock size={17} />
              {t("pending")}
            </div>

            <div className="mt-5 space-y-3 text-left text-sm text-gray-700">
              <p><strong>{t("date")}:</strong> {booking.appointment.date}</p>
              <p><strong>{t("time")}:</strong> {t(booking.appointment.time)}</p>
              <p><strong>{t("location")}:</strong> {t("showroom")}</p>
            </div>
          </div>

          <p className="mb-6 text-sm leading-6 text-gray-600">
            {t("confirmationNote")}
          </p>

          <p className="mb-8 text-xs leading-5 text-gray-400">
            {t("demoNotice")}
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/customer"
              className="rounded-xl bg-[#173D2E] px-6 py-3 font-semibold text-white transition hover:bg-[#102B21]"
            >
              {t("viewDashboard")}
            </Link>

            <Link
              href="/products"
              className="rounded-xl border border-[#173D2E] px-6 py-3 font-semibold text-[#173D2E] transition hover:bg-[#F8F6EF]"
            >
              {t("continueShopping")}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!cart.length) {
    return (
      <main className="min-h-[65vh] bg-[#F8F6EF] px-4 py-24 text-center">
        <Package className="mx-auto mb-5 text-[#173D2E]" size={54} />
        <h1 className="mb-3 text-3xl font-bold text-[#173D2E]">
          {t("emptyTitle")}
        </h1>
        <p className="mb-7 text-gray-600">{t("emptyMessage")}</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-xl bg-[#173D2E] px-6 py-3 font-semibold text-white"
        >
          {t("shop")} <ArrowRight size={18} />
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F6EF] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/cart"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#173D2E] hover:underline"
        >
          <ArrowLeft size={17} /> {t("back")}
        </Link>

        <div className="mb-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C69B5C]">
            FurniHouse Ethiopia
          </p>
          <h1 className="mb-3 text-3xl font-bold text-[#173D2E] sm:text-4xl">
            {t("title")}
          </h1>
          <p className="max-w-3xl leading-7 text-gray-600">{t("subtitle")}</p>
        </div>

        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {[t("step1"), t("step2"), t("step3")].map((step, index) => (
            <div
              key={step}
              className="flex items-center gap-3 rounded-xl border border-[#E8E1D4] bg-white p-4"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#173D2E] text-sm font-bold text-white">
                {index + 1}
              </span>
              <span className="font-semibold text-[#173D2E]">{step}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_350px]">
          <div className="space-y-8">
            <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <Package className="text-[#C69B5C]" size={23} />
                <h2 className="text-xl font-bold text-[#173D2E]">{t("orderSummary")}</h2>
              </div>

              <div className="space-y-5">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-[#F8F6EF]">
                        <Package />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-[#242820]">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {t("quantity")}: {item.quantity || 1}
                      </p>
                    </div>

                    <p className="text-right text-sm font-bold text-[#173D2E]">
                      {formatETB(Number(item.price || 0) * Number(item.quantity || 1))}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-2 flex items-center gap-3">
                <ClipboardCheck className="text-[#C69B5C]" size={23} />
                <h2 className="text-xl font-bold text-[#173D2E]">{t("materialsTitle")}</h2>
              </div>

              <p className="mb-6 text-sm leading-6 text-gray-500">
                {t("materialsSubtitle")}
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {materialOptions.map(([value, label]) => (
                  <label
                    key={value}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#E8E1D4] p-4 transition hover:border-[#C69B5C]"
                  >
                    <input
                      type="checkbox"
                      checked={materials.includes(value)}
                      onChange={() => toggleMaterial(value)}
                      className="h-4 w-4 accent-[#173D2E]"
                    />
                    <span className="text-sm font-medium text-gray-700">{t(label)}</span>
                  </label>
                ))}
              </div>

              <label className="mt-6 block text-sm font-semibold text-[#173D2E]">
                {t("otherMaterial")}
                <textarea
                  value={otherMaterial}
                  onChange={(e) => setOtherMaterial(e.target.value)}
                  rows={3}
                  placeholder={t("otherPlaceholder")}
                  className="mt-2 w-full rounded-xl border border-[#E5E0D5] p-4 font-normal outline-none focus:border-[#173D2E]"
                />
              </label>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-2 flex items-center gap-3">
                <CalendarDays className="text-[#C69B5C]" size={23} />
                <h2 className="text-xl font-bold text-[#173D2E]">{t("appointmentTitle")}</h2>
              </div>

              <p className="mb-6 text-sm leading-6 text-gray-500">
                {t("appointmentSubtitle")}
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-[#173D2E]">
                  {t("date")} *
                  <input
                    type="date"
                    required
                    min={today || undefined}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#E5E0D5] p-3 font-normal outline-none focus:border-[#173D2E]"
                  />
                </label>

                <label className="block text-sm font-semibold text-[#173D2E]">
                  {t("time")} *
                  <select
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#E5E0D5] p-3 font-normal outline-none focus:border-[#173D2E]"
                  >
                    {timeOptions.map(([value, label]) => (
                      <option key={value} value={value}>{t(label)}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-6 rounded-xl border border-[#E8E1D4] bg-[#F8F6EF] p-5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 shrink-0 text-[#C69B5C]" size={21} />
                  <div>
                    <p className="font-bold text-[#173D2E]">{t("location")}</p>
                    <p className="mt-1 font-medium text-gray-800">{t("showroom")}</p>
                    <p className="mt-1 text-sm leading-6 text-gray-500">{t("showroomNote")}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="mb-6 text-xl font-bold text-[#173D2E]">{t("customerTitle")}</h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-[#173D2E] sm:col-span-2">
                  {t("fullName")} *
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("namePlaceholder")}
                    className="mt-2 w-full rounded-xl border border-[#E5E0D5] p-3 font-normal outline-none focus:border-[#173D2E]"
                  />
                </label>

                <label className="block text-sm font-semibold text-[#173D2E]">
                  {t("email")} *
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("emailPlaceholder")}
                    className="mt-2 w-full rounded-xl border border-[#E5E0D5] p-3 font-normal outline-none focus:border-[#173D2E]"
                  />
                </label>

                <label className="block text-sm font-semibold text-[#173D2E]">
                  {t("phone")} *
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t("phonePlaceholder")}
                    className="mt-2 w-full rounded-xl border border-[#E5E0D5] p-3 font-normal outline-none focus:border-[#173D2E]"
                  />
                </label>
              </div>

              <label className="mt-6 block text-sm font-semibold text-[#173D2E]">
                {t("notes")}
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder={t("notesPlaceholder")}
                  className="mt-2 w-full rounded-xl border border-[#E5E0D5] p-4 font-normal outline-none focus:border-[#173D2E]"
                />
              </label>
            </section>

            {error && (
              <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
                {t(error) || error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#173D2E] px-6 py-4 font-bold text-white transition hover:bg-[#102B21] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? t("submitting") : t("submit")}
              <ArrowRight size={19} />
            </button>
          </div>

          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="mb-6 text-xl font-bold text-[#173D2E]">{t("orderSummary")}</h2>

            <div className="mb-4 flex justify-between gap-4 text-sm text-gray-600">
              <span>{t("quantity")}</span>
              <span>{cart.reduce((sum, item) => sum + Number(item.quantity || 1), 0)}</span>
            </div>

            <div className="mb-5 flex justify-between gap-4 border-t border-[#E8E1D4] pt-5">
              <span className="font-semibold text-[#173D2E]">{t("subtotal")}</span>
              <span className="font-bold text-[#173D2E]">{formatETB(subtotal)}</span>
            </div>

            <p className="mb-5 text-xs leading-5 text-gray-500">{t("priceNote")}</p>

            <div className="rounded-xl bg-[#F8F6EF] p-4 text-sm leading-6 text-[#173D2E]">
              <CheckCircle2 className="mb-2" size={20} />
              <p className="font-semibold">{t("noOnlinePayment")}</p>
            </div>

            <p className="mt-5 text-xs leading-5 text-gray-400">{t("demoNotice")}</p>
          </aside>
        </form>
      </div>
    </main>
  );
}

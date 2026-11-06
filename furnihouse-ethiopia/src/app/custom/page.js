
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ImagePlus,
  Ruler,
  CalendarDays,
  Sparkles,
  Armchair,
  Trash2,
} from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";

const translations = {
  en: {
    eyebrow: "Made especially for you",
    title: "Design Your Own Furniture",
    intro: "Tell us what you imagine. Our team will help turn your ideas into furniture made for your home.",
    inspiration: "1. Find your inspiration",
    inspirationText: "Choose a design direction to get started.",
    modern: "Modern Minimalist",
    modernDesc: "Clean lines and simple elegance.",
    traditional: "Traditional Ethiopian",
    traditionalDesc: "Warm character and cultural inspiration.",
    luxury: "Luxury Design",
    luxuryDesc: "Elegant details and premium finishes.",
    space: "Space Saving",
    spaceDesc: "Smart designs for practical spaces.",
    own: "My Own Design",
    ownDesc: "I have a design idea of my own.",
    preferences: "2. Your furniture preferences",
    furnitureType: "Furniture type",
    chooseFurniture: "Select furniture type",
    bed: "Bed",
    wardrobe: "Wardrobe",
    door: "Door",
    storage: "Storage unit",
    sofa: "Sofa",
    dining: "Dining table",
    other: "Other",
    material: "Preferred material",
    chooseMaterial: "Select material",
    naturalWood: "Natural wood",
    engineeredWood: "Engineered wood",
    metalWood: "Wood and metal",
    upholstered: "Upholstered",
    otherMaterial: "Other / Not sure",
    color: "Preferred color",
    colorPlaceholder: "e.g. Dark brown, natural oak...",
    dimensions: "Dimensions",
    width: "Width (cm)",
    height: "Height (cm)",
    depth: "Depth (cm)",
    budget: "Estimated budget (ETB)",
    quantity: "Quantity",
    instructions: "Special instructions",
    instructionsPlaceholder: "Describe drawers, shelves, patterns, handles or other details...",
    reference: "3. Upload a reference image",
    referenceText: "Choose a picture of furniture you like. This is optional.",
    upload: "Choose an image",
    noImage: "No image selected",
    appointment: "4. Request an in-person appointment",
    appointmentText: "Choose when you would prefer to visit or meet our team. The appointment is not confirmed until our admin approves it.",
    appointmentDate: "Preferred date",
    appointmentTime: "Preferred time",
    chooseTime: "Choose a time",
    morning: "Morning (9 AM – 12 PM)",
    afternoon: "Afternoon (12 PM – 3 PM)",
    evening: "Late afternoon (3 PM – 5 PM)",
    location: "Preferred meeting location",
    locationPlaceholder: "e.g. FurniHouse showroom, Addis Ababa...",
    contact: "5. Your contact information",
    fullName: "Full name",
    namePlaceholder: "Enter your full name",
    email: "Email address",
    emailPlaceholder: "Enter your email",
    phone: "Phone number",
    phonePlaceholder: "Enter your phone number",
    submit: "Submit custom design request",
    submitting: "Submitting...",
    notice: "This is a demonstration request. Final design, pricing, appointment and production details will be confirmed by the company.",
    successTitle: "Your design request has been submitted!",
    successText: "Your request has been saved. The FurniHouse team can review your preferences and appointment request.",
    requestNumber: "Request reference",
    appointmentPending: "Appointment status: Awaiting confirmation",
    viewShop: "Explore furniture",
    backHome: "Back to home",
    required: "Please complete all required fields.",
    invalidEmail: "Please enter a valid email address.",
    imageTooLarge: "Please choose an image smaller than 5 MB.",
    chooseFile: "Choose another image",
    removeImage: "Remove image",
    cm: "cm",
  },

  am: {
    eyebrow: "ለእርስዎ ብቻ የተዘጋጀ",
    title: "የራስዎን የቤት ዕቃ ይንደፉ",
    intro: "የሚፈልጉትን ይንገሩን። ቡድናችን ሀሳብዎን ወደ ተግባራዊ የቤት ዕቃ እንዲቀይር ይረዳዎታል።",
    inspiration: "1. የንድፍ ሀሳብ ይምረጡ",
    inspirationText: "ለመጀመር የሚፈልጉትን የንድፍ አቅጣጫ ይምረጡ።",
    modern: "ዘመናዊ ቀላል ንድፍ",
    modernDesc: "ንጹህ መስመሮችና ቀላል ውበት።",
    traditional: "ባህላዊ የኢትዮጵያ ንድፍ",
    traditionalDesc: "ባህላዊ ገጽታና ሙቀት ያለው ውበት።",
    luxury: "የቅንጦት ንድፍ",
    luxuryDesc: "ውብ ዝርዝሮችና ጥራት ያላቸው አጨራረሶች።",
    space: "ቦታ ቆጣቢ ንድፍ",
    spaceDesc: "ለተግባራዊ ቦታዎች ብልጥ ንድፎች።",
    own: "የራሴ ንድፍ",
    ownDesc: "የራሴ የንድፍ ሀሳብ አለኝ።",
    preferences: "2. የቤት ዕቃ ምርጫዎችዎ",
    furnitureType: "የዕቃው አይነት",
    chooseFurniture: "የዕቃውን አይነት ይምረጡ",
    bed: "አልጋ",
    wardrobe: "ቁም ሳጥን",
    door: "በር",
    storage: "ማከማቻ ዕቃ",
    sofa: "ሶፋ",
    dining: "የመመገቢያ ጠረጴዛ",
    other: "ሌላ",
    material: "የሚመርጡት ቁሳቁስ",
    chooseMaterial: "ቁሳቁስ ይምረጡ",
    naturalWood: "ተፈጥሯዊ እንጨት",
    engineeredWood: "የተቀናበረ እንጨት",
    metalWood: "እንጨትና ብረት",
    upholstered: "በጨርቅ የተሸፈነ",
    otherMaterial: "ሌላ / እርግጠኛ አይደለሁም",
    color: "የሚመርጡት ቀለም",
    colorPlaceholder: "ለምሳሌ፦ ጥቁር ቡናማ፣ ተፈጥሯዊ የኦክ ቀለም...",
    dimensions: "መጠኖች",
    width: "ስፋት (ሴ.ሜ)",
    height: "ቁመት (ሴ.ሜ)",
    depth: "ጥልቀት (ሴ.ሜ)",
    budget: "የሚገመተው በጀት (ብር)",
    quantity: "ብዛት",
    instructions: "ልዩ መመሪያዎች",
    instructionsPlaceholder: "መሳቢያዎች፣ መደርደሪያዎች፣ ንድፎች ወይም ሌሎች ዝርዝሮችን ይግለጹ...",
    reference: "3. የማጣቀሻ ምስል ይጫኑ",
    referenceText: "የሚወዱትን የቤት ዕቃ ምስል ይምረጡ። ይህ አማራጭ ነው።",
    upload: "ምስል ይምረጡ",
    noImage: "ምንም ምስል አልተመረጠም",
    appointment: "4. የፊት ለፊት ቀጠሮ ይጠይቁ",
    appointmentText: "ቡድናችንን ለመጠየቅ ወይም ለመገናኘት የሚመችዎትን ቀን ይምረጡ። ቀጠሮው በአስተዳዳሪ እስኪረጋገጥ ድረስ አይጸድቅም።",
    appointmentDate: "የሚመርጡት ቀን",
    appointmentTime: "የሚመርጡት ሰዓት",
    chooseTime: "ሰዓት ይምረጡ",
    morning: "ጠዋት (9 – 12)",
    afternoon: "ከሰዓት (12 – 3)",
    evening: "ከሰዓት በኋላ (3 – 5)",
    location: "የሚመርጡት የመገናኛ ቦታ",
    locationPlaceholder: "ለምሳሌ፦ የፈርኒሃውስ ማሳያ ክፍል...",
    contact: "5. የእውቂያ መረጃዎ",
    fullName: "ሙሉ ስም",
    namePlaceholder: "ሙሉ ስምዎን ያስገቡ",
    email: "ኢሜይል",
    emailPlaceholder: "ኢሜይልዎን ያስገቡ",
    phone: "ስልክ ቁጥር",
    phonePlaceholder: "ስልክ ቁጥርዎን ያስገቡ",
    submit: "የንድፍ ጥያቄውን ያስገቡ",
    submitting: "በመላክ ላይ...",
    notice: "ይህ የማሳያ ጥያቄ ነው። የመጨረሻ ንድፍ፣ ዋጋ፣ ቀጠሮና የምርት ዝርዝሮች በድርጅቱ ይረጋገጣሉ።",
    successTitle: "የንድፍ ጥያቄዎ ተልኳል!",
    successText: "ጥያቄዎ ተቀምጧል። የፈርኒሃውስ ቡድን ምርጫዎችዎንና የቀጠሮ ጥያቄዎን መመልከት ይችላል።",
    requestNumber: "የጥያቄ መለያ",
    appointmentPending: "የቀጠሮ ሁኔታ፦ ማረጋገጫ በመጠባበቅ ላይ",
    viewShop: "የቤት ዕቃዎችን ይመልከቱ",
    backHome: "ወደ መነሻ ገጽ",
    required: "እባክዎ አስፈላጊ መስኮችን ይሙሉ።",
    invalidEmail: "እባክዎ ትክክለኛ ኢሜይል ያስገቡ።",
    imageTooLarge: "እባክዎ ከ5 MB ያነሰ ምስል ይምረጡ።",
    chooseFile: "ሌላ ምስል ይምረጡ",
    removeImage: "ምስሉን አስወግድ",
    cm: "ሴ.ሜ",
  },

  om: {
    eyebrow: "Isinii qofaaf kan qophaa'e",
    title: "Meeshaa Manaa Ofii Keessanii Dizaayinii Godhaa",
    intro: "Waan yaaddan nutti himaa. Gareen keenya yaada keessan meeshaa manaaf mijatuutti jijjiiruuf isin gargaara.",
    inspiration: "1. Yaada dizaayinii argadhaa",
    inspirationText: "Jalqabuuf kallattii dizaayinii filadhaa.",
    modern: "Dizaayinii Ammayyaa",
    modernDesc: "Sarara qulqulluu fi bareedina salphaa.",
    traditional: "Aadaa Itoophiyaa",
    traditionalDesc: "Miira aadaa fi bareedina ho'aa.",
    luxury: "Dizaayinii Gatii Olaanaa",
    luxuryDesc: "Faaya bareedaa fi xumura qulqullina olaanaa.",
    space: "Bakka Qusatu",
    spaceDesc: "Dizaayinii bakka fayyadamtootaaf mijatu.",
    own: "Dizaayinii Koo",
    ownDesc: "Yaada dizaayinii mataa koo qaba.",
    preferences: "2. Filannoo meeshaa manaa keessanii",
    furnitureType: "Gosa meeshaa manaa",
    chooseFurniture: "Gosa meeshaa manaa filadhaa",
    bed: "Siree",
    wardrobe: "Kaabinee uffataa",
    door: "Balbala",
    storage: "Meeshaa kuusaa",
    sofa: "Soofaa",
    dining: "Minjaala nyaataa",
    other: "Kan biraa",
    material: "Meeshaa ijaarsaa filattan",
    chooseMaterial: "Meeshaa ijaarsaa filadhaa",
    naturalWood: "Muka uumamaa",
    engineeredWood: "Muka qophaa'e",
    metalWood: "Muka fi sibiila",
    upholstered: "Huccuun kan haguugame",
    otherMaterial: "Kan biraa / Hin murtoofne",
    color: "Halluu filattan",
    colorPlaceholder: "Fakkeenyaaf: bunaa dukkanaa, halluu muka uumamaa...",
    dimensions: "Safartuuwwan",
    width: "Bal'ina (cm)",
    height: "Olka'iinsa (cm)",
    depth: "Gadi fageenya (cm)",
    budget: "Baajata tilmaamame (ETB)",
    quantity: "Baay'ina",
    instructions: "Qajeelfama addaa",
    instructionsPlaceholder: "Saanduqa, iddoo kuusaa, fakkii ykn bal'ina biroo ibsaa...",
    reference: "3. Suuraa fakkeenyaa olkaa'aa",
    referenceText: "Suuraa meeshaa manaa jaallattan filadhaa. Kun dirqama miti.",
    upload: "Suuraa filadhaa",
    noImage: "Suuraan hin filatamne",
    appointment: "4. Beellama wal arguu gaafadhaa",
    appointmentText: "Garee keenya waliin wal argachuuf guyyaa filadhaa. Beellamni bulchaan hanga mirkaneessutti hin mirkanaa'u.",
    appointmentDate: "Guyyaa filattan",
    appointmentTime: "Yeroo filattan",
    chooseTime: "Yeroo filadhaa",
    morning: "Ganama (9 – 12)",
    afternoon: "Waaree booda (12 – 3)",
    evening: "Waaree booda (3 – 5)",
    location: "Bakka wal arguu filattan",
    locationPlaceholder: "Fakkeenyaaf: Iddoo agarsiisa FurniHouse...",
    contact: "5. Odeeffannoo quunnamtii keessanii",
    fullName: "Maqaa guutuu",
    namePlaceholder: "Maqaa guutuu keessan galchaa",
    email: "Teessoo imeelii",
    emailPlaceholder: "Imeelii keessan galchaa",
    phone: "Lakkoofsa bilbilaa",
    phonePlaceholder: "Lakkoofsa bilbilaa keessan galchaa",
    submit: "Gaaffii dizaayinii ergaa",
    submitting: "Ergamaa jira...",
    notice: "Kun gaaffii agarsiisaati. Dizaayiniin, gatiin, beellamni fi odeeffannoon oomishaa dhumaa dhaabbatichaan ni mirkanaa'u.",
    successTitle: "Gaaffiin dizaayinii keessanii ergameera!",
    successText: "Gaaffiin keessan olkaa'ameera. Gareen FurniHouse filannoo fi gaaffii beellamaa keessanii ilaalu danda'a.",
    requestNumber: "Lakkoofsa gaaffii",
    appointmentPending: "Haala beellamaa: Mirkaneessa eeggachaa jira",
    viewShop: "Meeshaalee manaa ilaalaa",
    backHome: "Gara fuula jalqabaatti",
    required: "Maaloo bakka barbaachisoo hunda guutaa.",
    invalidEmail: "Maaloo imeelii sirrii galchaa.",
    imageTooLarge: "Maaloo suuraa 5 MB gadi filadhaa.",
    chooseFile: "Suuraa biraa filadhaa",
    removeImage: "Suuraa haqaa",
    cm: "cm",
  },
};

const designOptions = [
  { id: "modern", icon: "✦" },
  { id: "traditional", icon: "✺" },
  { id: "luxury", icon: "◇" },
  { id: "space", icon: "▦" },
  { id: "own", icon: "✎" },
];

export default function CustomFurniturePage() {
  const { language } = useLanguage();
  const { user, ready } = useAuth();
  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  const [style, setStyle] = useState("modern");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [submittedRequest, setSubmittedRequest] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!image) {
      setImagePreview("");
      return;
    }

    const preview = URL.createObjectURL(image);
    setImagePreview(preview);

    return () => URL.revokeObjectURL(preview);
  }, [image]);

  function handleImageChange(event) {
    const selected = event.target.files?.[0];

    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      setError(t("required"));
      event.target.value = "";
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      setError(t("imageTooLarge"));
      event.target.value = "";
      return;
    }

    setError("");
    setImage(selected);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    if (!ready || !user || user.role !== "customer") {
  setError("Please sign in to your customer account before submitting a custom design.");
  setSubmitting(false);
  return;
}

    const form = event.currentTarget;
    const formData = new FormData(form);

   const email = user?.email?.trim().toLowerCase() || "";

if (!email) {
  setError("Your account email could not be found. Please sign in again.");
  setSubmitting(false);
  return;
}

    try {
      const requestId =
        "FH-" + Date.now().toString().slice(-8);

      const request = {
        id: requestId,
       customer: {
  name: user.name,
  email: user.email.trim().toLowerCase(),
  phone: String(formData.get("phone") || "").trim(),
},
        design: {
          style,
          furnitureType: formData.get("furnitureType"),
          material: formData.get("material"),
          color: formData.get("color"),
          width: formData.get("width"),
          height: formData.get("height"),
          depth: formData.get("depth"),
          budget: formData.get("budget"),
          quantity: formData.get("quantity"),
          instructions: formData.get("instructions"),
          referenceImageName: image?.name || null,
        },
        appointment: {
          date: formData.get("appointmentDate"),
          time: formData.get("appointmentTime"),
          location: formData.get("location"),
          status: "pending",
        },
        status: "submitted",
        paymentStatus: "not_started",
        createdAt: new Date().toISOString(),
      };

      const existingRequests = JSON.parse(
        localStorage.getItem("furnihouse-custom-requests") || "[]"
      );

      const requests = Array.isArray(existingRequests)
        ? existingRequests
        : [];

      requests.push(request);

      localStorage.setItem(
        "furnihouse-custom-requests",
        JSON.stringify(requests)
      );

      const existingNotifications = JSON.parse(
        localStorage.getItem("furnihouse-notifications") || "[]"
      );

      const notifications = Array.isArray(existingNotifications)
        ? existingNotifications
        : [];

      notifications.unshift({
        id: requestId,
        title: "Custom design request received",
        message: `Your request ${requestId} has been submitted. Your appointment is awaiting confirmation.`,
        type: "custom_request",
        createdAt: new Date().toISOString(),
        read: false,
      });

      localStorage.setItem(
        "furnihouse-notifications",
        JSON.stringify(notifications)
      );

      window.dispatchEvent(new Event("customRequestUpdated"));
      window.dispatchEvent(new Event("notificationsUpdated"));

      setSubmittedRequest(request);
      form.reset();
      setStyle("modern");
      setImage(null);
    } catch (err) {
      console.error("Could not save custom request:", err);
      setError("Could not save your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "mt-2 w-full border border-[#dedbd0] bg-white px-4 py-3 text-sm text-[#242820] outline-none transition focus:border-[#173D2E]";

  const labelClass =
    "text-sm font-medium text-[#242820]";

  const sectionClass =
    "border border-[#e6e1d5] bg-white p-6 shadow-sm md:p-9";

 function todayDate() {
  if (typeof window === "undefined") {
    return "";
  }

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

  if (submittedRequest) {
    return (
      <main className="min-h-screen bg-[#F8F6EF] px-5 py-20">
        <div className="container-width mx-auto max-w-2xl bg-white p-8 text-center shadow-sm md:p-14">
          <CheckCircle2
            size={64}
            className="mx-auto mb-6 text-[#173D2E]"
          />

          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[#806044]">
            FurniHouse Ethiopia
          </p>

          <h1 className="mb-5 text-3xl font-semibold text-[#173D2E]">
            {t("successTitle")}
          </h1>

          <p className="mb-8 leading-7 text-gray-600">
            {t("successText")}
          </p>

          <div className="mb-6 bg-[#F8F6EF] p-5 text-left">
            <p className="text-sm text-gray-500">
              {t("requestNumber")}
            </p>
            <p className="mt-1 text-xl font-semibold text-[#173D2E]">
              {submittedRequest.id}
            </p>

            <p className="mt-5 text-sm font-medium text-[#806044]">
              {t("appointmentPending")}
            </p>
          </div>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/products" className="gold-button">
              {t("viewShop")}
            </Link>

            <Link href="/" className="outline-button">
              {t("backHome")}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F6EF] px-5 py-14">
      <div className="container-width mx-auto max-w-5xl">

        {/* Page introduction */}
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[#806044]">
            <Sparkles size={16} />
            {t("eyebrow")}
          </p>

          <h1 className="mb-5 text-4xl font-semibold leading-tight text-[#173D2E] md:text-6xl">
            {t("title")}
          </h1>

          <p className="max-w-2xl leading-8 text-gray-600">
            {t("intro")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Inspiration */}
          <section className={sectionClass}>
            <div className="mb-7">
              <p className="mb-2 text-sm text-[#806044]">01 / DESIGN</p>
              <h2 className="text-2xl font-semibold text-[#173D2E]">
                {t("inspiration")}
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                {t("inspirationText")}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {designOptions.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  onClick={() => setStyle(option.id)}
                  className={`border p-5 text-left transition ${
                    style === option.id
                      ? "border-[#173D2E] bg-[#edf2ec] ring-1 ring-[#173D2E]"
                      : "border-[#e6e1d5] hover:border-[#806044]"
                  }`}
                >
                  <span className="mb-4 block text-3xl text-[#806044]">
                    {option.icon}
                  </span>

                  <span className="block font-semibold text-[#173D2E]">
                    {t(option.id)}
                  </span>

                  <span className="mt-2 block text-sm leading-6 text-gray-500">
                    {t(option.id + "Desc")}
                  </span>

                  {style === option.id && (
                    <span className="mt-4 block text-xs font-semibold text-[#173D2E]">
                      <CheckCircle2 size={15} className="mr-1 inline" />
                      Selected
                    </span>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Furniture preferences */}
          <section className={sectionClass}>
            <div className="mb-7">
              <p className="mb-2 text-sm text-[#806044]">02 / DETAILS</p>
              <h2 className="text-2xl font-semibold text-[#173D2E]">
                {t("preferences")}
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <label className={labelClass}>
                {t("furnitureType")}
                <select
                  name="furnitureType"
                  required
                  defaultValue=""
                  className={inputClass}
                >
                  <option value="" disabled>{t("chooseFurniture")}</option>
                  <option value="Bed">{t("bed")}</option>
                  <option value="Wardrobe">{t("wardrobe")}</option>
                  <option value="Door">{t("door")}</option>
                  <option value="Storage">{t("storage")}</option>
                  <option value="Sofa">{t("sofa")}</option>
                  <option value="Dining table">{t("dining")}</option>
                  <option value="Other">{t("other")}</option>
                </select>
              </label>

              <label className={labelClass}>
                {t("material")}
                <select
                  name="material"
                  required
                  defaultValue=""
                  className={inputClass}
                >
                  <option value="" disabled>{t("chooseMaterial")}</option>
                  <option value="Natural wood">{t("naturalWood")}</option>
                  <option value="Engineered wood">{t("engineeredWood")}</option>
                  <option value="Wood and metal">{t("metalWood")}</option>
                  <option value="Upholstered">{t("upholstered")}</option>
                  <option value="Other / Not sure">{t("otherMaterial")}</option>
                </select>
              </label>

              <label className={labelClass}>
                {t("color")}
                <input
                  name="color"
                  required
                  placeholder={t("colorPlaceholder")}
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                {t("budget")}
                <input
                  name="budget"
                  type="number"
                  min="0"
                  required
                  placeholder="e.g. 25000"
                  className={inputClass}
                />
              </label>
            </div>

            <div className="mt-8">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-[#173D2E]">
                <Ruler size={18} />
                {t("dimensions")}
              </h3>

              <div className="grid gap-5 sm:grid-cols-3">
                <label className={labelClass}>
                  {t("width")}
                  <input name="width" type="number" min="1" required className={inputClass} />
                </label>

                <label className={labelClass}>
                  {t("height")}
                  <input name="height" type="number" min="1" required className={inputClass} />
                </label>

                <label className={labelClass}>
                  {t("depth")}
                  <input name="depth" type="number" min="1" required className={inputClass} />
                </label>
              </div>
            </div>

            <label className={`${labelClass} mt-7 block`}>
              {t("quantity")}
              <input
                name="quantity"
                type="number"
                min="1"
                max="100"
                defaultValue="1"
                required
                className={inputClass}
              />
            </label>

            <label className={`${labelClass} mt-7 block`}>
              {t("instructions")}
              <textarea
                name="instructions"
                rows="5"
                placeholder={t("instructionsPlaceholder")}
                className={inputClass}
              />
            </label>
          </section>

          {/* Reference image */}
          <section className={sectionClass}>
            <div className="mb-6">
              <p className="mb-2 text-sm text-[#806044]">03 / INSPIRATION IMAGE</p>
              <h2 className="text-2xl font-semibold text-[#173D2E]">
                {t("reference")}
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                {t("referenceText")}
              </p>
            </div>

            <label className="flex cursor-pointer flex-col items-center justify-center border-2 border-dashed border-[#cfc8b8] bg-[#F8F6EF] px-5 py-10 text-center transition hover:border-[#173D2E]">
              <ImagePlus size={35} className="mb-3 text-[#806044]" />
              <span className="font-semibold text-[#173D2E]">
                {image ? t("chooseFile") : t("upload")}
              </span>
              <span className="mt-2 text-sm text-gray-500">
                {image ? image.name : t("noImage")}
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {imagePreview && (
              <div className="mt-5 max-w-sm">
                <img
                  src={imagePreview}
                  alt="Selected furniture reference"
                  className="max-h-64 w-full object-contain"
                />

                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="mt-3 flex items-center gap-2 text-sm text-red-600"
                >
                  <Trash2 size={15} />
                  {t("removeImage")}
                </button>
              </div>
            )}
          </section>

          {/* Appointment */}
          <section className={sectionClass}>
            <div className="mb-7">
              <p className="mb-2 text-sm text-[#806044]">04 / MEETING</p>
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#173D2E]">
                <CalendarDays size={23} />
                {t("appointment")}
              </h2>
              <p className="mt-3 text-sm leading-7 text-gray-500">
                {t("appointmentText")}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <label className={labelClass}>
                {t("appointmentDate")}
                <input
                  name="appointmentDate"
                  type="date"
                  min={todayDate()}
                  required
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                {t("appointmentTime")}
                <select
                  name="appointmentTime"
                  required
                  defaultValue=""
                  className={inputClass}
                >
                  <option value="" disabled>{t("chooseTime")}</option>
                  <option value="Morning">{t("morning")}</option>
                  <option value="Afternoon">{t("afternoon")}</option>
                  <option value="Late afternoon">{t("evening")}</option>
                </select>
              </label>
            </div>

            <label className={`${labelClass} mt-6 block`}>
              {t("location")}
              <input
                name="location"
                required
                placeholder={t("locationPlaceholder")}
                className={inputClass}
              />
            </label>
          </section>

          {/* Customer contact */}
          <section className={sectionClass}>
            <div className="mb-7">
              <p className="mb-2 text-sm text-[#806044]">05 / CONTACT</p>
              <h2 className="text-2xl font-semibold text-[#173D2E]">
                {t("contact")}
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <label className={labelClass}>
                {t("fullName")}
                <input
                  name="name"
                  required
                  placeholder={t("namePlaceholder")}
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                {t("email")}
                <input
                  name="email"
                  type="email"
                  required
                  placeholder={t("emailPlaceholder")}
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                {t("phone")}
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder={t("phonePlaceholder")}
                  className={inputClass}
                />
              </label>
            </div>
          </section>

          {/* Error message */}
          {error && (
            <div
              role="alert"
              className="border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="bg-[#173D2E] p-7 text-white md:p-9">
            <p className="mb-6 text-sm leading-7 text-white/75">
              {t("notice")}
            </p>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-3 bg-[#C69B5C] px-6 py-4 font-semibold text-[#102B21] transition hover:bg-[#d7b477] disabled:opacity-60 sm:w-auto"
            >
              {submitting ? t("submitting") : t("submit")}
              <ArrowRight size={18} />
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}


"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { translations } from "@/data/translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("furnihouse-language");

    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }

    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  function changeLanguage(newLanguage) {
    if (!translations[newLanguage]) return;

    setLanguage(newLanguage);
    localStorage.setItem("furnihouse-language", newLanguage);
  }

  function t(key) {
    return translations[language]?.[key] ?? translations.en[key] ?? key;
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        t,
        ready,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}

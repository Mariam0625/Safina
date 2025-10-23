import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="flex gap-2">
      <button
        className={`px-3 py-1 rounded-full ${language === "en" ? "bg-teal-600 text-white" : "bg-gray-100"}`}
        onClick={() => setLanguage("en")}
      >
        English
      </button>
      <button
        className={`px-3 py-1 rounded-full ${language === "ar" ? "bg-teal-600 text-white" : "bg-gray-100"}`}
        onClick={() => setLanguage("ar")}
      >
        عربي
      </button>
    </div>
  );
}

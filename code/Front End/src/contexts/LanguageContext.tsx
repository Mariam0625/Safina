import React, { createContext, useContext, useState, useEffect } from "react";

type UILanguage = "en" | "ar";                 // UI toggle
type Locale = "en-US" | "ar-AE";               // Backend locale

interface LanguageContextType {
  language: UILanguage;                        // "en" | "ar"
  setLanguage: (lang: UILanguage) => void;
  t: (key: string) => string;
  locale: Locale;                              // "en-US" | "ar-AE" (for backend)
}

const toLocale = (lang: UILanguage): Locale => (lang === "ar" ? "ar-AE" : "en-US");

const translations = {
  en: {
    welcome: "Hi. I'm Safina.",
    welcomeSub: "No name needed. Just tell me how your heart feels today.",
    startJourney: "Start Your Journey",
    howFeeling: "How are you feeling today?",
    dailyCheckin: "Daily Check-in",
    yourJourney: "Your Journey",
    resiliencePathway: "Resilience Pathway",
    stories: "Stories",
    resources: "Resources",
    speakHeart: "Speak from your heart...",
    emojiFeeling: "Or choose an emoji",
    blossomMap: "Your Blossom",
    resilience: "Resilience",
    growth: "Growth Journey",
    realStories: "Real Stories",
    anonymousVoices: "From youth like you",
    opportunities: "Opportunities",
    forYou: "Personalized for you",
    jobSearchJourney: "Job Search Journey",
    trackProgress: "Track applications, interviews & emotional milestones",
    applications: "Applications",
    interviews: "Interviews",
    rejections: "Rejections",
    offers: "Offers",
    addMilestone: "Add Milestone",
    yourBadges: "Your Resilience Badges",
    reframingPrompt: "Reframing Prompt",
    whatLearned: "What did you learn? What's one small win?",
    microAction: "Micro-Action",
    tweakCoverLetter: "Let's tweak your cover letter together — just 5 minutes.",
    viewPrompt: "View Prompt",
    takeAction: "Take Action",
    courageousApplicant: "Courageous Applicant",
    feedbackSeeker: "Feedback Seeker",
    persistentDreamer: "Persistent Dreamer",
    resilientSpirit: "Resilient Spirit",
    grateful: "Grateful",
    happy: "Happy",
    okay: "Okay",
    struggling: "Struggling",
    heavy: "Heavy",
    // Story titles
    storyTitle1: "From 10 Rejections to a Role at ADNOC",
    storyTitle2: "Balancing Family & Dreams in AI",
    storyTitle3: "Finding My Voice After Anxiety",
    // Story themes
    themeHope: "Hope",
    themeCourage: "Courage",
    themeGrowth: "Growth",
    // Durations
    duration2min: "2 min",
    duration1min: "1.5 min",
    // Buttons and actions
    shareStory: "Share Your Story (Anonymous)",
    // Toast messages
    listeningHeart: "Listening to your heart...",
    speakNaturally: "Speak naturally. Take your time.",
    thankSharing: "Thank you for sharing",
    feelingsMatter: "Your feelings matter.",
    feelingNoted: "Feeling noted",
    youreFeeling: "You're feeling",
    today: "today",
    recordingTapStop: "Recording... Tap to stop",
  },
  ar: {
    // Hero & onboarding
    welcome: "هلا، أنا سفينة.",
    welcomeSub: "ما نحتاج اسم. خبّرني بس شحال قلبك اليوم.",
    startJourney: "ابدأ رحلتك",
  
    // Nav & sections
    howFeeling: "شو إحساسك اليوم؟",
    dailyCheckin: "تسجيل يومي",
    yourJourney: "رحلتك",
    resiliencePathway: "درب المرونة",
    stories: "قصص",
    resources: "موارد",
  
    // Inputs
    speakHeart: "ارمس من قلبك...",
    emojiFeeling: "أو اختر إيموجي",
  
    // Dashboard bits
    blossomMap: "زهرتك",
    resilience: "المرونة",
    growth: "رحلة النمو",
  
    // Stories list
    realStories: "قصص حقيقية",
    anonymousVoices: "من شباب وبنات مثلك",
  
    // Opportunities
    opportunities: "فرص",
    forYou: "مخصّصة لك",
  
    // Pathway
    jobSearchJourney: "رحلة تدوير الشغل",
    trackProgress: "تابِع التقديمات والمقابلات ومحطات الشعور",
    applications: "تقديمات",
    interviews: "مقابلات",
    rejections: "رفض",
    offers: "عروض",
    addMilestone: "أضِف محطة",
  
    // Badges & prompts
    yourBadges: "أوسمتك",
    reframingPrompt: "غيّر النظرة",
    whatLearned: "شو تعلّمت؟ وش الفوز الصغير اليوم؟",
    microAction: "خطوة صغيرة",
    tweakCoverLetter: "خلّنا نعدّل خطاب التقديم شوي — ٥ دقايق بس.",
    viewPrompt: "شوف الاقتراح",
    takeAction: "خذ خطوة",
  
    // Badge names
    courageousApplicant: "متقدّم شجاع",
    feedbackSeeker: "يدوّر الملاحظات",
    persistentDreamer: "حالم مثابر",
    resilientSpirit: "روح قوية",
  
    // Feelings (keep short for buttons)
    grateful: "ممتنّ",
    happy: "مبسوط",
    okay: "تمام",
    struggling: "مضغوط",
    heavy: "ثقيل الخاطر",
  
    // Story titles
    storyTitle1: "من ١٠ رفضات لوظيفة في أدنوك",
    storyTitle2: "أوازن بين العيلة وحلمي في الذكاء الاصطناعي",
    storyTitle3: "لقيت صوتي بعد القلق",
  
    // Story themes
    themeHope: "أمل",
    themeCourage: "شجاعة",
    themeGrowth: "تطوّر",
  
    // Durations
    duration2min: "دقيقتين",
    duration1min: "دقيقة ونص",
  
    // Actions & toasts
    shareStory: "شارك قصتك (بدون اسم)",
    listeningHeart: "أسمعك...",
    speakNaturally: "ارمس على راحتك، خذ وقتك.",
    thankSharing: "مشكور/ة على المشاركة",
    feelingsMatter: "مشاعرك تهمّنا.",
    feelingNoted: "سجّلنا إحساسك",
    youreFeeling: "حاس/ة إنك",
    today: "اليوم",
    recordingTapStop: "قاعدين نسجّل… اضغط لإيقاف"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<UILanguage>(() => {
    // initial load from localStorage (fallback to 'ar' to match backend default)
    return (localStorage.getItem("language") as UILanguage) || "ar";
  });

  // keep <html> dir/lang + persist choice
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) =>
    (translations[language] as any)[key] ?? key;

  const locale: Locale = toLocale(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, locale }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

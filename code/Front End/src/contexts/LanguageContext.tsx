import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

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
    welcome: "مرحبا. أنا سفينه.",
    welcomeSub: "ما تحتاج اسم. بس قولي شلون حاس قلبك اليوم.",
    startJourney: "ابدا رحلتك",
    howFeeling: "شو احساسك اليوم؟",
    dailyCheckin: "تسجيل يومي",
    yourJourney: "رحلتك",
    resiliencePathway: "طريق القوة",
    stories: "قصص",
    resources: "موارد",
    speakHeart: "ارمس من قلبك...",
    emojiFeeling: "أو اختار رمز تعبيري",
    blossomMap: "زهرتك",
    resilience: "القوة",
    growth: "رحلة التطور",
    realStories: "قصص حقيقية",
    anonymousVoices: "من شباب مثلك",
    opportunities: "فرص",
    forYou: "مخصصة لك",
    jobSearchJourney: "رحلة التدوير",
    trackProgress: "تتبع طلباتك ومقابلاتك وإنجازاتك",
    applications: "الطلبات",
    interviews: "المقابلات",
    rejections: "الرفض",
    offers: "العروض",
    addMilestone: "زد إنجاز",
    yourBadges: "اوسمتك",
    reframingPrompt: "غير نظرتك",
    whatLearned: "شو تعلمت؟ شو إنجاز صغير سويته؟",
    microAction: "خطوة صغيرة",
    tweakCoverLetter: "يالله نعدل خطاب التقديم سوا - ٥ دقايق بس.",
    viewPrompt: "شوف الاقتراح",
    takeAction: "سو اكشن",
    courageousApplicant: "متقدم شجاع",
    feedbackSeeker: "يدور ملاحظات",
    persistentDreamer: "حالم مثابر",
    resilientSpirit: "روح قوية",
    grateful: "ممتن",
    happy: "مبسوط",
    okay: "عادي",
    struggling: "تعبان",
    heavy: "ثقيل",
    // Story titles
    storyTitle1: "من ١٠ رفضات لوظيفة في أدنوك",
    storyTitle2: "أوازن بين العيلة وحلمي بالذكاء الاصطناعي",
    storyTitle3: "لقيت صوتي بعد القلق",
    // Story themes
    themeHope: "أمل",
    themeCourage: "شجاعة",
    themeGrowth: "تطور",
    // Durations
    duration2min: "٢ دقيقة",
    duration1min: "دقيقة ونص",
    // Buttons and actions
    shareStory: "شارك قصتك (مجهول)",
    // Toast messages
    listeningHeart: "أسمعك...",
    speakNaturally: "احكي براحتك. خذ وقتك.",
    thankSharing: "شكراً على المشاركة",
    feelingsMatter: "مشاعرك مهمة.",
    feelingNoted: "سجلنا إحساسك",
    youreFeeling: "حاسك",
    today: "اليوم",
    recordingTapStop: "يسجل... اضغط عشان توقف",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

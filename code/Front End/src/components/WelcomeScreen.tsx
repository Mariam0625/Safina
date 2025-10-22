import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Flower2, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen gradient-calm flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 opacity-20 animate-float">
        <Flower2 className="w-16 h-16 text-primary" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 animate-float" style={{ animationDelay: '2s' }}>
        <Sparkles className="w-12 h-12 text-accent" />
      </div>

      {/* Language selector */}
      <div className="absolute top-6 right-6 flex gap-2">
        <Button
          variant={language === 'en' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setLanguage('en')}
          className="shadow-soft"
        >
          English
        </Button>
        <Button
          variant={language === 'ar' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setLanguage('ar')}
          className="shadow-soft"
        >
          عربي
        </Button>
      </div>

      {/* Main content */}
      <div className="max-w-2xl text-center space-y-8 animate-fade-in">
        {/* Logo/Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full gradient-warm flex items-center justify-center shadow-soft animate-pulse-slow">
              <Flower2 className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-secondary/80 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Welcome text */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            {t('welcome')}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
            {t('welcomeSub')}
          </p>
        </div>

        {/* CTA Button */}
        <Button 
          size="lg"
          onClick={onStart}
          className="text-lg px-8 py-6 shadow-soft hover:shadow-lg transition-smooth gradient-warm border-0 text-white font-semibold"
        >
          {t('startJourney')}
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;

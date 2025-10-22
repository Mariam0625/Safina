import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Flower2, TrendingUp, Award } from "lucide-react";

const BlossomMap = () => {
  const { t } = useLanguage();

  // Mock data for visualization
  const petals = [
    { id: 1, size: 'large', color: 'bg-pink-400', rotation: 0 },
    { id: 2, size: 'large', color: 'bg-pink-300', rotation: 72 },
    { id: 3, size: 'medium', color: 'bg-pink-200', rotation: 144 },
    { id: 4, size: 'small', color: 'bg-pink-100', rotation: 216 },
    { id: 5, size: 'small', color: 'bg-gray-200', rotation: 288 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">{t('yourJourney')}</h2>
        <p className="text-muted-foreground">Watch yourself bloom</p>
      </div>

      {/* Visual flower map */}
      <Card className="p-8 shadow-card">
        <div className="relative w-full aspect-square max-w-sm mx-auto">
          {/* Center circle */}
          <div className="absolute inset-0 m-auto w-20 h-20 rounded-full gradient-warm shadow-soft flex items-center justify-center z-10">
            <Flower2 className="w-10 h-10 text-white" />
          </div>

          {/* Petals */}
          {petals.map((petal) => (
            <div
              key={petal.id}
              className={`absolute inset-0 m-auto origin-center transition-smooth hover:scale-110`}
              style={{
                transform: `rotate(${petal.rotation}deg) translateY(-80px)`,
              }}
            >
              <div
                className={`w-16 h-20 ${petal.color} rounded-full shadow-soft animate-float`}
                style={{
                  animationDelay: `${petal.id * 0.5}s`,
                  transform: `rotate(-${petal.rotation}deg)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Growth caption */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          5 petals grown this week 🌸
        </p>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 shadow-card text-center space-y-2 hover:shadow-soft transition-smooth">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">7</p>
          <p className="text-sm text-muted-foreground">{t('growth')}</p>
        </Card>

        <Card className="p-4 shadow-card text-center space-y-2 hover:shadow-soft transition-smooth">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-accent" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">3</p>
          <p className="text-sm text-muted-foreground">{t('resilience')}</p>
        </Card>
      </div>
    </div>
  );
};

export default BlossomMap;

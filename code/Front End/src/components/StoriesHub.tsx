import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Play, Heart, Sparkles } from "lucide-react";

const StoriesHub = () => {
  const { t } = useLanguage();

  const stories = [
    {
      id: 1,
      titleKey: "storyTitle1",
      durationKey: "duration2min",
      themeKey: "themeHope",
      color: "gradient-hope",
      icon: Sparkles,
    },
    {
      id: 2,
      titleKey: "storyTitle2",
      durationKey: "duration1min",
      themeKey: "themeCourage",
      color: "gradient-warm",
      icon: Heart,
    },
    {
      id: 3,
      titleKey: "storyTitle3",
      durationKey: "duration2min",
      themeKey: "themeGrowth",
      color: "gradient-calm",
      icon: Play,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">{t('realStories')}</h2>
        <p className="text-muted-foreground">{t('anonymousVoices')}</p>
      </div>

      <div className="space-y-4">
        {stories.map((story) => (
          <Card
            key={story.id}
            className="p-6 shadow-card hover:shadow-soft transition-smooth cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl ${story.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-smooth`}>
                <story.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-foreground leading-tight">
                  {t(story.titleKey)}
                </h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{t(story.durationKey)}</span>
                  <span>•</span>
                  <span>{t(story.themeKey)}</span>
                </div>
              </div>

              {/* Play button */}
              <Button
                size="icon"
                variant="ghost"
                className="shrink-0 hover:bg-primary/10 hover:text-primary"
              >
                <Play className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Button variant="outline" className="w-full">
        {t('shareStory')}
      </Button>
    </div>
  );
};

export default StoriesHub;

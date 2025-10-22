import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mic, MicOff, Heart, Smile, Meh, Frown, CloudRain } from "lucide-react";
import { toast } from "sonner";

const DailyCheckin = () => {
  const { t } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  const emojis = [
    { icon: Heart, key: "grateful", color: "text-pink-500" },
    { icon: Smile, key: "happy", color: "text-yellow-500" },
    { icon: Meh, key: "okay", color: "text-blue-500" },
    { icon: Frown, key: "struggling", color: "text-purple-500" },
    { icon: CloudRain, key: "heavy", color: "text-gray-500" },
  ];

  const handleRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.success(t('listeningHeart'), {
        description: t('speakNaturally'),
      });
    } else {
      toast.success(t('thankSharing'), {
        description: t('feelingsMatter'),
      });
    }
  };

  const handleEmojiSelect = (key: string) => {
    setSelectedEmoji(key);
    toast.success(t('feelingNoted'), {
      description: `${t('youreFeeling')} ${t(key)} ${t('today')}.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">{t('howFeeling')}</h2>
        <p className="text-muted-foreground">{t('dailyCheckin')}</p>
      </div>

      {/* Voice input */}
      <Card className="p-8 shadow-card text-center space-y-4">
        <p className="text-muted-foreground">{t('speakHeart')}</p>
        <Button
          size="lg"
          onClick={handleRecord}
          className={`w-24 h-24 rounded-full shadow-soft transition-smooth ${
            isRecording 
              ? 'bg-destructive hover:bg-destructive/90 animate-pulse' 
              : 'gradient-warm border-0'
          }`}
        >
          {isRecording ? (
            <MicOff className="w-10 h-10 text-white" />
          ) : (
            <Mic className="w-10 h-10 text-white" />
          )}
        </Button>
        {isRecording && (
          <p className="text-sm text-muted-foreground animate-pulse">
            {t('recordingTapStop')}
          </p>
        )}
      </Card>

      {/* Emoji selector */}
      <div className="space-y-3">
        <p className="text-center text-muted-foreground text-sm">{t('emojiFeeling')}</p>
        <div className="grid grid-cols-5 gap-3">
          {emojis.map((emoji) => (
            <button
              key={emoji.key}
              onClick={() => handleEmojiSelect(emoji.key)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-smooth hover:scale-105 ${
                selectedEmoji === emoji.key
                  ? 'border-primary bg-primary/5 shadow-soft'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <emoji.icon className={`w-8 h-8 ${emoji.color}`} />
              <span className="text-xs font-medium">{t(emoji.key)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyCheckin;

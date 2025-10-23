import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { api } from "@/lib/api";
import { Play } from "lucide-react";

type Story = {
  id: string;
  title: string;
  tags?: string[];
  duration_sec?: number;
  media_url?: string;
};

export default function StoriesHub() {
  const { t } = useLanguage();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // Fetch from backend (localized via api() helper)
  useEffect(() => {
    setLoading(true);
    setErr(null);
    api("/stories")
      .then((data) => setStories(Array.isArray(data) ? data : []))
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
    // re-run when language toggles
  }, [localStorage.getItem("language")]);

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">{t("realStories")}</h2>
          <p className="text-muted-foreground">{t("anonymousVoices")}</p>
        </div>
        <div>Loading…</div>
      </div>
    );
  }

  if (err) {
    return <div className="text-red-600">Error: {err}</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">{t("realStories")}</h2>
        <p className="text-muted-foreground">{t("anonymousVoices")}</p>
      </div>

      <div className="space-y-4">
        {stories.map((story) => (
          <Card
            key={story.id}
            className="p-6 shadow-card hover:shadow-soft transition-smooth cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl gradient-warm flex items-center justify-center shrink-0 group-hover:scale-110 transition-smooth">
                <Play className="w-8 h-8 text-white" />
              </div>

              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-foreground leading-tight">{story.title}</h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  {story.duration_sec ? <span>{Math.round(story.duration_sec / 60)} min</span> : null}
                  {story.tags?.length ? (
                    <>
                      <span>•</span>
                      <span>{story.tags.join(" / ")}</span>
                    </>
                  ) : null}
                </div>
              </div>

              <Button size="icon" variant="ghost" className="shrink-0 hover:bg-primary/10 hover:text-primary">
                <Play className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Button variant="outline" className="w-full">
        {t("shareStory")}
      </Button>
    </div>
  );
}

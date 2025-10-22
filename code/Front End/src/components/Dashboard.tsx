import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import DailyCheckin from "./DailyCheckin";
import BlossomMap from "./BlossomMap";
import ResiliencePathway from "./ResiliencePathway";
import StoriesHub from "./StoriesHub";
import { Heart, Flower2, BookOpen, Compass, TrendingUp } from "lucide-react";
const Dashboard = () => {
  const {
    t
  } = useLanguage();
  const [activeTab, setActiveTab] = useState("checkin");
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full gradient-warm flex items-center justify-center">
              <Flower2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">سفينة</h1>
          </div>
          <LanguageToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 h-auto p-1 bg-muted/50">
            <TabsTrigger value="checkin" className="flex flex-col gap-2 py-3 data-[state=active]:bg-card data-[state=active]:shadow-soft">
              <Heart className="w-5 h-5" />
              <span className="text-xs">{t('dailyCheckin')}</span>
            </TabsTrigger>
            <TabsTrigger value="journey" className="flex flex-col gap-2 py-3 data-[state=active]:bg-card data-[state=active]:shadow-soft">
              <Flower2 className="w-5 h-5" />
              <span className="text-xs">{t('yourJourney')}</span>
            </TabsTrigger>
            <TabsTrigger value="resilience" className="flex flex-col gap-2 py-3 data-[state=active]:bg-card data-[state=active]:shadow-soft">
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs">{t('resiliencePathway')}</span>
            </TabsTrigger>
            <TabsTrigger value="stories" className="flex flex-col gap-2 py-3 data-[state=active]:bg-card data-[state=active]:shadow-soft">
              <BookOpen className="w-5 h-5" />
              <span className="text-xs">{t('stories')}</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex flex-col gap-2 py-3 data-[state=active]:bg-card data-[state=active]:shadow-soft">
              <Compass className="w-5 h-5" />
              <span className="text-xs">{t('resources')}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="checkin" className="mt-8">
            <DailyCheckin />
          </TabsContent>

          <TabsContent value="journey" className="mt-8">
            <BlossomMap />
          </TabsContent>

          <TabsContent value="resilience" className="mt-8">
            <ResiliencePathway />
          </TabsContent>

          <TabsContent value="stories" className="mt-8">
            <StoriesHub />
          </TabsContent>

          <TabsContent value="resources" className="mt-8">
            <div className="text-center py-12 space-y-4 animate-fade-in">
              <Compass className="w-16 h-16 mx-auto text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold text-foreground">{t('opportunities')}</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Coming soon: Personalized opportunities from Hub71, Khalifa Fund, NYUAD, and more.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>;
};
export default Dashboard;
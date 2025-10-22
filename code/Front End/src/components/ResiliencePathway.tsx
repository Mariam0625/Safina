import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  MessageSquare, 
  XCircle, 
  CheckCircle, 
  Award,
  TrendingUp,
  Heart,
  FileText,
  Plus
} from "lucide-react";

interface Milestone {
  id: string;
  type: 'application' | 'interview' | 'rejection' | 'offer';
  company: string;
  date: string;
  mood: 'high' | 'medium' | 'low';
}

interface ResilienceBadge {
  id: string;
  name: string;
  icon: typeof Award;
  earned: boolean;
}

const ResiliencePathway = () => {
  const { t } = useLanguage();
  
  // Sample data - in real app, this would come from storage/database
  const [milestones] = useState<Milestone[]>([
    { id: '1', type: 'application', company: 'Tech Co', date: '2025-01-05', mood: 'high' },
    { id: '2', type: 'interview', company: 'StartUp Inc', date: '2025-01-10', mood: 'high' },
    { id: '3', type: 'rejection', company: 'StartUp Inc', date: '2025-01-15', mood: 'low' },
    { id: '4', type: 'application', company: 'Innovation Lab', date: '2025-01-18', mood: 'medium' },
  ]);

  const [badges] = useState<ResilienceBadge[]>([
    { id: '1', name: t('courageousApplicant'), icon: Award, earned: true },
    { id: '2', name: t('feedbackSeeker'), icon: TrendingUp, earned: true },
    { id: '3', name: t('persistentDreamer'), icon: Heart, earned: false },
    { id: '4', name: t('resilientSpirit'), icon: Award, earned: false },
  ]);

  // Check if user recently had a rejection (mood low)
  const hasRecentLowMood = milestones.some(m => m.mood === 'low');

  const getMilestoneIcon = (type: Milestone['type']) => {
    switch (type) {
      case 'application': return Briefcase;
      case 'interview': return MessageSquare;
      case 'rejection': return XCircle;
      case 'offer': return CheckCircle;
    }
  };

  const getMilestoneColor = (type: Milestone['type']) => {
    switch (type) {
      case 'application': return 'bg-primary/20 text-primary';
      case 'interview': return 'bg-accent/20 text-accent';
      case 'rejection': return 'bg-muted text-muted-foreground';
      case 'offer': return 'bg-secondary/20 text-secondary';
    }
  };

  const getMoodIndicator = (mood: Milestone['mood']) => {
    switch (mood) {
      case 'high': return 'bg-secondary';
      case 'medium': return 'bg-accent';
      case 'low': return 'bg-muted';
    }
  };

  const stats = {
    applications: milestones.filter(m => m.type === 'application').length,
    interviews: milestones.filter(m => m.type === 'interview').length,
    rejections: milestones.filter(m => m.type === 'rejection').length,
    offers: milestones.filter(m => m.type === 'offer').length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">{t('resiliencePathway')}</h2>
        <p className="text-muted-foreground">{t('trackProgress')}</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('applications')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.applications}</div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('interviews')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{stats.interviews}</div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('rejections')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-muted-foreground">{stats.rejections}</div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('offers')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">{stats.offers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Reframing Prompts (shown when mood is low) */}
      {hasRecentLowMood && (
        <Card className="shadow-soft border-l-4 border-l-accent animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-accent" />
              {t('reframingPrompt')}
            </CardTitle>
            <CardDescription>{t('whatLearned')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {t('microAction')}
              </h4>
              <p className="text-sm text-muted-foreground mb-3">{t('tweakCoverLetter')}</p>
              <Button size="sm" className="shadow-soft">
                {t('takeAction')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Journey Timeline */}
      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t('jobSearchJourney')}</CardTitle>
              <CardDescription>Your personalized journey map</CardDescription>
            </div>
            <Button size="sm" variant="outline" className="shadow-soft">
              <Plus className="w-4 h-4 mr-2" />
              {t('addMilestone')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative space-y-6">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary" />
            
            {milestones.map((milestone, index) => {
              const Icon = getMilestoneIcon(milestone.type);
              return (
                <div key={milestone.id} className="relative flex gap-4 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  {/* Icon */}
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${getMilestoneColor(milestone.type)} shadow-soft`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pb-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold capitalize">{milestone.type}</h4>
                        <p className="text-sm text-muted-foreground">{milestone.company}</p>
                        <p className="text-xs text-muted-foreground mt-1">{milestone.date}</p>
                      </div>
                      {/* Mood indicator */}
                      <div className={`w-3 h-3 rounded-full ${getMoodIndicator(milestone.mood)} animate-pulse`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Resilience Badges */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-secondary" />
            {t('yourBadges')}
          </CardTitle>
          <CardDescription>Celebrate your resilience journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge) => {
              const BadgeIcon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-lg border-2 text-center space-y-2 transition-smooth ${
                    badge.earned
                      ? 'border-secondary bg-secondary/10 shadow-soft'
                      : 'border-dashed border-muted bg-muted/20 opacity-50'
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                    badge.earned ? 'bg-secondary text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    <BadgeIcon className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-medium">{badge.name}</p>
                  {badge.earned && (
                    <Badge variant="secondary" className="text-xs">Earned</Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResiliencePathway;

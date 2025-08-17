import { X, Info, User, TrendingUp, Clock, Zap, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Goal {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: 'completed' | 'in_progress' | 'missed';
}

interface ContentReceiptProps {
  isOpen: boolean;
  onClose: () => void;
  contentReason?: string;
  reasonChips?: Array<{ text: string; icon: React.ReactNode }>;
  goals?: Goal[];
  creditsEarned?: number;
  streak?: number;
  impactMessage?: string;
}

export default function ContentReceipt({
  isOpen,
  onClose,
  contentReason = "This content appears because it aligns with your interests and activity patterns.",
  reasonChips = [
    { text: "You follow this creator", icon: <User className="w-3 h-3" /> },
    { text: "Fresh content", icon: <Zap className="w-3 h-3" /> },
    { text: "Trending now", icon: <TrendingUp className="w-3 h-3" /> },
    { text: "Similar to saved", icon: <Target className="w-3 h-3" /> }
  ],
  goals = [
    { id: "1", name: "Mindful browsing (30 min)", icon: <Clock className="w-4 h-4" />, status: 'completed' },
    { id: "2", name: "Focus sessions completed", icon: <Target className="w-4 h-4" />, status: 'in_progress' },
    { id: "3", name: "Digital wellbeing check", icon: <Zap className="w-4 h-4" />, status: 'completed' }
  ],
  creditsEarned = 12,
  streak = 3,
  impactMessage = "20 credits = 20 trees planted"
}: ContentReceiptProps) {
  if (!isOpen) return null;

  const getStatusStyle = (status: Goal['status']) => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-green-100 dark:bg-green-900',
          text: 'text-green-800 dark:text-green-200',
          label: '✅ Completed'
        };
      case 'in_progress':
        return {
          bg: 'bg-yellow-100 dark:bg-yellow-900',
          text: 'text-yellow-800 dark:text-yellow-200',
          label: '⏳ In progress'
        };
      case 'missed':
        return {
          bg: 'bg-red-100 dark:bg-red-900',
          text: 'text-red-800 dark:text-red-200',
          label: '❌ Missed'
        };
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
      <Card className="w-full max-w-md bg-white dark:bg-karma-neutral-800 shadow-xl border-0 rounded-2xl animate-in slide-in-from-bottom-2 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-karma-sage-100 to-karma-sage-200 dark:from-karma-sage-800 dark:to-karma-sage-700 p-6 rounded-t-2xl">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-karma-sage-600 dark:bg-karma-sage-400 rounded-full flex items-center justify-center">
                <Info className="w-4 h-4 text-white dark:text-karma-sage-800" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-karma-sage-800 dark:text-karma-sage-100">
                  Why this post?
                </h2>
                <p className="text-sm text-karma-sage-700 dark:text-karma-sage-200">
                  Here's why you are seeing this content
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 text-karma-sage-600 hover:bg-karma-sage-200 dark:text-karma-sage-300 dark:hover:bg-karma-sage-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <CardContent className="p-6 space-y-6">
          {/* Content Reason */}
          <div className="space-y-3">
            <p className="text-sm text-karma-neutral-700 dark:text-karma-neutral-300 leading-relaxed">
              {contentReason}
            </p>
            
            {/* Reason Chips */}
            <div className="flex flex-wrap gap-2">
              {reasonChips.map((chip, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-karma-neutral-100 dark:bg-karma-neutral-700 text-karma-sage-700 dark:text-karma-sage-300 text-xs px-3 py-1 rounded-full border-0"
                >
                  <span className="mr-1.5 text-karma-sage-500">{chip.icon}</span>
                  {chip.text}
                </Badge>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-karma-sage-200 dark:bg-karma-sage-700"></div>

          {/* Goals & Credits Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-karma-sage-800 dark:text-karma-sage-200">
              Your Daily Goals
            </h3>
            
            <div className="space-y-3">
              {goals.map((goal) => {
                const statusStyle = getStatusStyle(goal.status);
                return (
                  <div key={goal.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-karma-sage-600 dark:text-karma-sage-400">
                        {goal.icon}
                      </span>
                      <span className="text-sm text-karma-neutral-700 dark:text-karma-neutral-300">
                        {goal.name}
                      </span>
                    </div>
                    <Badge
                      className={`${statusStyle.bg} ${statusStyle.text} text-xs border-0 rounded-md`}
                    >
                      {statusStyle.label}
                    </Badge>
                  </div>
                );
              })}
            </div>

            {/* Credits Earned */}
            <div className="bg-karma-sage-50 dark:bg-karma-sage-900 rounded-lg p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-karma-sage-700 dark:text-karma-sage-300">
                  +{creditsEarned} Karma Credits
                </div>
                <p className="text-xs text-karma-sage-600 dark:text-karma-sage-400 mt-1">
                  Earned for completing mindful goals today
                </p>
              </div>
            </div>
          </div>

          {/* Streak & Impact */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-lg">🔥</span>
                <span className="text-karma-sage-700 dark:text-karma-sage-300">
                  {streak}-day streak — 1.2× bonus tomorrow
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-lg">🌱</span>
              <span className="text-karma-sage-700 dark:text-karma-sage-300">
                {impactMessage}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-karma-sage-200 dark:border-karma-sage-700">
            <p className="text-xs text-karma-sage-500 dark:text-karma-sage-400 mb-2">
              Reason and progress generated on-device — your data stays private.
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="text-karma-sage-700 dark:text-karma-sage-300 hover:bg-karma-sage-100 dark:hover:bg-karma-sage-800 p-0 h-auto font-medium"
            >
              View all goals →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

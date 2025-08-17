import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Eye, 
  Bell, 
  Receipt, 
  Coins,
  Target,
  TrendingUp,
  CheckCircle,
  Clock,
  Smartphone,
  Award,
  TreePine,
  GraduationCap,
  Utensils,
  Heart,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

interface EarnMethod {
  id: string;
  title: string;
  credits: number;
  completed?: boolean;
}

interface ImpactOption {
  id: string;
  title: string;
  description: string;
  impact: string;
  credits: number;
  icon: React.ReactNode;
}

export default function Credits() {
  const [availableCredits, setAvailableCredits] = useState(247);
  const [daysStreak, setDaysStreak] = useState(12);
  const [todaysEarnings, setTodaysEarnings] = useState(35);
  const [weeklyProgress, setWeeklyProgress] = useState(185);
  const [weeklyGoal, setWeeklyGoal] = useState(300);
  const [treesPlanted, setTreesPlanted] = useState(15);

  const earnMethods: EarnMethod[] = [
    { id: "1", title: "Completing Focus Gates", credits: 5, completed: true },
    { id: "2", title: "Daily mindful check-ins", credits: 10, completed: true },
    { id: "3", title: "Screen time under goal", credits: 15, completed: false },
    { id: "4", title: "Weekly challenge completed", credits: 25, completed: false }
  ];

  const impactOptions: ImpactOption[] = [
    {
      id: "1",
      title: "Plant Trees",
      description: "Support reforestation efforts",
      impact: "Impact 1 tree planted",
      credits: 50,
      icon: <TreePine className="w-6 h-6" />
    },
    {
      id: "2",
      title: "Education",
      description: "Fund online courses for underserved communities",
      impact: "Impact 1 week of courses",
      credits: 100,
      icon: <GraduationCap className="w-6 h-6" />
    },
    {
      id: "3",
      title: "Meals",
      description: "Provide meals to those in need",
      impact: "Impact: 5 meals provided",
      credits: 25,
      icon: <Utensils className="w-6 h-6" />
    },
    {
      id: "4",
      title: "Mental Health",
      description: "Support mental health resources",
      impact: "Impact 1 therapy session",
      credits: 75,
      icon: <Heart className="w-6 h-6" />
    }
  ];

  const handleDonation = (option: ImpactOption) => {
    if (availableCredits >= option.credits) {
      setAvailableCredits(prev => prev - option.credits);
      if (option.id === "1") {
        setTreesPlanted(prev => prev + 1);
      }
    }
  };

  const progressPercentage = Math.round((weeklyProgress / weeklyGoal) * 100);
  const creditsToGo = weeklyGoal - weeklyProgress;

  return (
    <div className="h-screen bg-karma-neutral-50 flex flex-col w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto shadow-lg lg:shadow-xl overflow-hidden">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Header */}
        <div className="px-4 sm:px-6 pt-6 pb-4 bg-karma-neutral-50">
          <h1 className="text-xl font-bold text-karma-neutral-700 mb-2">Karma Credits</h1>
          <p className="text-karma-neutral-600 text-sm">
            Mindful usage earns credits for positive impact
          </p>
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-6 space-y-6 mb-6">

          {/* Credits Overview Card */}
          <Card className="bg-gradient-to-r from-karma-sage-500 to-karma-sage-400 border-0 text-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Coins className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="text-center mb-6">
                <p className="text-white/90 text-sm font-medium mb-2">Available Credits</p>
                <div className="text-4xl font-bold mb-4">{availableCredits}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-semibold">{daysStreak}</div>
                  <p className="text-white/90 text-xs font-medium">Days Streak</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold">+{todaysEarnings}</div>
                  <p className="text-white/90 text-xs font-medium">Today's Earnings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Goal */}
          <Card className="border-karma-neutral-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-karma-sage-600" />
                  <h3 className="font-semibold text-karma-neutral-800">Weekly Goal</h3>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-karma-cream-200 text-karma-neutral-700 text-xs"
                >
                  {weeklyProgress}/{weeklyGoal}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="w-full bg-karma-neutral-200 rounded-full h-2">
                  <div
                    className="bg-karma-sage-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-karma-neutral-600 font-medium">{progressPercentage}% complete</span>
                  <span className="text-karma-neutral-700 font-semibold">{creditsToGo} credits to go</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Earn Credits By */}
          <Card className="border-karma-neutral-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-karma-sage-600" />
                <h3 className="font-semibold text-karma-neutral-800">Earn Credits By:</h3>
              </div>

              <div className="space-y-3">
                {earnMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {method.completed ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-karma-neutral-400" />
                      )}
                      <span className={`text-sm ${method.completed ? 'text-karma-neutral-600' : 'text-karma-neutral-700'}`}>
                        {method.title}
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${method.completed ? 'bg-green-100 text-green-700' : 'bg-karma-neutral-100 text-karma-neutral-600'}`}
                    >
                      +{method.credits} credits
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Make an Impact */}
          <div>
            <h3 className="font-semibold text-karma-neutral-800 mb-4">Make an Impact</h3>
            <div className="space-y-3">
              {impactOptions.map((option) => (
                <Card
                  key={option.id}
                  className="border-karma-neutral-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleDonation(option)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-karma-sage-100 rounded-full flex items-center justify-center">
                          <span className="text-karma-sage-600">{option.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-karma-neutral-800 text-sm mb-1">
                            {option.title}
                          </h4>
                          <div className="text-xs space-y-0.5">
                            <p className="text-karma-neutral-600">{option.description}</p>
                            <p className="text-karma-sage-600 font-medium">{option.impact}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-xs border-karma-neutral-300"
                        >
                          {option.credits} credits
                        </Badge>
                        <ChevronRight className="w-4 h-4 text-karma-neutral-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievement Banner */}
          <Card className="border-karma-sage-200 bg-karma-sage-50 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🌳</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-karma-sage-800 text-sm mb-1">
                    You've helped plant {treesPlanted} trees this month!
                  </h4>
                  <p className="text-karma-sage-700 text-xs">
                    Your mindful tech use is making a real difference in the world.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl bg-white border-t border-karma-neutral-200 shadow-lg">
        <div className="flex items-center justify-around py-3 sm:py-4 px-2">
          <Link to="/" className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              <Home className="w-4 h-4 sm:w-5 sm:h-5 text-karma-neutral-400" />
            </div>
            <span className="text-xs text-karma-neutral-400">Home</span>
          </Link>
          
          <Link to="/focus-gate" className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-karma-neutral-400" />
            </div>
            <span className="text-xs text-karma-neutral-400">Focus</span>
          </Link>
          
          <Link to="/digest" className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-karma-neutral-400" />
            </div>
            <span className="text-xs text-karma-neutral-400">Digest</span>
          </Link>
          
          <Link to="/receipt" className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              <Receipt className="w-4 h-4 sm:w-5 sm:h-5 text-karma-neutral-400" />
            </div>
            <span className="text-xs text-karma-neutral-400">Receipt</span>
          </Link>
          
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-karma-sage-100 rounded-lg flex items-center justify-center">
              <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-karma-sage-600" />
            </div>
            <span className="text-xs text-karma-sage-600 font-medium">Credits</span>
          </div>
        </div>
      </div>
    </div>
  );
}

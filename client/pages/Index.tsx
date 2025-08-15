import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Eye, 
  Bell, 
  Receipt, 
  Coins,
  ChevronRight,
  Star,
  Calendar,
  TrendingDown,
  Plus
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-karma-neutral-50 flex flex-col w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto shadow-lg lg:shadow-xl">
      {/* Header Section */}
      <div className="px-4 sm:px-6 pt-6 pb-4 bg-karma-neutral-50">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-karma-sage-300 rounded-full flex items-center justify-center">
            <Star className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-white" />
          </div>
        </div>
        
        {/* Welcome Text */}
        <div className="text-center mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-karma-neutral-800 mb-2">
            Welcome to Karma
          </h1>
          <p className="text-karma-neutral-600 text-xs sm:text-sm mb-4 px-2">
            Your mindful companion for digital well-being
          </p>
          
          {/* Day Badge */}
          <div className="inline-flex items-center gap-2 bg-karma-cream-200 px-4 py-2 rounded-lg">
            <Calendar className="w-4 h-4 text-karma-neutral-700" />
            <span className="text-xs font-semibold text-karma-neutral-700">
              Day 12 of mindful tech use
            </span>
          </div>
        </div>
      </div>

      {/* Today's Mindfulness Card */}
      <div className="px-4 sm:px-6 mb-6">
        <Card className="bg-gradient-to-r from-karma-cream-200 to-karma-cream-300 border-karma-cream-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 bg-karma-sage-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <h3 className="font-semibold text-karma-neutral-700">Today's Mindfulness</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {/* Screen Time */}
              <div>
                <div className="text-2xl font-bold text-karma-sage-600 mb-1">2h 45m</div>
                <div className="text-xs font-medium text-karma-neutral-600 mb-2">Screen Time</div>
                <div className="inline-flex items-center gap-1 bg-karma-cream-100 px-2 py-1 rounded-md">
                  <TrendingDown className="w-3 h-3 text-karma-neutral-600" />
                  <span className="text-xs text-karma-neutral-600">-30% vs Yesterday</span>
                </div>
              </div>
              
              {/* Focus Gates */}
              <div>
                <div className="text-2xl font-bold text-karma-sage-600 mb-1">8</div>
                <div className="text-xs font-medium text-karma-neutral-600 mb-2">Focus Gates</div>
                <div className="inline-flex items-center gap-1 bg-karma-cream-100 px-2 py-1 rounded-md">
                  <Plus className="w-3 h-3 text-karma-neutral-600" />
                  <span className="text-xs text-karma-neutral-600">+40 credits earned</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-4 sm:px-6 mb-6">
        <h3 className="font-semibold text-karma-neutral-700 mb-4">Quick Actions</h3>
        
        <div className="space-y-3">
          {/* Start Focus Session */}
          <Card className="border-karma-neutral-200 hover:bg-karma-neutral-50 transition-colors cursor-pointer">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-karma-neutral-100 rounded-full flex items-center justify-center">
                  <Eye className="w-5 h-5 text-karma-neutral-600" />
                </div>
                <div>
                  <div className="font-semibold text-karma-neutral-800 text-sm">Start Focus Session</div>
                  <div className="text-xs text-karma-neutral-600">Mindful breathing before you browse</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-karma-neutral-400" />
            </CardContent>
          </Card>

          {/* View Notification Digest */}
          <Card className="border-karma-neutral-200 hover:bg-karma-neutral-50 transition-colors cursor-pointer">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-karma-neutral-100 rounded-full flex items-center justify-center">
                  <Bell className="w-5 h-5 text-karma-neutral-600" />
                </div>
                <div>
                  <div className="font-semibold text-karma-neutral-800 text-sm">View Notification Digest</div>
                  <div className="text-xs text-karma-neutral-600">4 batched notifications waiting</div>
                </div>
              </div>
              <Badge variant="secondary" className="bg-karma-sage-200 text-karma-sage-700 text-xs">
                4
              </Badge>
            </CardContent>
          </Card>

          {/* Karma Credits Dashboard */}
          <Card className="border-karma-neutral-200 hover:bg-karma-neutral-50 transition-colors cursor-pointer">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-karma-sage-200 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-karma-sage-600" />
                </div>
                <div>
                  <div className="font-semibold text-karma-neutral-800 text-sm">Karma Credits Dashboard</div>
                  <div className="text-xs text-karma-neutral-600">247 credits available to donate</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-karma-neutral-400" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Today's Reflection */}
      <div className="px-4 sm:px-6 mb-6">
        <Card className="bg-karma-neutral-200 border-karma-neutral-300">
          <CardContent className="p-6">
            <h3 className="font-semibold text-karma-neutral-700 text-center mb-4">Today's Reflection</h3>
            <blockquote className="text-karma-neutral-700 text-sm italic text-center leading-relaxed mb-3">
              "Technology is best when it brings people together and enhances our humanity, not when it distracts us from what truly matters."
            </blockquote>
            <p className="text-xs text-karma-neutral-600 text-center">-Your mindful reminder</p>
          </CardContent>
        </Card>
      </div>

      {/* Begin Mindful Session Button */}
      <div className="px-4 sm:px-6 mb-6">
        <Button className="w-full bg-karma-sage-600 hover:bg-karma-sage-700 text-white font-semibold py-3 rounded-lg">
          Begin Mindful Session
        </Button>
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="text-xs text-karma-neutral-600">Every mindful moment creates positive ripples</span>
          <div className="w-3 h-3 bg-karma-sage-300 rounded"></div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-auto bg-white border-t border-karma-neutral-200">
        <div className="flex items-center justify-around py-3 sm:py-4 px-2">
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-karma-sage-100 rounded-lg flex items-center justify-center">
              <Home className="w-4 h-4 sm:w-5 sm:h-5 text-karma-sage-600" />
            </div>
            <span className="text-xs text-karma-sage-600 font-medium">Home</span>
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-karma-neutral-400" />
            </div>
            <span className="text-xs text-karma-neutral-400">Focus</span>
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-karma-neutral-400" />
            </div>
            <span className="text-xs text-karma-neutral-400">Digest</span>
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              <Receipt className="w-4 h-4 sm:w-5 sm:h-5 text-karma-neutral-400" />
            </div>
            <span className="text-xs text-karma-neutral-400">Receipt</span>
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-karma-neutral-400" />
            </div>
            <span className="text-xs text-karma-neutral-400">Credits</span>
          </div>
        </div>
      </div>
    </div>
  );
}

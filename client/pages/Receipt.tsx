import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContentReceipt from "@/components/ContentReceipt";
import { 
  Home, 
  Eye, 
  Bell, 
  Receipt as ReceiptIcon, 
  Coins,
  Info,
  Calendar,
  Target,
  Clock,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Receipt() {
  const [showContentReceipt, setShowContentReceipt] = useState(true);

  // Sample data for different receipt types
  const receiptExamples = [
    {
      id: "daily-summary",
      title: "Daily Summary Receipt",
      description: "See why content appeared in your feeds today",
      reason: "Your daily content was curated based on your mindful browsing goals and interaction patterns.",
      chips: [
        { text: "Mindful browsing active", icon: <Target className="w-3 h-3" /> },
        { text: "Goal-aligned content", icon: <Zap className="w-3 h-3" /> },
        { text: "Reduced distractions", icon: <Clock className="w-3 h-3" /> }
      ]
    },
    {
      id: "focus-session",
      title: "Focus Session Receipt", 
      description: "Understand your focus session recommendations",
      reason: "Focus suggestions appear based on your productivity patterns and stress levels detected through usage.",
      chips: [
        { text: "High stress detected", icon: <Target className="w-3 h-3" /> },
        { text: "Break time needed", icon: <Clock className="w-3 h-3" /> },
        { text: "Productivity pattern", icon: <Zap className="w-3 h-3" /> }
      ]
    },
    {
      id: "digest-timing",
      title: "Digest Timing Receipt",
      description: "Learn why your digest was delivered now",
      reason: "Your notification digest was delivered at this time to align with your natural attention cycles.",
      chips: [
        { text: "Optimal attention", icon: <Eye className="w-3 h-3" /> },
        { text: "Low distraction period", icon: <Clock className="w-3 h-3" /> },
        { text: "Natural break time", icon: <Target className="w-3 h-3" /> }
      ]
    }
  ];

  const [selectedExample, setSelectedExample] = useState(receiptExamples[0]);

  return (
    <div className="min-h-screen bg-karma-neutral-50 flex flex-col w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto shadow-lg lg:shadow-xl">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-6 pb-4 bg-karma-neutral-50">
        <h1 className="text-2xl font-bold text-karma-neutral-800 mb-2">Content Receipts</h1>
        <p className="text-karma-neutral-600 text-base">
          Understand why you see what you see
        </p>
      </div>

      {/* Content */}
      {!showContentReceipt ? (
        <div className="flex-1 px-4 sm:px-6 space-y-4">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-karma-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info className="w-8 h-8 text-karma-sage-600" />
            </div>
            <h2 className="text-lg font-semibold text-karma-neutral-800 mb-2">
              Transparency in Action
            </h2>
            <p className="text-karma-neutral-600 mb-6 max-w-sm mx-auto">
              Content receipts explain why specific content appears in your digital experience. 
              This promotes mindful consumption and builds trust.
            </p>
          </div>

          {/* Example Receipt Types */}
          <div className="space-y-3">
            <h3 className="font-semibold text-karma-neutral-700 mb-3">Try Example Receipts</h3>
            {receiptExamples.map((example) => (
              <Card 
                key={example.id} 
                className="border-karma-neutral-200 hover:bg-karma-neutral-50 transition-colors cursor-pointer shadow-sm"
                onClick={() => {
                  setSelectedExample(example);
                  setShowContentReceipt(true);
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-karma-neutral-800 text-sm mb-1">
                        {example.title}
                      </h4>
                      <p className="text-xs text-karma-neutral-600">
                        {example.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-3 text-xs text-karma-sage-600 hover:bg-karma-sage-100"
                    >
                      <Info className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Info Section */}
          <Card className="border-karma-sage-200 bg-karma-sage-50">
            <CardContent className="p-4">
              <h4 className="font-semibold text-karma-sage-800 text-sm mb-2">
                How Content Receipts Work
              </h4>
              <ul className="space-y-1 text-xs text-karma-sage-700">
                <li>• Generated on-device for privacy</li>
                <li>• Show algorithmic reasoning</li>
                <li>• Track your mindful goals</li>
                <li>• Promote conscious consumption</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-4">
          <Button
            onClick={() => setShowContentReceipt(false)}
            className="mb-4 bg-karma-sage-600 hover:bg-karma-sage-700 text-white"
          >
            ← Back to Receipt Gallery
          </Button>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="mt-auto bg-white border-t border-karma-neutral-200">
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
          
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-karma-sage-100 rounded-lg flex items-center justify-center">
              <ReceiptIcon className="w-4 h-4 sm:w-5 sm:h-5 text-karma-sage-600" />
            </div>
            <span className="text-xs text-karma-sage-600 font-medium">Receipt</span>
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-karma-neutral-400" />
            </div>
            <span className="text-xs text-karma-neutral-400">Credits</span>
          </div>
        </div>
      </div>

      {/* Content Receipt Modal */}
      <ContentReceipt
        isOpen={showContentReceipt}
        onClose={() => setShowContentReceipt(false)}
        contentReason={selectedExample.reason}
        reasonChips={selectedExample.chips}
        creditsEarned={18}
        streak={5}
        impactMessage="30 credits = 30 trees planted"
      />
    </div>
  );
}

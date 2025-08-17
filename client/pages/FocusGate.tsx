import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  X,
  Pause,
  Play,
  Clock,
  Plus,
  Minus,
  Home,
  Eye,
  Bell,
  Receipt,
  Coins,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function FocusGate() {
  const [timeLeft, setTimeLeft] = useState(0); // Timer in seconds
  const [sessionDuration, setSessionDuration] = useState(300); // Selected duration in seconds (5 minutes default)
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showTimeSelector, setShowTimeSelector] = useState(true);
  const [customMinutes, setCustomMinutes] = useState(5);
  const navigate = useNavigate();

  // Preset time options in minutes
  const presetTimes = [1, 5, 10, 15, 20, 25, 30, 45, 60];

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Format duration display
  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMins = minutes % 60;
      return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`;
    }
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setIsPaused(false);
      setShowTimeSelector(true);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleStartSession = () => {
    setTimeLeft(sessionDuration);
    setIsRunning(true);
    setIsPaused(false);
    setShowTimeSelector(false);
  };

  const handlePause = () => {
    if (isRunning) {
      setIsRunning(false);
      setIsPaused(true);
    } else if (isPaused) {
      setIsRunning(true);
      setIsPaused(false);
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  const handlePresetSelect = (minutes: number) => {
    setSessionDuration(minutes * 60);
    setCustomMinutes(minutes);
  };

  const handleCustomTimeChange = (change: number) => {
    const newMinutes = Math.max(1, Math.min(120, customMinutes + change));
    setCustomMinutes(newMinutes);
    setSessionDuration(newMinutes * 60);
  };

  const resetSession = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(0);
    setShowTimeSelector(true);
  };

  return (
    <div className="h-screen bg-karma-neutral-200 flex flex-col w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="w-6"></div> {/* Spacer for center alignment */}
        <h1 className="text-lg font-bold text-karma-neutral-700">Focus Gate</h1>
        <button
          onClick={handleClose}
          className="w-6 h-6 flex items-center justify-center text-karma-neutral-600 hover:text-karma-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 space-y-8">
        {/* Timer Circle */}
        <div className="relative">
          <div className="w-28 h-28 sm:w-32 sm:h-32 bg-karma-sage-400 rounded-full border-4 border-karma-sage-600 flex items-center justify-center shadow-lg">
            <div className="text-2xl sm:text-3xl font-bold text-white">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* Time Selector (shown when not running) */}
        {showTimeSelector && !isRunning && !isPaused && (
          <div className="w-full max-w-sm space-y-6">
            {/* Preset Times */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-karma-sage-600" />
                <span className="text-sm font-semibold text-karma-sage-700">
                  Quick Select
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {presetTimes.map((minutes) => (
                  <Button
                    key={minutes}
                    variant={
                      sessionDuration === minutes * 60 ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handlePresetSelect(minutes)}
                    className={`text-xs ${
                      sessionDuration === minutes * 60
                        ? "bg-karma-sage-600 text-white"
                        : "border-karma-sage-300 text-karma-sage-700 hover:bg-karma-sage-50"
                    }`}
                  >
                    {formatDuration(minutes)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Time Selector */}
            <Card className="border-karma-sage-200">
              <CardContent className="p-4">
                <div className="text-sm font-semibold text-karma-sage-700 mb-3">
                  Custom Duration
                </div>
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCustomTimeChange(-1)}
                    className="w-8 h-8 p-0 border-karma-sage-300"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <div className="text-center min-w-[60px]">
                    <div className="text-lg font-bold text-karma-sage-700">
                      {customMinutes}
                    </div>
                    <div className="text-xs text-karma-sage-600">minutes</div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCustomTimeChange(1)}
                    className="w-8 h-8 p-0 border-karma-sage-300"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Pause/Play Control */}
        <div className="flex items-center gap-3">
          {(isRunning || isPaused) && (
            <>
              <button
                onClick={handlePause}
                className="flex items-center justify-center w-4 h-4 text-karma-sage-700"
              >
                {isRunning ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </button>
              <span className="text-sm font-bold text-karma-sage-700">
                {isRunning ? "Pause" : "Resume"}
              </span>
            </>
          )}
        </div>

        {/* Inspirational Quote */}
        <div className="text-center max-w-xs">
          <blockquote className="text-karma-sage-700 text-sm italic leading-relaxed">
            "What if you gave your attention to what truly matters?"
          </blockquote>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="px-6 pb-8 space-y-4">
        {!isRunning && !isPaused && showTimeSelector && (
          <Button
            onClick={handleStartSession}
            className="w-full bg-karma-sage-600 hover:bg-karma-sage-700 text-white font-bold py-3 rounded-lg"
          >
            Start {formatDuration(Math.floor(sessionDuration / 60))} Session
          </Button>
        )}

        {(isRunning || isPaused) && (
          <div className="space-y-2">
            <Button
              onClick={handleClose}
              className="w-full bg-karma-sage-600 hover:bg-karma-sage-700 text-white font-bold py-3 rounded-lg"
            >
              Complete Session
            </Button>
            <Button
              onClick={resetSession}
              variant="outline"
              className="w-full border-karma-sage-300 text-karma-sage-700 hover:bg-karma-sage-50"
            >
              Change Duration
            </Button>
          </div>
        )}

        {/* Back Link */}
        <div className="text-center">
          <Link
            to="/"
            className="text-karma-neutral-600 text-sm font-bold hover:text-karma-neutral-800 transition-colors"
          >
            I'll come back later
          </Link>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-auto bg-white border-t border-karma-neutral-200">
        <div className="flex items-center justify-around py-3 sm:py-4 px-2">
          <Link to="/" className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              <Home className="w-4 h-4 sm:w-5 sm:h-5 text-karma-neutral-400" />
            </div>
            <span className="text-xs text-karma-neutral-400">Home</span>
          </Link>

          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-karma-sage-100 rounded-lg flex items-center justify-center">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-karma-sage-600" />
            </div>
            <span className="text-xs text-karma-sage-600 font-medium">
              Focus
            </span>
          </div>

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

          <Link to="/credits" className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-karma-neutral-400" />
            </div>
            <span className="text-xs text-karma-neutral-400">Credits</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

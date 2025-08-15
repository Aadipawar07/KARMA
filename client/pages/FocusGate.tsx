import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Pause, Play } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function FocusGate() {
  const [timeLeft, setTimeLeft] = useState(0); // Timer in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleStartSession = () => {
    setTimeLeft(300); // 5 minutes default
    setIsRunning(true);
    setIsPaused(false);
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

  return (
    <div className="min-h-screen bg-karma-neutral-200 flex flex-col w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
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
        {!isRunning && !isPaused && (
          <Button 
            onClick={handleStartSession}
            className="w-full bg-karma-sage-600 hover:bg-karma-sage-700 text-white font-bold py-3 rounded-lg"
          >
            Proceed Mindfully
          </Button>
        )}
        
        {(isRunning || isPaused) && (
          <Button 
            onClick={handleClose}
            className="w-full bg-karma-sage-600 hover:bg-karma-sage-700 text-white font-bold py-3 rounded-lg"
          >
            Complete Session
          </Button>
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
    </div>
  );
}

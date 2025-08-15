import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ContentReceipt from "@/components/ContentReceipt";
import {
  Home,
  Eye,
  Bell,
  Receipt,
  Coins,
  Clock,
  MessageCircle,
  Heart,
  Calendar as CalendarIcon,
  Settings,
  Info
} from "lucide-react";
import { Link } from "react-router-dom";

interface NotificationItem {
  id: string;
  app: string;
  appColor: string;
  appBg: string;
  icon: React.ReactNode;
  title: string;
  timestamp: string;
  count: number;
  isRead: boolean;
}

export default function Digest() {
  const [showContentReceipt, setShowContentReceipt] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      app: "WhatsApp",
      appColor: "#467058",
      appBg: "#DCFCE7",
      icon: <MessageCircle className="w-5 h-5" />,
      title: "3 new messages from work group",
      timestamp: "2 hours ago",
      count: 3,
      isRead: false
    },
    {
      id: "2",
      app: "Instagram",
      appColor: "#AB4878",
      appBg: "#FCE7F3",
      icon: <Heart className="w-5 h-5" />,
      title: "Your post received 12 likes",
      timestamp: "3 hours ago",
      count: 12,
      isRead: false
    },
    {
      id: "3",
      app: "Twitter",
      appColor: "#5B74BB",
      appBg: "#DBEAFE",
      icon: <MessageCircle className="w-5 h-5" />,
      title: "2 replies to your tweet",
      timestamp: "4 hours ago",
      count: 2,
      isRead: false
    },
    {
      id: "4",
      app: "Calendar",
      appColor: "#7D9989",
      appBg: "#E2DACF",
      icon: <CalendarIcon className="w-5 h-5" />,
      title: "Meeting in 30 minutes",
      timestamp: "30 minutes",
      count: 1,
      isRead: false
    }
  ]);

  const handleMarkAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-karma-neutral-50 flex flex-col w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto shadow-lg lg:shadow-xl">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-6 pb-4 bg-karma-neutral-50">
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-2xl font-bold text-karma-neutral-800">Today's Digest</h1>
          <div className="flex items-center gap-2 text-karma-neutral-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Last updated 5 min ago</span>
          </div>
        </div>
        <p className="text-karma-neutral-600 text-base">
          Your notifications, batched mindfully
        </p>
      </div>

      {/* Notification Cards */}
      <div className="flex-1 px-4 sm:px-6 space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className="border-karma-neutral-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                {/* App Icon */}
                <div className="w-12 h-12 bg-karma-sage-200 rounded-full flex items-center justify-center flex-shrink-0">
                  {notification.icon}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge 
                      className="text-xs font-semibold px-2 py-1 rounded-lg"
                      style={{ 
                        backgroundColor: notification.appBg, 
                        color: notification.appColor,
                        border: 'none'
                      }}
                    >
                      {notification.app}
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className="bg-karma-neutral-100 text-karma-neutral-700 text-xs"
                    >
                      {notification.count}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-karma-neutral-800 text-sm mb-1">
                    {notification.title}
                  </h3>
                  <p className="text-xs text-karma-neutral-600 font-medium">
                    {notification.timestamp}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="px-4 sm:px-6 py-6 space-y-3">
        {unreadCount > 0 && (
          <Button 
            onClick={handleMarkAsRead}
            className="w-full bg-karma-sage-500 hover:bg-karma-sage-600 text-white font-semibold py-3 rounded-lg"
          >
            Mark as Read
          </Button>
        )}
        
        <Button 
          variant="outline"
          className="w-full border-karma-sage-300 text-karma-sage-700 hover:bg-karma-sage-50 font-semibold py-3 rounded-lg"
        >
          <Settings className="w-4 h-4 mr-2" />
          Adjust Digest Settings
        </Button>
        
        <div className="text-center text-karma-neutral-600 text-sm mt-4">
          Next digest in 4 hours - Protecting your focus
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
          
          <Link to="/focus-gate" className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-karma-neutral-400" />
            </div>
            <span className="text-xs text-karma-neutral-400">Focus</span>
          </Link>
          
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-karma-sage-100 rounded-lg flex items-center justify-center">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-karma-sage-600" />
            </div>
            <span className="text-xs text-karma-sage-600 font-medium">Digest</span>
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

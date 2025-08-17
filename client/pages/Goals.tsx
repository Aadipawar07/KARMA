import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Clock,
  Moon,
  Smartphone,
  Target,
  X
} from "lucide-react";
import { Link } from "react-router-dom";

interface Goal {
  id: string;
  name: string;
  type: 'time_limit' | 'no_phone' | 'app_usage';
  target: number; // in minutes
  frequency: 'daily' | 'weekly';
  status: 'active' | 'paused';
  progress: number; // percentage
  icon: React.ReactNode;
}

interface GoalFormData {
  name: string;
  type: 'time_limit' | 'no_phone' | 'app_usage';
  target: number;
  frequency: 'daily' | 'weekly';
}

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      name: "Instagram < 1 hr/day",
      type: 'app_usage',
      target: 60,
      frequency: 'daily',
      status: 'active',
      progress: 75,
      icon: <Smartphone className="w-4 h-4" />
    },
    {
      id: "2",
      name: "No phone after 9 PM",
      type: 'no_phone',
      target: 540, // 9 PM in minutes from midnight
      frequency: 'daily',
      status: 'active',
      progress: 100,
      icon: <Moon className="w-4 h-4" />
    },
    {
      id: "3",
      name: "Total screen time < 4 hrs",
      type: 'time_limit',
      target: 240,
      frequency: 'daily',
      status: 'paused',
      progress: 60,
      icon: <Clock className="w-4 h-4" />
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [deletingGoal, setDeleteingGoal] = useState<Goal | null>(null);
  const [formData, setFormData] = useState<GoalFormData>({
    name: '',
    type: 'time_limit',
    target: 60,
    frequency: 'daily'
  });

  const goalTypeOptions = [
    { value: 'time_limit', label: 'Time Limit', icon: <Clock className="w-4 h-4" /> },
    { value: 'no_phone', label: 'No Phone Hours', icon: <Moon className="w-4 h-4" /> },
    { value: 'app_usage', label: 'App Usage Limit', icon: <Smartphone className="w-4 h-4" /> }
  ];

  const handleCreateGoal = () => {
    setEditingGoal(null);
    setFormData({
      name: '',
      type: 'time_limit',
      target: 60,
      frequency: 'daily'
    });
    setShowCreateModal(true);
  };

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
    setFormData({
      name: goal.name,
      type: goal.type,
      target: goal.target,
      frequency: goal.frequency
    });
    setShowCreateModal(true);
  };

  const handleDeleteGoal = (goal: Goal) => {
    setDeleteingGoal(goal);
    setShowDeleteModal(true);
  };

  const handleSaveGoal = () => {
    const selectedType = goalTypeOptions.find(opt => opt.value === formData.type);
    
    if (editingGoal) {
      // Update existing goal
      setGoals(prev => prev.map(goal => 
        goal.id === editingGoal.id 
          ? { 
              ...goal, 
              name: formData.name,
              type: formData.type,
              target: formData.target,
              frequency: formData.frequency,
              icon: selectedType?.icon || <Clock className="w-4 h-4" />
            }
          : goal
      ));
    } else {
      // Create new goal
      const newGoal: Goal = {
        id: Date.now().toString(),
        name: formData.name,
        type: formData.type,
        target: formData.target,
        frequency: formData.frequency,
        status: 'active',
        progress: 0,
        icon: selectedType?.icon || <Clock className="w-4 h-4" />
      };
      setGoals(prev => [...prev, newGoal]);
    }
    
    setShowCreateModal(false);
    setEditingGoal(null);
  };

  const confirmDelete = () => {
    if (deletingGoal) {
      setGoals(prev => prev.filter(goal => goal.id !== deletingGoal.id));
      setShowDeleteModal(false);
      setDeleteingGoal(null);
    }
  };

  const getStatusStyle = (status: Goal['status']) => {
    switch (status) {
      case 'active':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          label: '✅ Active'
        };
      case 'paused':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          label: '⏸ Paused'
        };
    }
  };

  const formatTarget = (goal: Goal) => {
    if (goal.type === 'no_phone') {
      const hours = Math.floor(goal.target / 60);
      const mins = goal.target % 60;
      return `${hours}:${mins.toString().padStart(2, '0')} PM`;
    } else {
      const hours = Math.floor(goal.target / 60);
      const mins = goal.target % 60;
      if (hours > 0) {
        return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
      }
      return `${mins}m`;
    }
  };

  return (
    <div className="min-h-screen bg-karma-neutral-50 flex flex-col w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto shadow-lg lg:shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-karma-sage-100 to-karma-sage-200 px-4 sm:px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-karma-sage-700 hover:text-karma-sage-800">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-karma-sage-800">My Goals</h1>
          </div>
          <Button
            onClick={handleCreateGoal}
            size="sm"
            className="bg-karma-sage-700 hover:bg-karma-sage-800 text-white rounded-lg"
          >
            <Plus className="w-4 h-4 mr-1" />
            New Goal
          </Button>
        </div>
        <p className="text-karma-sage-700 text-sm">
          Set mindful limits and earn Karma Credits by meeting them
        </p>
      </div>

      {/* Goals List */}
      <div className="flex-1 px-4 sm:px-6 py-6">
        {goals.length === 0 ? (
          // Empty State
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-karma-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-karma-sage-600" />
            </div>
            <h3 className="text-lg font-semibold text-karma-neutral-800 mb-2">
              You haven't set any goals yet
            </h3>
            <p className="text-karma-neutral-600 mb-6">
              Create your first mindful goal to start earning Karma Credits
            </p>
            <Button
              onClick={handleCreateGoal}
              className="bg-karma-sage-600 hover:bg-karma-sage-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create your first goal
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => {
              const statusStyle = getStatusStyle(goal.status);
              return (
                <Card key={goal.id} className="border-karma-neutral-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-karma-sage-100 rounded-full flex items-center justify-center">
                          <span className="text-karma-sage-600">{goal.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-karma-neutral-800 text-sm">
                            {goal.name}
                          </h4>
                          <p className="text-xs text-karma-neutral-600">
                            Target: {formatTarget(goal)} • {goal.frequency}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${statusStyle.bg} ${statusStyle.text} text-xs border-0`}>
                          {statusStyle.label}
                        </Badge>
                        <button
                          onClick={() => handleEditGoal(goal)}
                          className="p-1 text-karma-sage-600 hover:bg-karma-sage-100 rounded"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteGoal(goal)}
                          className="p-1 text-karma-sage-600 hover:bg-karma-sage-100 rounded"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-karma-neutral-600">Today's Progress</span>
                        <span className="text-karma-sage-700 font-medium">{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-karma-neutral-200 rounded-full h-2">
                        <div 
                          className="bg-karma-sage-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-6 pb-6">
        <Link 
          to="/"
          className="text-karma-sage-700 hover:text-karma-sage-800 font-medium text-sm flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
      </div>

      {/* Create/Edit Goal Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md bg-white rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-karma-neutral-800">
                  {editingGoal ? 'Edit Goal' : 'Create New Goal'}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCreateModal(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {/* Goal Name */}
                <div>
                  <label className="block text-sm font-medium text-karma-neutral-700 mb-2">
                    Goal Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Instagram < 1 hr/day"
                    className="w-full px-3 py-2 border border-karma-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-karma-sage-500"
                  />
                </div>

                {/* Goal Type */}
                <div>
                  <label className="block text-sm font-medium text-karma-neutral-700 mb-2">
                    Goal Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as GoalFormData['type'] }))}
                    className="w-full px-3 py-2 border border-karma-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-karma-sage-500"
                  >
                    {goalTypeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Target */}
                <div>
                  <label className="block text-sm font-medium text-karma-neutral-700 mb-2">
                    Target (minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.target}
                    onChange={(e) => setFormData(prev => ({ ...prev, target: parseInt(e.target.value) || 0 }))}
                    min="1"
                    className="w-full px-3 py-2 border border-karma-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-karma-sage-500"
                  />
                </div>

                {/* Frequency */}
                <div>
                  <label className="block text-sm font-medium text-karma-neutral-700 mb-2">
                    Frequency
                  </label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={formData.frequency === 'daily' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, frequency: 'daily' }))}
                      className={formData.frequency === 'daily' ? 'bg-karma-sage-600 text-white' : 'border-karma-sage-300 text-karma-sage-700'}
                    >
                      Daily
                    </Button>
                    <Button
                      type="button"
                      variant={formData.frequency === 'weekly' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, frequency: 'weekly' }))}
                      className={formData.frequency === 'weekly' ? 'bg-karma-sage-600 text-white' : 'border-karma-sage-300 text-karma-sage-700'}
                    >
                      Weekly
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 border-karma-sage-300 text-karma-sage-700"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveGoal}
                  disabled={!formData.name.trim()}
                  className="flex-1 bg-karma-sage-600 hover:bg-karma-sage-700 text-white"
                >
                  {editingGoal ? 'Update Goal' : 'Create Goal'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingGoal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-sm bg-white rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-karma-neutral-800 mb-2">
                Delete Goal?
              </h3>
              <p className="text-karma-neutral-600 text-sm mb-6">
                This action cannot be undone. You will lose all progress for "{deletingGoal.name}".
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 border-karma-neutral-300 text-karma-neutral-700"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

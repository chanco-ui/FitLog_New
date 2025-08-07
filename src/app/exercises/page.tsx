'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { EXERCISES } from '@/constants/exercises';
import { 
  Dumbbell, 
  Activity, 
  Zap, 
  ArrowUp, 
  Target, 
  Minus 
} from 'lucide-react';

const iconMap = {
  Dumbbell,
  Activity,
  Zap,
  ArrowUp,
  Target,
  Minus,
};

export default function ExercisesPage() {
  const router = useRouter();

  const handleExerciseSelect = (exercise: typeof EXERCISES[0]) => {
    router.push(`/workout?exercise=${exercise.id}`);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen">
      <Header 
        title="トレーニング選択" 
        showBackButton 
        onBack={handleBack}
      />
      
      <main className="p-4">
        <div className="grid grid-cols-1 gap-4">
          {EXERCISES.map((exercise) => {
            const IconComponent = iconMap[exercise.icon as keyof typeof iconMap];
            
            return (
              <Card 
                key={exercise.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer border-gray-200"
                onClick={() => handleExerciseSelect(exercise)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <IconComponent className="w-8 h-8 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-black">{exercise.muscle}</h3>
                    <p className="text-sm text-gray-800 font-medium">{exercise.name}</p>
                    <p className="text-sm text-gray-700 mt-1">{exercise.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
} 
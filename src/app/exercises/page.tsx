'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { EXERCISE_CATEGORIES } from '@/constants/exercises';
import { 
  Heart, 
  Activity, 
  Zap, 
  ArrowUp, 
  Target, 
  Minus 
} from 'lucide-react';

const iconMap = {
  Heart,
  Activity,
  Zap,
  ArrowUp,
  Target,
  Minus,
};

export default function ExercisesPage() {
  const router = useRouter();

  const handleCategorySelect = (categoryId: string) => {
    router.push(`/exercises/${categoryId}`);
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
          {EXERCISE_CATEGORIES.map((category) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap];
            
            return (
              <Card 
                key={category.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer border-gray-200"
                onClick={() => handleCategorySelect(category.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <IconComponent className="w-8 h-8 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-black">{category.name}</h3>
                    <p className="text-sm text-gray-700 mt-1">{category.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{category.exercises.length}種目</p>
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
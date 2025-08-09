'use client';

import { useRouter } from 'next/navigation';
import { use } from 'react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { EXERCISE_CATEGORIES } from '@/constants/exercises';
import { 
  Dumbbell, 
  Activity, 
  Zap, 
  ArrowUp, 
  Target, 
  Minus 
} from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const iconMap = {
  Dumbbell,
  Activity,
  Zap,
  ArrowUp,
  Target,
  Minus,
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const router = useRouter();
  const { category } = use(params);
  
  const categoryData = EXERCISE_CATEGORIES.find(cat => cat.id === category);

  const handleExerciseSelect = (exercise: any) => {
    router.push(`/workout?exercise=${exercise.id}`);
  };

  const handleBack = () => {
    router.back();
  };

  if (!categoryData) {
    return (
      <div className="min-h-screen">
        <Header 
          title="カテゴリが見つかりません" 
          showBackButton 
          onBack={handleBack}
        />
        <main className="p-4">
          <div className="text-center text-gray-600">
            カテゴリが見つかりませんでした
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header 
        title={categoryData.name} 
        showBackButton 
        onBack={handleBack}
      />
      
      <main className="p-4">
        <div className="mb-4">
          <p className="text-sm text-gray-600">{categoryData.description}</p>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {categoryData.exercises.map((exercise) => {
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
                    <h3 className="font-semibold text-lg text-black">{exercise.name}</h3>
                    <p className="text-sm text-gray-700 mt-1">{exercise.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{exercise.muscle}</p>
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
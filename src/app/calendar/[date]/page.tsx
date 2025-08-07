'use client';

import { useRouter } from 'next/navigation';
import { use } from 'react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { useAppContext } from '@/context/AppContext';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

interface DateDetailPageProps {
  params: Promise<{
    date: string;
  }>;
}

export default function DateDetailPage({ params }: DateDetailPageProps) {
  const router = useRouter();
  const { getWorkoutsForDate, getWeightForDate } = useAppContext();
  
  const { date } = use(params);
  const workouts = getWorkoutsForDate(date);
  const weight = getWeightForDate(date);

  const handleBack = () => {
    router.back();
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'yyyy年M月d日 (EEEE)', { locale: ja });
  };

  return (
    <div className="min-h-screen">
      <Header 
        title={formatDate(date)}
        showBackButton 
        onBack={handleBack}
      />
      
      <main className="p-4 space-y-6">
        {/* 体重記録 */}
        {weight && (
          <Card>
            <div className="text-center">
                          <h2 className="text-lg font-semibold mb-2 text-black">体重記録</h2>
            <p className="text-3xl font-bold text-blue-600">{weight.weight}kg</p>
            </div>
          </Card>
        )}

        {/* ワークアウト記録 */}
        {workouts.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-black">ワークアウト記録</h2>
            {workouts.map((workout) => (
              <Card key={workout.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-black">{workout.exercise.name}</h3>
                    <span className="text-sm text-black">{workout.exercise.muscle}</span>
                  </div>
                  
                  <div className="space-y-2">
                    {workout.sets.map((set, index) => (
                      <div key={set.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <span className="text-sm text-black">{index + 1}セット</span>
                        <div className="flex space-x-4">
                          <span className="text-sm text-black">{set.weight}kg</span>
                          <span className="text-sm text-black">{set.reps}回</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center text-gray-700">
            <p>この日のワークアウト記録はありません</p>
          </Card>
        )}

        {workouts.length === 0 && !weight && (
          <Card className="p-6 text-center text-gray-700">
            <p>この日の記録はありません</p>
          </Card>
        )}
      </main>
    </div>
  );
} 
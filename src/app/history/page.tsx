'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { useAppContext } from '@/context/AppContext';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

export default function HistoryPage() {
  const router = useRouter();
  const { workouts } = useAppContext();

  const handleBack = () => {
    router.back();
  };

  // 日付ごとにグループ化
  const groupedWorkouts = workouts.reduce((acc, workout) => {
    const date = workout.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(workout);
    return acc;
  }, {} as Record<string, typeof workouts>);

  // 日付順にソート
  const sortedDates = Object.keys(groupedWorkouts).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="min-h-screen">
      <Header 
        title="ワークアウト履歴"
        showBackButton 
        onBack={handleBack}
      />
      
      <main className="p-4 space-y-6">
        {sortedDates.length > 0 ? (
          <div className="space-y-6">
            {sortedDates.map((date) => (
              <div key={date} className="space-y-3">
                <h3 className="text-lg font-semibold">
                  {format(new Date(date), 'yyyy年M月d日 (EEEE)', { locale: ja })}
                </h3>
                
                {groupedWorkouts[date].map((workout) => (
                  <Card key={workout.id} className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-lg">{workout.exercise.name}</h4>
                        <span className="text-sm text-gray-600">{workout.exercise.muscle}</span>
                      </div>
                      
                      <div className="space-y-2">
                        {workout.sets.map((set, index) => (
                          <div key={set.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                                                    <span className="text-sm text-gray-700">{index + 1}セット</span>
                        <div className="flex space-x-4">
                          <span className="text-sm text-gray-800">{set.weight}kg</span>
                          <span className="text-sm text-gray-800">{set.reps}回</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center text-gray-600">
            <p>まだワークアウト記録がありません</p>
            <p className="text-sm mt-1">トレーニングを記録してみましょう！</p>
          </Card>
        )}
      </main>
    </div>
  );
} 
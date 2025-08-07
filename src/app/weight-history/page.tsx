'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { useAppContext } from '@/context/AppContext';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

export default function WeightHistoryPage() {
  const router = useRouter();
  const { weights } = useAppContext();

  const handleBack = () => {
    router.back();
  };

  // 日付順にソート
  const sortedWeights = weights.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // 体重の変化を計算
  const getWeightChange = (current: number, previous?: number) => {
    if (!previous) return null;
    const change = current - previous;
    return {
      value: Math.abs(change),
      isPositive: change > 0,
      isNegative: change < 0
    };
  };

  return (
    <div className="min-h-screen">
      <Header 
        title="体重履歴"
        showBackButton 
        onBack={handleBack}
      />
      
      <main className="p-4 space-y-6">
        {sortedWeights.length > 0 ? (
          <div className="space-y-3">
            {sortedWeights.map((weight, index) => {
              const previousWeight = sortedWeights[index + 1];
              const change = getWeightChange(weight.weight, previousWeight?.weight);
              
              return (
                <Card key={weight.id} className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <p className="text-2xl font-bold">{weight.weight}kg</p>
                        {change && (
                          <div className={`text-sm px-2 py-1 rounded ${
                            change.isPositive 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {change.isPositive ? '+' : '-'}{change.value.toFixed(1)}kg
                          </div>
                        )}
                      </div>
                                        <p className="text-sm text-gray-600 mt-1">
                    {format(new Date(weight.date), 'yyyy年M月d日 (EEEE)', { locale: ja })}
                  </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-6 text-center text-gray-600">
            <p>まだ体重記録がありません</p>
            <p className="text-sm mt-1">体重を記録してみましょう！</p>
          </Card>
        )}

        {/* 統計情報 */}
        {sortedWeights.length > 0 && (
          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">統計</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.min(...sortedWeights.map(w => w.weight)).toFixed(1)}kg
                  </p>
                  <p className="text-sm text-gray-600">最低体重</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">
                    {Math.max(...sortedWeights.map(w => w.weight)).toFixed(1)}kg
                  </p>
                  <p className="text-sm text-gray-600">最高体重</p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
} 
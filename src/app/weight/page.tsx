'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAppContext } from '@/context/AppContext';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

export default function WeightPage() {
  const router = useRouter();
  const { addWeight, getWeightForDate, weights } = useAppContext();
  
  const today = format(new Date(), 'yyyy-MM-dd');
  const todayWeight = getWeightForDate(today);
  
  const [weight, setWeight] = useState(todayWeight?.weight.toString() || '');
  const [error, setError] = useState('');

  const handleSave = () => {
    const weightValue = parseFloat(weight);
    
    if (!weight || isNaN(weightValue)) {
      setError('有効な体重を入力してください');
      return;
    }
    
    if (weightValue < 30 || weightValue > 300) {
      setError('体重は30kg〜300kgの範囲で入力してください');
      return;
    }

    addWeight({
      weight: weightValue,
      date: today,
    });

    router.push('/');
  };

  const handleBack = () => {
    router.back();
  };

  const recentWeights = weights
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen">
      <Header 
        title="体重記録"
        showBackButton 
        onBack={handleBack}
      />
      
      <main className="p-4 space-y-6">
        {/* 今日の日付 */}
        <Card>
          <div className="text-center">
            <h2 className="text-lg font-semibold text-black">
              {format(new Date(), 'yyyy年M月d日', { locale: ja })}
            </h2>
            <p className="text-sm text-gray-700 mt-1">今日の体重を記録しましょう</p>
          </div>
        </Card>

        {/* 既存記録の表示 */}
        {todayWeight && (
          <Card className="bg-blue-50 border-blue-200">
            <div className="text-center">
              <p className="text-sm text-blue-600">今日の記録</p>
              <p className="text-2xl font-bold text-blue-800">{todayWeight.weight}kg</p>
            </div>
          </Card>
        )}

        {/* 体重入力フォーム */}
        <Card>
          <div className="space-y-4">
            <Input
              label="体重 (kg)"
              type="number"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
                setError('');
              }}
              placeholder="例: 70.5"
              error={error}
            />
            
            <Button 
              onClick={handleSave}
              className="w-full"
              disabled={!weight}
            >
              保存
            </Button>
          </div>
        </Card>

        {/* 最近の記録 */}
        {recentWeights.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-black">最近の記録</h3>
            {recentWeights.map((weightRecord) => (
              <Card key={weightRecord.id} className="p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-black">{weightRecord.weight}kg</p>
                  </div>
                                  <p className="text-sm text-gray-600">
                  {format(new Date(weightRecord.date), 'M/d', { locale: ja })}
                </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 
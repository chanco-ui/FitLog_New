'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAppContext } from '@/context/AppContext';
import { useState } from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

export default function WeightPage() {
  const router = useRouter();
  const { addWeight, getWeightForDate } = useAppContext();
  const [weight, setWeight] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!weight || isNaN(Number(weight))) {
      alert('有効な体重を入力してください');
      return;
    }

    setLoading(true);
    
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      
      // 今日の体重が既に記録されているかチェック
      const existingWeight = await getWeightForDate(today);
      if (existingWeight) {
        if (!confirm('今日の体重は既に記録されています。上書きしますか？')) {
          setLoading(false);
          return;
        }
      }

      await addWeight({
        weight: Number(weight),
        date: today,
      });

      setWeight('');
      alert('体重を記録しました！');
      router.push('/');
    } catch (error) {
      console.error('Failed to add weight:', error);
      alert('体重の記録に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header 
        title="体重記録"
        showBackButton 
        onBack={handleBack}
      />
      
      <main className="p-4">
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-black mb-2">
                体重 (kg)
              </label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="例: 65.5"
                step="0.1"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? '記録中...' : '記録する'}
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
} 
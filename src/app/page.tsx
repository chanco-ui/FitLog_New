'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAppContext } from '@/context/AppContext';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Play, Scale, Calendar, History, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header title="フィットログ" />
      
      <main className="p-6 space-y-6">
        {/* サブタイトル */}
        <div className="text-center mb-8">
          <p className="text-gray-600 text-sm">シンプル筋トレログ</p>
        </div>

        {/* メインナビゲーションボタン */}
        <div className="space-y-4">
          <Link href="/exercises">
            <Button 
              className="w-full h-14 text-lg font-medium flex items-center justify-center space-x-3 bg-black text-white hover:bg-gray-800"
            >
              <Play className="w-5 h-5" />
              <span>トレーニングを始める</span>
            </Button>
          </Link>
          
          <Link href="/weight">
            <Button 
              variant="outline"
              className="w-full h-14 text-lg font-medium flex items-center justify-center space-x-3 border-black text-black hover:bg-gray-50"
            >
              <Scale className="w-5 h-5" />
              <span>体重を記録</span>
            </Button>
          </Link>
          
          <Link href="/calendar">
            <Button 
              variant="outline"
              className="w-full h-14 text-lg font-medium flex items-center justify-center space-x-3 border-black text-black hover:bg-gray-50"
            >
              <Calendar className="w-5 h-5" />
              <span>カレンダーを見る</span>
            </Button>
          </Link>
          
          <Link href="/history">
            <Button 
              variant="outline"
              className="w-full h-14 text-lg font-medium flex items-center justify-center space-x-3 border-black text-black hover:bg-gray-50"
            >
              <History className="w-5 h-5" />
              <span>履歴を見る</span>
            </Button>
          </Link>
          
          <Link href="/weight-history">
            <Button 
              variant="outline"
              className="w-full h-14 text-lg font-medium flex items-center justify-center space-x-3 border-black text-black hover:bg-gray-50"
            >
              <TrendingUp className="w-5 h-5" />
              <span>体重履歴</span>
            </Button>
          </Link>
        </div>

        {/* 最近の記録 */}
        <RecentRecords />
      </main>
    </div>
  );
}

function RecentRecords() {
  const { workouts, weights } = useAppContext();
  
  const recentWorkouts = workouts
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 2);
    
  const recentWeights = weights
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 2);

  return (
    <div className="space-y-4 mt-8">
      <h2 className="text-lg font-semibold text-black">最近の記録</h2>
      
      {/* 最近のワークアウト */}
      {recentWorkouts.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">ワークアウト</h3>
          {recentWorkouts.map((workout) => (
            <Card key={workout.id} className="p-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-black">{workout.exercise.name}</p>
                  <p className="text-sm text-gray-700">
                    {workout.sets.length}セット
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  {format(new Date(workout.date), 'M/d', { locale: ja })}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* 最近の体重記録 */}
      {recentWeights.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">体重</h3>
          {recentWeights.map((weight) => (
            <Card key={weight.id} className="p-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-black">{weight.weight}kg</p>
                </div>
                <p className="text-sm text-gray-600">
                  {format(new Date(weight.date), 'M/d', { locale: ja })}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {recentWorkouts.length === 0 && recentWeights.length === 0 && (
        <Card className="p-6 text-center text-gray-600">
          <p>まだ記録がありません</p>
          <p className="text-sm mt-1">トレーニングや体重を記録してみましょう！</p>
        </Card>
      )}
    </div>
  );
}

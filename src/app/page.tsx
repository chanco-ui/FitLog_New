'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAppContext } from '@/context/AppContext';
import { useLineAuth } from '@/hooks/useLineAuth';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Play, Scale, Calendar, History, TrendingUp } from 'lucide-react';

// SSRを無効にする
export const dynamic = 'force-dynamic';

export default function HomePage() {
  const { user, loading, initialized, login, logout } = useLineAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!initialized) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">アプリの初期化に失敗しました</p>
          <Button onClick={() => window.location.reload()}>
            再読み込み
          </Button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <Header title="フィットログ" />
        
        <main className="p-6 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-black mb-2">FitLog</h2>
              <p className="text-gray-600">シンプル筋トレログ</p>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600">LINEアカウントでログインしてください</p>
              <Button 
                onClick={login}
                className="w-full h-14 text-lg font-medium bg-green-500 hover:bg-green-600"
              >
                LINEでログイン
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header title="フィットログ" />
      
      <main className="p-6 space-y-6">
        {/* ユーザー情報 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {user.pictureUrl && (
              <img 
                src={user.pictureUrl} 
                alt={user.displayName}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div>
              <p className="font-medium text-black">{user.displayName}</p>
              <p className="text-sm text-gray-600">ようこそ！</p>
            </div>
          </div>
          <Button 
            onClick={logout}
            variant="outline"
            size="sm"
          >
            ログアウト
          </Button>
        </div>

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

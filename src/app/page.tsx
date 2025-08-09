'use client';

import { useLineAuth } from '@/hooks/useLineAuth';
import { AppProvider } from '@/context/AppContext';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Dumbbell, 
  Activity, 
  TrendingUp, 
  Calendar,
  LogIn
} from 'lucide-react';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const { user, loading, initialized, login, logout } = useLineAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">初期化中...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <Header title="FitLog" />
        <main className="p-4">
          <div className="max-w-md mx-auto mt-8">
            <Card className="p-6 text-center">
              <div className="mb-6">
                <Dumbbell className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-black mb-2">FitLog</h1>
                <p className="text-gray-600">LINEでログインしてトレーニングを記録しましょう</p>
              </div>
              
              <Button 
                onClick={login}
                className="w-full flex items-center justify-center space-x-2"
              >
                <LogIn className="w-5 h-5" />
                <span>LINEでログイン</span>
              </Button>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <AppProvider>
      <div className="min-h-screen">
        <Header 
          title="FitLog" 
          showUserInfo
          user={user}
          onLogout={logout}
        />
        
        <main className="p-4">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              {user.pictureUrl && (
                <Image 
                  src={user.pictureUrl} 
                  alt={user.displayName}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <div>
                <h2 className="text-lg font-semibold text-black">
                  {user.displayName}さん、お疲れ様です！
                </h2>
                <p className="text-sm text-gray-600">今日もトレーニング頑張りましょう</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card 
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => window.location.href = '/exercises'}
            >
              <div className="text-center">
                <Dumbbell className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-black">トレーニング</h3>
                <p className="text-sm text-gray-600">ワークアウトを記録</p>
              </div>
            </Card>

            <Card 
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => window.location.href = '/weight'}
            >
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-black">体重記録</h3>
                <p className="text-sm text-gray-600">体重を記録</p>
              </div>
            </Card>

            <Card 
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => window.location.href = '/calendar'}
            >
              <div className="text-center">
                <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-black">カレンダー</h3>
                <p className="text-sm text-gray-600">記録を確認</p>
              </div>
            </Card>

            <Card 
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => window.location.href = '/weight-history'}
            >
              <div className="text-center">
                <Activity className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-semibold text-black">体重履歴</h3>
                <p className="text-sm text-gray-600">推移を確認</p>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </AppProvider>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { useAppContext } from '@/context/AppContext';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { ja } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function CalendarPage() {
  const router = useRouter();
  const { workouts, weights } = useAppContext();
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleBack = () => {
    router.back();
  };

  const handleDateClick = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    router.push(`/calendar/${formattedDate}`);
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // カレンダーの日付を生成
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // 日付ごとのデータを取得
  const getDataForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayWorkouts = workouts.filter(w => w.date === dateStr);
    const dayWeight = weights.find(w => w.date === dateStr);
    
    return {
      workouts: dayWorkouts,
      weight: dayWeight,
    };
  };

  return (
    <div className="min-h-screen">
      <Header 
        title="カレンダー"
        showBackButton 
        onBack={handleBack}
      />
      
      <main className="p-4">
        {/* 月のナビゲーション */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <h2 className="text-xl font-semibold text-black">
            {format(currentDate, 'yyyy年M月', { locale: ja })}
          </h2>
          
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* カレンダーグリッド */}
        <div className="grid grid-cols-7 gap-1">
          {/* 曜日ヘッダー */}
          {['日', '月', '火', '水', '木', '金', '土'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
          
          {/* 日付セル */}
          {days.map(day => {
            const data = getDataForDate(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isCurrentDay = isToday(day);
            
            return (
              <div
                key={day.toISOString()}
                onClick={() => handleDateClick(day)}
                className={`
                  p-2 min-h-[80px] border border-gray-200 cursor-pointer
                  ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'}
                  ${isCurrentDay ? 'ring-2 ring-blue-500' : ''}
                  hover:bg-blue-50 transition-colors
                `}
              >
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {format(day, 'd')}
                </div>
                
                {/* データの表示 */}
                <div className="space-y-1">
                  {data.weight && (
                    <div className="text-xs bg-green-100 text-green-700 px-1 py-0.5 rounded">
                      {data.weight.weight}kg
                    </div>
                  )}
                  
                  {data.workouts.length > 0 && (
                    <div className="text-xs bg-blue-100 text-blue-700 px-1 py-0.5 rounded">
                      {data.workouts.length}種目
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
} 
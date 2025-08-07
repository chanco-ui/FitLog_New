'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAppContext } from '@/context/AppContext';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay,
  addMonths,
  subMonths,
  getDay,
  isToday
} from 'date-fns';
import { ja } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarPage() {
  const router = useRouter();
  const { workouts, weights, getWorkoutsForDate, getWeightForDate } = useAppContext();
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleBack = () => {
    router.back();
  };

  const handleDateClick = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    router.push(`/calendar/${dateString}`);
  };

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // カレンダーの最初の週を埋めるための前月の日付
  const firstDayOfWeek = getDay(monthStart);
  const prevDays = Array.from({ length: firstDayOfWeek }, (_, i) => 
    new Date(monthStart.getTime() - (firstDayOfWeek - i) * 24 * 60 * 60 * 1000)
  );

  const allDays = [...prevDays, ...days];

  // 月間統計
  const monthWorkouts = workouts.filter(workout => 
    isSameMonth(new Date(workout.date), currentDate)
  );
  
  const monthWeights = weights.filter(weight => 
    isSameMonth(new Date(weight.date), currentDate)
  );

  return (
    <div className="min-h-screen">
      <Header 
        title="カレンダー"
        showBackButton 
        onBack={handleBack}
      />
      
      <main className="p-4 space-y-6">
        {/* 月切り替え */}
        <div className="flex items-center justify-between">
          <Button 
            onClick={handlePrevMonth}
            variant="outline"
            size="sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <h2 className="text-lg font-semibold text-black">
            {format(currentDate, 'yyyy年M月', { locale: ja })}
          </h2>
          
          <Button 
            onClick={handleNextMonth}
            variant="outline"
            size="sm"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* 月間統計 */}
        <Card>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-black">{monthWorkouts.length}</p>
              <p className="text-sm text-black">ワークアウト</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-black">{monthWeights.length}</p>
              <p className="text-sm text-black">体重記録</p>
            </div>
          </div>
        </Card>

        {/* カレンダー */}
        <Card>
          <div className="grid grid-cols-7 gap-1">
            {/* 曜日ヘッダー */}
            {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-black">
                {day}
              </div>
            ))}
            
            {/* 日付 */}
            {allDays.map((day, index) => {
              const dateString = format(day, 'yyyy-MM-dd');
              const dayWorkouts = getWorkoutsForDate(dateString);
              const dayWeight = getWeightForDate(dateString);
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isCurrentDay = isToday(day);
              
              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(day)}
                  className={`
                    p-2 text-sm relative min-h-[60px] flex flex-col items-center justify-start
                    ${isCurrentMonth ? 'text-black' : 'text-gray-400'}
                    ${isCurrentDay ? 'bg-blue-100 font-bold' : ''}
                    hover:bg-gray-50 transition-colors
                  `}
                >
                  <span className={isCurrentDay ? 'text-blue-600' : ''}>
                    {format(day, 'd')}
                  </span>
                  
                  {/* 記録インジケーター */}
                  <div className="flex flex-col items-center space-y-1 mt-1">
                    {dayWorkouts.length > 0 && (
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                    )}
                    {dayWeight && (
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* 凡例 */}
        <Card>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-black">凡例</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-black rounded-full"></div>
                <span className="text-black">ワークアウト</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-black">体重記録</span>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
} 
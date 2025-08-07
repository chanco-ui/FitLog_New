'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { EXERCISES } from '@/constants/exercises';
import { useAppContext } from '@/context/AppContext';
import { Set } from '@/types';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Plus, Trash2 } from 'lucide-react';

export default function WorkoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addWorkout } = useAppContext();
  
  const exerciseId = searchParams.get('exercise');
  const exercise = EXERCISES.find(ex => ex.id === Number(exerciseId));
  
  const [sets, setSets] = useState<Set[]>([
    { id: '1', weight: '', reps: '' }
  ]);

  useEffect(() => {
    if (!exercise) {
      router.push('/exercises');
    }
  }, [exercise, router]);

  const handleAddSet = () => {
    const newSet: Set = {
      id: Date.now().toString(),
      weight: '',
      reps: ''
    };
    setSets([...sets, newSet]);
  };

  const handleRemoveSet = (id: string) => {
    if (sets.length > 1) {
      setSets(sets.filter(set => set.id !== id));
    }
  };

  const handleSetChange = (id: string, field: 'weight' | 'reps', value: string) => {
    setSets(sets.map(set => 
      set.id === id ? { ...set, [field]: value } : set
    ));
  };

  const handleSave = async () => {
    if (!exercise) return;

    const today = format(new Date(), 'yyyy-MM-dd');
    
    try {
      await addWorkout({
        exercise,
        sets: sets.filter(set => set.weight && set.reps),
        date: today,
      });

      router.push('/');
    } catch (error) {
      console.error('Error saving workout:', error);
      // エラーハンドリングを追加できます
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (!exercise) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Header 
        title={`${exercise.muscle} - ${exercise.name}`}
        showBackButton 
        onBack={handleBack}
      />
      
      <main className="p-4 space-y-6">
        {/* エクササイズ情報 */}
        <Card>
          <div className="space-y-2">
            <h2 className="font-semibold text-lg text-black">{exercise.name}</h2>
            <p className="text-gray-800">{exercise.muscle}</p>
            <p className="text-sm text-gray-700">{exercise.description}</p>
            <p className="text-sm text-gray-700">
              日付: {format(new Date(), 'yyyy年M月d日', { locale: ja })}
            </p>
          </div>
        </Card>

        {/* セット入力 */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-black">セット</h3>
            <Button 
              onClick={handleAddSet}
              variant="outline"
              size="sm"
              className="flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>セット追加</span>
            </Button>
          </div>

          <div className="space-y-3">
            {sets.map((set, index) => (
              <Card key={set.id} className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <span className="text-sm font-medium text-gray-700">
                      {index + 1}セット
                    </span>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <Input
                      label="重量 (kg)"
                      type="number"
                      value={set.weight}
                      onChange={(e) => handleSetChange(set.id, 'weight', e.target.value)}
                      placeholder="0"
                    />
                    <Input
                      label="回数"
                      type="number"
                      value={set.reps}
                      onChange={(e) => handleSetChange(set.id, 'reps', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  
                  {sets.length > 1 && (
                    <button
                      onClick={() => handleRemoveSet(set.id)}
                      className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 保存ボタン */}
        <div className="pt-4">
          <Button 
            onClick={handleSave}
            className="w-full"
            disabled={!sets.some(set => set.weight && set.reps)}
          >
            保存
          </Button>
        </div>
      </main>
    </div>
  );
} 
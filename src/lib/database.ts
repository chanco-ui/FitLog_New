import { supabase } from './supabase';
import { Workout, WeightRecord } from '@/types';

// ユーザーIDを動的に取得する関数
const getUserId = (): string => {
  // LINE認証が利用可能な場合はLINEユーザーIDを使用
  if (typeof window !== 'undefined' && window.liff) {
    return window.liff.getProfile?.()?.then((profile: any) => profile.userId) || 'temp_user_123';
  }
  return 'temp_user_123';
};

export const databaseService = {
  // ワークアウト関連
  async getWorkouts(): Promise<Workout[]> {
    const userId = await getUserId();
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching workouts:', error);
      return [];
    }

    return data?.map(row => ({
      id: row.id,
      exercise: {
        id: row.exercise_id,
        name: row.exercise_name,
        icon: 'Dumbbell', // デフォルトアイコン
        muscle: row.exercise_muscle,
        description: row.exercise_description,
      },
      sets: row.sets,
      date: row.date,
      createdAt: new Date(row.created_at),
    })) || [];
  },

  async addWorkout(workout: Omit<Workout, 'id' | 'createdAt'>): Promise<void> {
    const userId = await getUserId();
    const { error } = await supabase
      .from('workouts')
      .insert({
        user_id: userId,
        exercise_id: workout.exercise.id,
        exercise_name: workout.exercise.name,
        exercise_muscle: workout.exercise.muscle,
        exercise_description: workout.exercise.description,
        sets: workout.sets,
        date: workout.date,
      });

    if (error) {
      console.error('Error adding workout:', error);
      throw error;
    }
  },

  async getWorkoutsForDate(date: string): Promise<Workout[]> {
    const userId = await getUserId();
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', userId)
      .eq('date', date)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching workouts for date:', error);
      return [];
    }

    return data?.map(row => ({
      id: row.id,
      exercise: {
        id: row.exercise_id,
        name: row.exercise_name,
        icon: 'Dumbbell',
        muscle: row.exercise_muscle,
        description: row.exercise_description,
      },
      sets: row.sets,
      date: row.date,
      createdAt: new Date(row.created_at),
    })) || [];
  },

  // 体重関連
  async getWeights(): Promise<WeightRecord[]> {
    const userId = await getUserId();
    const { data, error } = await supabase
      .from('weights')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching weights:', error);
      return [];
    }

    return data?.map(row => ({
      id: row.id,
      weight: row.weight,
      date: row.date,
      createdAt: new Date(row.created_at),
    })) || [];
  },

  async addWeight(weight: Omit<WeightRecord, 'id' | 'createdAt'>): Promise<void> {
    const userId = await getUserId();
    const { error } = await supabase
      .from('weights')
      .insert({
        user_id: userId,
        weight: weight.weight,
        date: weight.date,
      });

    if (error) {
      console.error('Error adding weight:', error);
      throw error;
    }
  },

  async getWeightForDate(date: string): Promise<WeightRecord | undefined> {
    const userId = await getUserId();
    const { data, error } = await supabase
      .from('weights')
      .select('*')
      .eq('user_id', userId)
      .eq('date', date)
      .single();

    if (error) {
      console.error('Error fetching weight for date:', error);
      return undefined;
    }

    if (!data) return undefined;

    return {
      id: data.id,
      weight: data.weight,
      date: data.date,
      createdAt: new Date(data.created_at),
    };
  },
}; 
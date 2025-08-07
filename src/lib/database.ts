import { supabase } from './supabase';
import { Workout, WeightRecord } from '@/types';

// 仮のユーザーID（後で認証システムに置き換え）
const TEMP_USER_ID = 'temp_user_123';

export const databaseService = {
  // ワークアウト関連
  async getWorkouts(): Promise<Workout[]> {
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', TEMP_USER_ID)
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
    const { error } = await supabase
      .from('workouts')
      .insert({
        user_id: TEMP_USER_ID,
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
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', TEMP_USER_ID)
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
    const { data, error } = await supabase
      .from('weights')
      .select('*')
      .eq('user_id', TEMP_USER_ID)
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
    const { error } = await supabase
      .from('weights')
      .insert({
        user_id: TEMP_USER_ID,
        weight: weight.weight,
        date: weight.date,
      });

    if (error) {
      console.error('Error adding weight:', error);
      throw error;
    }
  },

  async getWeightForDate(date: string): Promise<WeightRecord | undefined> {
    const { data, error } = await supabase
      .from('weights')
      .select('*')
      .eq('user_id', TEMP_USER_ID)
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
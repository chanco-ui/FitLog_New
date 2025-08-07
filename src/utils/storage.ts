import { Workout, WeightRecord } from '@/types';

const WORKOUTS_KEY = 'fitlog_workouts';
const WEIGHTS_KEY = 'fitlog_weights';

export const loadWorkouts = (): Workout[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(WORKOUTS_KEY);
    if (!stored) return [];
    
    const workouts = JSON.parse(stored);
    return workouts.map((workout: any) => ({
      ...workout,
      createdAt: new Date(workout.createdAt)
    }));
  } catch (error) {
    console.error('Failed to load workouts:', error);
    return [];
  }
};

export const saveWorkouts = (workouts: Workout[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));
  } catch (error) {
    console.error('Failed to save workouts:', error);
  }
};

export const loadWeights = (): WeightRecord[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(WEIGHTS_KEY);
    if (!stored) return [];
    
    const weights = JSON.parse(stored);
    return weights.map((weight: any) => ({
      ...weight,
      createdAt: new Date(weight.createdAt)
    }));
  } catch (error) {
    console.error('Failed to load weights:', error);
    return [];
  }
};

export const saveWeights = (weights: WeightRecord[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(WEIGHTS_KEY, JSON.stringify(weights));
  } catch (error) {
    console.error('Failed to save weights:', error);
  }
}; 
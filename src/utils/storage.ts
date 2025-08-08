import { Workout, WeightRecord } from '@/types';

// ローカルストレージのキー
const WORKOUTS_KEY = 'workouts';
const WEIGHTS_KEY = 'weights';

// ローカルストレージからデータを取得
export const getFromStorage = <T>(key: string): T[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Failed to get data from storage for key: ${key}`, error);
    return [];
  }
};

// ローカルストレージにデータを保存
export const saveToStorage = <T>(key: string, data: T[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to save data to storage for key: ${key}`, error);
  }
};

// ワークアウト関連
export const getWorkoutsFromStorage = (): Workout[] => {
  return getFromStorage<Workout>(WORKOUTS_KEY);
};

export const saveWorkoutsToStorage = (workouts: Workout[]): void => {
  saveToStorage(WORKOUTS_KEY, workouts);
};

export const addWorkoutToStorage = (workout: Workout): void => {
  const workouts = getWorkoutsFromStorage();
  workouts.unshift(workout);
  saveWorkoutsToStorage(workouts);
};

// 体重関連
export const getWeightsFromStorage = (): WeightRecord[] => {
  return getFromStorage<WeightRecord>(WEIGHTS_KEY);
};

export const saveWeightsToStorage = (weights: WeightRecord[]): void => {
  saveToStorage(WEIGHTS_KEY, weights);
};

export const addWeightToStorage = (weight: WeightRecord): void => {
  const weights = getWeightsFromStorage();
  weights.unshift(weight);
  saveWeightsToStorage(weights);
}; 
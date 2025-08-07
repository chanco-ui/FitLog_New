export interface Exercise {
  id: number;
  name: string;
  icon: string;
  muscle: string;
  description: string;
}

export interface Set {
  id: string;
  weight: string;
  reps: string;
}

export interface Workout {
  id: string;
  exercise: Exercise;
  sets: Set[];
  date: string; // YYYY-MM-DD形式
  createdAt: Date;
}

export interface WeightRecord {
  id: string;
  weight: number;
  date: string; // YYYY-MM-DD形式
  createdAt: Date;
}

export interface DayDetail {
  date: string;
  workouts: Workout[];
  weight?: WeightRecord;
}

export interface AppState {
  workouts: Workout[];
  weights: WeightRecord[];
} 
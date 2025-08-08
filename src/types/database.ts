export interface Database {
  public: {
    Tables: {
      workouts: {
        Row: {
          id: number;
          user_id: string;
          exercise_id: string;
          exercise_name: string;
          exercise_muscle: string;
          exercise_description: string;
          sets: string;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          exercise_id: string;
          exercise_name: string;
          exercise_muscle: string;
          exercise_description: string;
          sets: string;
          date: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          exercise_id?: string;
          exercise_name?: string;
          exercise_muscle?: string;
          exercise_description?: string;
          sets?: string;
          date?: string;
          created_at?: string;
        };
      };
      weights: {
        Row: {
          id: number;
          user_id: string;
          weight: number;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          weight: number;
          date: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          weight?: number;
          date?: string;
          created_at?: string;
        };
      };
    };
  };
} 
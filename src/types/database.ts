export interface Database {
  public: {
    Tables: {
      workouts: {
        Row: {
          id: string;
          user_id: string;
          exercise_id: number;
          exercise_name: string;
          exercise_muscle: string;
          exercise_description: string;
          sets: any[];
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          exercise_id: number;
          exercise_name: string;
          exercise_muscle: string;
          exercise_description: string;
          sets: any[];
          date: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          exercise_id?: number;
          exercise_name?: string;
          exercise_muscle?: string;
          exercise_description?: string;
          sets?: any[];
          date?: string;
          created_at?: string;
        };
      };
      weights: {
        Row: {
          id: string;
          user_id: string;
          weight: number;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          weight: number;
          date: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          weight?: number;
          date?: string;
          created_at?: string;
        };
      };
    };
  };
} 
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Workout, WeightRecord, Exercise } from '@/types';
import { databaseService } from '@/lib/database';

interface AppContextType {
  workouts: Workout[];
  weights: WeightRecord[];
  loading: boolean;
  addWorkout: (workout: Omit<Workout, 'id' | 'createdAt'>) => Promise<void>;
  addWeight: (weight: Omit<WeightRecord, 'id' | 'createdAt'>) => Promise<void>;
  getWorkoutsForDate: (date: string) => Workout[];
  getWeightForDate: (date: string) => WeightRecord | undefined;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [weights, setWeights] = useState<WeightRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [workoutsData, weightsData] = await Promise.all([
        databaseService.getWorkouts(),
        databaseService.getWeights(),
      ]);
      setWorkouts(workoutsData);
      setWeights(weightsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addWorkout = async (workout: Omit<Workout, 'id' | 'createdAt'>) => {
    try {
      await databaseService.addWorkout(workout);
      await loadData(); // データを再読み込み
    } catch (error) {
      console.error('Error adding workout:', error);
      throw error;
    }
  };

  const addWeight = async (weight: Omit<WeightRecord, 'id' | 'createdAt'>) => {
    try {
      await databaseService.addWeight(weight);
      await loadData(); // データを再読み込み
    } catch (error) {
      console.error('Error adding weight:', error);
      throw error;
    }
  };

  const getWorkoutsForDate = (date: string): Workout[] => {
    return workouts.filter(workout => workout.date === date);
  };

  const getWeightForDate = (date: string): WeightRecord | undefined => {
    return weights.find(weight => weight.date === date);
  };

  const refreshData = async () => {
    await loadData();
  };

  const value: AppContextType = {
    workouts,
    weights,
    loading,
    addWorkout,
    addWeight,
    getWorkoutsForDate,
    getWeightForDate,
    refreshData,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}; 
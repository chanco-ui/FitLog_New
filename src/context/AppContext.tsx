'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Workout, WeightRecord, Exercise } from '@/types';
import { loadWorkouts, saveWorkouts, loadWeights, saveWeights } from '@/utils/storage';

interface AppContextType {
  workouts: Workout[];
  weights: WeightRecord[];
  addWorkout: (workout: Omit<Workout, 'id' | 'createdAt'>) => void;
  addWeight: (weight: Omit<WeightRecord, 'id' | 'createdAt'>) => void;
  getWorkoutsForDate: (date: string) => Workout[];
  getWeightForDate: (date: string) => WeightRecord | undefined;
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

  useEffect(() => {
    setWorkouts(loadWorkouts());
    setWeights(loadWeights());
  }, []);

  const addWorkout = (workout: Omit<Workout, 'id' | 'createdAt'>) => {
    const newWorkout: Workout = {
      ...workout,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    
    const updatedWorkouts = [...workouts, newWorkout];
    setWorkouts(updatedWorkouts);
    saveWorkouts(updatedWorkouts);
  };

  const addWeight = (weight: Omit<WeightRecord, 'id' | 'createdAt'>) => {
    const newWeight: WeightRecord = {
      ...weight,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    
    const updatedWeights = [...weights, newWeight];
    setWeights(updatedWeights);
    saveWeights(updatedWeights);
  };

  const getWorkoutsForDate = (date: string): Workout[] => {
    return workouts.filter(workout => workout.date === date);
  };

  const getWeightForDate = (date: string): WeightRecord | undefined => {
    return weights.find(weight => weight.date === date);
  };

  const value: AppContextType = {
    workouts,
    weights,
    addWorkout,
    addWeight,
    getWorkoutsForDate,
    getWeightForDate,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}; 
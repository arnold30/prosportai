
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ExerciseSelector from '@/components/training-templates/ExerciseSelector';

const RoutineDayEditor = ({ dayIndex, dayData, onUpdateDayData }) => {
  const handleAddExerciseToDay = (exercise) => {
    const newExerciseEntry = { exerciseId: exercise.id, sets: '', reps: '', rest: '' };
    onUpdateDayData(dayIndex, { ...dayData, exercises: [...(dayData.exercises || []), newExerciseEntry] });
  };

  const handleUpdateExerciseInDay = (exerciseIndex, updatedExerciseData) => {
    const updatedExercises = (dayData.exercises || []).map((ex, i) => i === exerciseIndex ? updatedExerciseData : ex);
    onUpdateDayData(dayIndex, { ...dayData, exercises: updatedExercises });
  };
  
  const handleRemoveExerciseFromDay = (exerciseIndex) => {
    const updatedExercises = (dayData.exercises || []).filter((_, i) => i !== exerciseIndex);
    onUpdateDayData(dayIndex, { ...dayData, exercises: updatedExercises });
  };
  
  return (
    <Card className="p-4">
      <Input 
        placeholder={`Nombre del día (Ej: Lunes - Pecho y Tríceps)`} 
        value={dayData.name || ''}
        onChange={(e) => onUpdateDayData(dayIndex, { ...dayData, name: e.target.value })}
        className="mb-3"
      />
      <ExerciseSelector 
        selectedExercises={dayData.exercises || []} 
        onSelectExercise={handleAddExerciseToDay}
        onUpdateExercise={handleUpdateExerciseInDay}
        onRemoveExercise={handleRemoveExerciseFromDay}
      />
    </Card>
  );
};

export default RoutineDayEditor;

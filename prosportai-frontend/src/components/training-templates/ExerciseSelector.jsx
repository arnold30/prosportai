
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

const initialExercisesList = [
  { id: 'ex1', name: 'Press de Banca', muscleGroup: 'Pecho', equipmentNeeded: 'Barra, Banco', difficulty: 'Intermedio' },
  { id: 'ex2', name: 'Sentadilla con Barra', muscleGroup: 'Piernas', equipmentNeeded: 'Barra, Rack', difficulty: 'Intermedio' },
  { id: 'ex3', name: 'Peso Muerto', muscleGroup: 'Espalda, Piernas', equipmentNeeded: 'Barra', difficulty: 'Avanzado' },
  { id: 'ex4', name: 'Dominadas', muscleGroup: 'Espalda, Brazos', equipmentNeeded: 'Barra de dominadas', difficulty: 'Intermedio' },
  { id: 'ex5', name: 'Flexiones', muscleGroup: 'Pecho, Brazos', equipmentNeeded: 'Ninguno', difficulty: 'Principiante' },
  { id: 'ex6', name: 'Plancha Abdominal', muscleGroup: 'Core', equipmentNeeded: 'Ninguno', difficulty: 'Principiante' },
  { id: 'ex7', name: 'Curl de Bíceps', muscleGroup: 'Brazos', equipmentNeeded: 'Mancuernas', difficulty: 'Principiante' },
  { id: 'ex8', name: 'Press Militar', muscleGroup: 'Hombros', equipmentNeeded: 'Barra o Mancuernas', difficulty: 'Intermedio' },
];

const ExerciseSelector = ({ selectedExercises, onSelectExercise, onUpdateExercise, onRemoveExercise }) => {
  const [availableExercises, setAvailableExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedExercises = localStorage.getItem('prosportai_exercises');
    if (storedExercises) {
      setAvailableExercises(JSON.parse(storedExercises));
    } else {
      localStorage.setItem('prosportai_exercises', JSON.stringify(initialExercisesList));
      setAvailableExercises(initialExercisesList);
    }
  }, []);
  
  const filteredExercises = availableExercises.filter(ex => 
    ex.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (!selectedExercises || !selectedExercises.find(selEx => selEx.exerciseId === ex.id))
  );

  return (
    <div className="space-y-2">
      <Input 
        placeholder="Buscar ejercicio..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-2"
      />
      <div className="max-h-40 overflow-y-auto border rounded-md p-2 space-y-1">
        {filteredExercises.length > 0 ? filteredExercises.map(ex => (
          <div key={ex.id} className="flex items-center justify-between p-1.5 hover:bg-muted rounded-md text-sm">
            <span>{ex.name} ({ex.muscleGroup})</span>
            <Button type="button" size="sm" variant="outline" onClick={() => onSelectExercise(ex)}>Añadir</Button>
          </div>
        )) : <p className="text-xs text-muted-foreground text-center">No hay ejercicios disponibles o ya seleccionados.</p>}
      </div>
      {selectedExercises && selectedExercises.length > 0 && (
        <div>
          <p className="text-sm font-medium mt-2 mb-1">Ejercicios en este día:</p>
          {selectedExercises.map((selExData, index) => {
            const exerciseDetails = availableExercises.find(ex => ex.id === selExData.exerciseId);
            return (
              <Card key={index} className="p-2 mb-2 text-xs bg-muted/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">{exerciseDetails?.name || 'Ejercicio no encontrado'}</span>
                  <Button type="button" variant="ghost" size="sm" className="text-red-500 hover:text-red-600 p-1 h-auto" onClick={() => onRemoveExercise(index)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <Input type="text" placeholder="Series" value={selExData.sets || ''} onChange={(e) => onUpdateExercise(index, { ...selExData, sets: e.target.value })} className="h-7 text-xs"/>
                  <Input type="text" placeholder="Reps" value={selExData.reps || ''} onChange={(e) => onUpdateExercise(index, { ...selExData, reps: e.target.value })} className="h-7 text-xs"/>
                  <Input type="text" placeholder="Descanso" value={selExData.rest || ''} onChange={(e) => onUpdateExercise(index, { ...selExData, rest: e.target.value })} className="h-7 text-xs"/>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExerciseSelector;

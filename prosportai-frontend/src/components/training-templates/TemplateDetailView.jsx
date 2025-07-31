import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Target, BarChart3, ListChecks, Dumbbell } from 'lucide-react';

const DetailItem = ({ icon, label, value, className }) => (
  <div className={`flex items-start space-x-2 ${className}`}>
    {React.cloneElement(icon, { className: "h-5 w-5 text-primary mt-0.5" })}
    <div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-base text-foreground">{value}</p>
    </div>
  </div>
);

const TemplateDetailView = ({ template }) => {
  if (!template) return null;

  const totalExercises = template.structure?.reduce((acc, day) => acc + (day.exercises?.length || 0), 0) || 0;

  return (
    <>
      <DialogHeader className="mb-4">
        <DialogTitle className="text-2xl font-bold text-gradient">{template.name}</DialogTitle>
        <DialogDescription className="text-base">
          {template.description || "Descripción detallada de la plantilla de entrenamiento."}
        </DialogDescription>
      </DialogHeader>

      <ScrollArea className="max-h-[70vh] pr-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
          <DetailItem icon={<Target />} label="Objetivo Principal" value={template.targetObjective || 'N/A'} />
          <DetailItem icon={<BarChart3 />} label="Nivel de Dificultad" value={template.level || 'N/A'} />
          <DetailItem icon={<CalendarDays />} label="Duración Total" value={`${template.durationDays || 'N/A'} días`} />
          <DetailItem icon={<ListChecks />} label="Frecuencia Semanal" value={`${template.daysPerWeek || 'N/A'} días/semana`} />
          <DetailItem icon={<Dumbbell />} label="Total de Ejercicios" value={`${totalExercises} ejercicios`} />
        </div>

        <h3 className="text-xl font-semibold mb-3 text-primary">Estructura del Entrenamiento</h3>
        {template.structure && template.structure.length > 0 ? (
          <div className="space-y-5">
            {template.structure.map((day, dayIndex) => (
              <div key={dayIndex} className="p-4 border rounded-lg bg-card shadow-sm">
                <h4 className="text-lg font-semibold mb-2 text-foreground">{day.name || `Día ${dayIndex + 1}`}</h4>
                {day.exercises && day.exercises.length > 0 ? (
                  <ul className="space-y-2">
                    {day.exercises.map((exercise, exIndex) => {
                      const exerciseDetailsFromStorage = JSON.parse(localStorage.getItem('prosportai_exercises') || '[]').find(e => e.id === exercise.exerciseId);
                      const exerciseName = exerciseDetailsFromStorage ? exerciseDetailsFromStorage.name : exercise.name || 'Ejercicio Desconocido';
                      
                      return (
                        <li key={exIndex} className="p-3 bg-background rounded-md border">
                          <p className="font-medium text-base text-foreground">{exerciseName}</p>
                          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground mt-1">
                            <span>Series: <Badge variant="outline">{exercise.sets || 'N/A'}</Badge></span>
                            <span>Reps: <Badge variant="outline">{exercise.reps || 'N/A'}</Badge></span>
                            {exercise.rest && <span>Descanso: <Badge variant="outline">{exercise.rest}</Badge></span>}
                            {exercise.rpe && <span>RPE: <Badge variant="outline">{exercise.rpe}</Badge></span>}
                            {exercise.tempo && <span>Tempo: <Badge variant="outline">{exercise.tempo}</Badge></span>}
                          </div>
                          {exercise.notes && <p className="text-xs text-muted-foreground mt-1.5 italic">Nota: {exercise.notes}</p>}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No hay ejercicios asignados para este día.</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No se ha definido una estructura de entrenamiento para esta plantilla.</p>
        )}
      </ScrollArea>
    </>
  );
};

export default TemplateDetailView;
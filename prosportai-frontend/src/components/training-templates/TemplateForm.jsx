import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogFooter, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import RoutineDayEditor from '@/components/training-templates/RoutineDayEditor';

const niveles = ["Principiante", "Intermedio", "Avanzado"];
const objetivos = ["Hipertrofia", "Fuerza", "Pérdida de Grasa", "Resistencia", "General"];

const TemplateForm = ({
  templateFormData,
  handleInputChange,
  handleSelectChange,
  handleSubmit,
  setIsFormOpen,
  editingTemplate,
  handleUpdateDayData,
}) => {
  const [localForm, setLocalForm] = useState({ ...templateFormData });

  // Sync with parent when editing or open
  useEffect(() => {
    setLocalForm({
      ...templateFormData,
      structure: Array.isArray(templateFormData.structure)
        ? [...templateFormData.structure]
        : [],
    });
  }, [templateFormData]);

  // Cambia el número de días por semana Y genera la estructura de rutina
  const handleDaysPerWeekChange = (value) => {
    const numDays = parseInt(value, 10) || 0;
    const newStructure = Array.from({ length: numDays }, (_, i) => ({
      name: `Día ${i + 1}`,
      exercises: [],
    }));
    setLocalForm((prev) => ({
      ...prev,
      daysPerWeek: value,
      structure: newStructure,
    }));
  };

  // Actualiza nombre del día o ejercicios de un día concreto
  const handleUpdateRoutineDay = (dayIndex, updatedDayData) => {
    const newStructure = [...(localForm.structure || [])];
    newStructure[dayIndex] = updatedDayData;
    setLocalForm((prev) => ({
      ...prev,
      structure: newStructure,
    }));
  };

  // Submit real
  const onSubmit = (e) => {
    e.preventDefault();
    // Devuelve el form completo con estructura al padre
    handleSubmit({ ...localForm });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{editingTemplate ? 'Editar Plantilla' : 'Crear Nueva Plantilla'}</DialogTitle>
        <DialogDescription>
          {editingTemplate
            ? 'Actualiza los detalles de esta plantilla.'
            : 'Define una nueva plantilla de entrenamiento.'}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit} className="space-y-4 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="template-name">Nombre de la Plantilla</Label>
            <Input
              id="template-name"
              name="name"
              value={localForm.name || ''}
              onChange={(e) =>
                setLocalForm((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="template-level">Nivel</Label>
            <Select
              name="level"
              value={localForm.level || ''}
              onValueChange={(value) =>
                setLocalForm((prev) => ({ ...prev, level: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona nivel" />
              </SelectTrigger>
              <SelectContent>
                {niveles.map((nivel) => (
                  <SelectItem key={nivel} value={nivel}>
                    {nivel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="template-description">Descripción</Label>
          <Input
            id="template-description"
            name="description"
            value={localForm.description || ''}
            onChange={(e) =>
              setLocalForm((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="template-objective">Objetivo Principal</Label>
            <Select
              name="targetObjective"
              value={localForm.targetObjective || ''}
              onValueChange={(value) =>
                setLocalForm((prev) => ({ ...prev, targetObjective: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona objetivo" />
              </SelectTrigger>
              <SelectContent>
                {objetivos.map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="template-duration">Duración (días totales)</Label>
            <Input
              id="template-duration"
              name="durationDays"
              type="number"
              value={localForm.durationDays || '7'}
              min="1"
              onChange={(e) =>
                setLocalForm((prev) => ({
                  ...prev,
                  durationDays: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <Label htmlFor="template-daysPerWeek">Días por Semana</Label>
            <Input
              id="template-daysPerWeek"
              name="daysPerWeek"
              type="number"
              value={localForm.daysPerWeek || '3'}
              min="1"
              max="7"
              onChange={(e) => handleDaysPerWeekChange(e.target.value)}
            />
          </div>
        </div>
        <Label className="block pt-2 font-medium">Estructura de la Rutina:</Label>
        <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2">
          {Array.isArray(localForm.structure) &&
            localForm.structure.map((day, index) => (
              <RoutineDayEditor
                key={index}
                dayIndex={index}
                dayData={day || { name: `Día ${index + 1}`, exercises: [] }}
                onUpdateDayData={handleUpdateRoutineDay}
              />
            ))}
        </div>
        <DialogFooter className="pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsFormOpen(false)}
          >
            Cancelar
          </Button>
          <Button type="submit">
            {editingTemplate ? 'Guardar Cambios' : 'Crear Plantilla'}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
};

export default TemplateForm;

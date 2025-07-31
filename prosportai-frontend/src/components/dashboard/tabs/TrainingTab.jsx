
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, LayoutGrid } from 'lucide-react';
import TemplateCard from '@/components/training-templates/TemplateCard';
import { useToast } from "@/components/ui/use-toast";

const STORAGE_KEY_TEMPLATES = 'prosportai_routineTemplates';

const TrainingTab = ({ onOpenTemplateDetails }) => {
  const [trainingTemplates, setTrainingTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const storedTemplates = localStorage.getItem(STORAGE_KEY_TEMPLATES);
    if (storedTemplates) {
      try {
        const parsedTemplates = JSON.parse(storedTemplates);
         setTrainingTemplates(parsedTemplates.map(t => ({
          ...t,
          id: t.id || `template-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          structure: Array.isArray(t.structure) ? t.structure.map(day => ({
            name: day.name || '',
            exercises: Array.isArray(day.exercises) ? day.exercises : []
          })) : [] 
        })));
      } catch (error) {
        console.error("Error parsing templates from localStorage for dashboard training tab:", error);
        setTrainingTemplates([]);
      }
    }
  }, []);

  const downloadTemplateJSON = (data, filename) => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
    toast({ title: "Descarga Iniciada", description: `${filename} se está descargando.` });
  };

  const filteredTrainingTemplates = trainingTemplates.filter(temp => 
    temp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    temp.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    temp.targetObjective?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    temp.level?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Planes de Entrenamiento Disponibles</CardTitle>
          <CardDescription>Explora las plantillas de entrenamiento. Haz clic en una para ver los detalles.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="mb-6">
            <Label htmlFor="search-dashboard-templates" className="sr-only">Buscar plantillas</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="search-dashboard-templates" type="text" placeholder="Buscar por nombre, objetivo, nivel..."
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full md:w-1/2 lg:w-1/3"
              />
            </div>
          </div>

          {filteredTrainingTemplates.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              variants={containerVariants} initial="hidden" animate="visible"
            >
              {filteredTrainingTemplates.map((template) => (
                <TemplateCard 
                  key={template.id} 
                  template={template}
                  onView={() => onOpenTemplateDetails(template)}
                  onEdit={() => toast({title: "Acción no disponible", description: "La edición de plantillas solo está disponible en la página de gestión de plantillas."})}
                  onDelete={() => toast({title: "Acción no disponible", description: "La eliminación de plantillas solo está disponible en la página de gestión de plantillas."})}
                  onDownloadJSON={downloadTemplateJSON}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 bg-muted/30 rounded-lg"
            >
              <LayoutGrid className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No se encontraron plantillas</h2>
               <p className="text-muted-foreground text-sm">
                {searchTerm ? `No hay plantillas que coincidan con "${searchTerm}".` : 'No hay plantillas de entrenamiento disponibles en este momento.'}
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TrainingTab;

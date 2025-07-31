import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Search, LayoutGrid, Users, Copy, Eye } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import TemplateCard from '@/components/training-templates/TemplateCard';
import TemplateDetailView from '@/components/training-templates/TemplateDetailView';

const communityTemplatesData = [
  {
    id: 'community-strength-beginner',
    name: 'Iniciación a la Fuerza (Comunidad)',
    description: 'Una rutina de cuerpo completo ideal para quienes comienzan a entrenar la fuerza. Enfocada en movimientos básicos y técnica.',
    targetObjective: 'Fuerza',
    level: 'Principiante',
    durationDays: '84', 
    daysPerWeek: '3',
    isCommunity: true,
    structure: [
      { name: 'Día 1: Empuje A', exercises: [
        { exerciseId: 'ex2', name: 'Sentadilla con Barra', sets: '3', reps: '8-12', rest: '60-90s' }, 
        { exerciseId: 'ex1', name: 'Press de Banca', sets: '3', reps: '8-12', rest: '60-90s' },
        { exerciseId: 'ex8', name: 'Press Militar', sets: '3', reps: '10-15', rest: '60s' },
        { exerciseId: 'ex5', name: 'Flexiones', sets: '3', reps: 'Al fallo', rest: '60s' },
      ]},
      { name: 'Día 2: Tirón A', exercises: [
        { exerciseId: 'ex3', name: 'Peso Muerto', sets: '1', reps: '5', rest: '120-180s' }, 
        { exerciseId: 'ex4', name: 'Dominadas', sets: '3', reps: 'Asistidas o negativas al fallo', rest: '90s' },
        { exerciseId: 'ex7', name: 'Curl de Bíceps', sets: '3', reps: '10-15', rest: '60s' },
        { exerciseId: 'ex6', name: 'Plancha Abdominal', sets: '3', reps: '30-60s', rest: '45s' },
      ]},
      { name: 'Día 3: Empuje B', exercises: [
        { exerciseId: 'ex2', name: 'Sentadilla con Barra', sets: '3', reps: '8-12', rest: '60-90s', notes: "Intenta progresar en peso o reps." }, 
        { exerciseId: 'ex1', name: 'Press de Banca', sets: '3', reps: '8-12', rest: '60-90s' },
        { exerciseId: 'ex8', name: 'Press Militar', sets: '3', reps: '10-15', rest: '60s' },
        { exerciseId: 'ex5', name: 'Flexiones', sets: '3', reps: 'Al fallo', rest: '60s' },
      ]},
    ]
  },
  {
    id: 'community-hypertrophy-intermediate',
    name: 'Hipertrofia Clásica (Comunidad)',
    description: 'Rutina dividida para intermedios buscando maximizar la ganancia muscular. Enfoque en volumen y conexión mente-músculo.',
    targetObjective: 'Hipertrofia',
    level: 'Intermedio',
    durationDays: '90', 
    daysPerWeek: '4',
    isCommunity: true,
    structure: [
      { name: 'Día 1: Pecho y Tríceps', exercises: [
        { exerciseId: 'ex1', name: 'Press de Banca', sets: '4', reps: '8-10', rest: '90s' },
        { exerciseId: 'ex5', name: "Flexiones Inclinadas", sets: '3', reps: '10-12', rest: '60s' }, 
        { exerciseId: 'ex8', name: "Press Francés", sets: '3', reps: '10-12', rest: '60s' }, 
      ]},
      { name: 'Día 2: Espalda y Bíceps', exercises: [
        { exerciseId: 'ex4', name: 'Dominadas', sets: '4', reps: '6-10', rest: '90s' },
        { exerciseId: 'ex3', name: "Remo con Barra", sets: '3', reps: '8-10', rest: '75s' }, 
        { exerciseId: 'ex7', name: 'Curl de Bíceps', sets: '3', reps: '10-12', rest: '60s' },
      ]},
      { name: 'Día 3: Piernas', exercises: [
        { exerciseId: 'ex2', name: 'Sentadilla con Barra', sets: '4', reps: '8-10', rest: '90-120s' },
        { exerciseId: 'ex3', name: "Peso Muerto Rumano", sets: '3', reps: '10-12', rest: '75s' },
      ]},
      { name: 'Día 4: Hombros y Trapecios', exercises: [
        { exerciseId: 'ex8', name: 'Press Militar', sets: '4', reps: '8-10', rest: '75s' },
      ]},
    ]
  }
];

const STORAGE_KEY_TEMPLATES = 'prosportai_routineTemplates';
const generateNewId = () => `template-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const CommunityTemplatesPage = () => {
  const { currentUser } = useAuth();
  const [communityTemplates, setCommunityTemplates] = useState(communityTemplatesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingTemplate, setViewingTemplate] = useState(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const { toast } = useToast();

  const handleViewTemplate = (template) => {
    setViewingTemplate(template);
    setIsDetailViewOpen(true);
  };

  const handleCopyToMyTemplates = (communityTemplate) => {
    if (!currentUser || (currentUser.rol !== 'entrenador' && currentUser.rol !== 'admin')) {
      toast({
        title: "Acción Requiere Inicio de Sesión",
        description: "Debes iniciar sesión como entrenador o administrador para copiar plantillas.",
        variant: "destructive",
      });
      return;
    }

    const storedTemplates = localStorage.getItem(STORAGE_KEY_TEMPLATES);
    let userTemplates = [];
    if (storedTemplates) {
      try {
        userTemplates = JSON.parse(storedTemplates);
      } catch (error) {
        console.error("Error parsing user templates from localStorage:", error);
        userTemplates = [];
      }
    }

    const newId = generateNewId();
    const copiedTemplate = { ...communityTemplate, id: newId, isCommunity: false };

    const existingTemplate = userTemplates.find(t => t.name === copiedTemplate.name);
    if (existingTemplate) {
      toast({
        title: "Plantilla ya existe",
        description: `Ya tienes una plantilla llamada "${copiedTemplate.name}" en "Mis Plantillas". Se ha copiado con un nombre modificado.`,
        variant: "default",
      });
      copiedTemplate.name = `${copiedTemplate.name} (Copia Comunidad)`;
    }
    
    userTemplates.push(copiedTemplate);
    localStorage.setItem(STORAGE_KEY_TEMPLATES, JSON.stringify(userTemplates));
    
    toast({ title: "Plantilla Copiada", description: `"${communityTemplate.name}" ha sido copiada a "Mis Plantillas".` });
  };

  const downloadJSON = (data, filename) => {
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

  const filteredCommunityTemplates = communityTemplates.filter(temp => 
    temp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    temp.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    temp.targetObjective?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    temp.level?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };

  return (
    <div className="container py-10">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-12"
      >
        <Users className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient mb-4">
          Plantillas de la Comunidad
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explora plantillas de entrenamiento creadas y compartidas por la comunidad ProSportAi. ¡Encuentra inspiración y copia tus favoritas!
        </p>
      </motion.div>

      <Dialog open={isDetailViewOpen} onOpenChange={setIsDetailViewOpen}>
        <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh]">
          <TemplateDetailView template={viewingTemplate} />
        </DialogContent>
      </Dialog>

      <div className="mb-8">
        <Label htmlFor="search-community-templates" className="sr-only">Buscar plantillas de la comunidad</Label>
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="search-community-templates" type="text" placeholder="Buscar en plantillas de la comunidad..."
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>

      {filteredCommunityTemplates.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants} initial="hidden" animate="visible"
        >
          {filteredCommunityTemplates.map((template) => (
            <TemplateCard 
              key={template.id} 
              template={template}
              onEdit={() => toast({ title: "Acción no permitida", description: "Las plantillas de comunidad no se pueden editar directamente. Cópiala a tus plantillas para modificarla.", variant: "destructive"})}
              onDelete={() => toast({ title: "Acción no permitida", description: "Las plantillas de comunidad no se pueden eliminar.", variant: "destructive"})}
              onDownloadJSON={downloadJSON}
              onView={handleViewTemplate}
              isCommunityTemplate={true}
              onCopyToMyTemplates={handleCopyToMyTemplates}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-muted/30 rounded-lg"
        >
          <LayoutGrid className="mx-auto h-20 w-20 text-muted-foreground mb-6" />
          <h3 className="text-2xl font-semibold mb-3">No se encontraron plantillas</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            {searchTerm ? `No hay plantillas de comunidad que coincidan con "${searchTerm}".` : 'Parece que aún no hay plantillas aquí. ¡Vuelve pronto!'}
          </p>
        </motion.div>
      )}

      {currentUser && (currentUser.rol === 'entrenador' || currentUser.rol === 'admin') && (
        <div className="mt-12 text-center">
          <Button asChild>
            <Link to="/plantillas-entrenamiento">
              <Eye className="mr-2 h-4 w-4" /> Ver Mis Plantillas Personales
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommunityTemplatesPage;
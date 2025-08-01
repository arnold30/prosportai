import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { PlusCircle, Search, LayoutGrid, Users } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import TemplateForm from '@/components/training-templates/TemplateForm';
import TemplateCard from '@/components/training-templates/TemplateCard';
import TemplateDetailView from '@/components/training-templates/TemplateDetailView';
import { supabase } from '@/lib/supabaseClient';

// Función para generar un ID único
const generateNewId = () =>
  `template-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const PlantillasEntrenamientoPage = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [viewingTemplate, setViewingTemplate] = useState(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [templateFormData, setTemplateFormData] = useState({
    id: generateNewId(),
    name: '',
    description: '',
    targetObjective: '',
    level: '',
    durationDays: '7',
    daysPerWeek: '3',
    structure: [],
    isCommunity: false,
    user_id: '',
  });

  // 1) Cargar plantillas desde Supabase cuando cambia currentUser
  useEffect(() => {
    if (!currentUser?.id) return;

    const fetchPlantillas = async () => {
      const { data, error } = await supabase
        .from('plantillas')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: 'Error cargando plantillas',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }
      setTemplates(data);
    };

    fetchPlantillas();
  }, [currentUser, toast]);

  // 2) Crear o actualizar plantilla (desde el formulario manual)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = {
      ...templateFormData,
      id: editingTemplate?.id || generateNewId(),
      isCommunity: false,
      user_id: currentUser.id,
    };

    if (editingTemplate) {
      // Actualizar en Supabase
      const { error } = await supabase
        .from('plantillas')
        .update(finalData)
        .eq('id', editingTemplate.id);

      if (error) {
        toast({ title: 'Error al actualizar', description: error.message, variant: 'destructive' });
        return;
      }

      setTemplates((prev) =>
        prev.map((t) => (t.id === editingTemplate.id ? finalData : t))
      );
      toast({ title: 'Plantilla Actualizada', description: `La plantilla "${finalData.name}" ha sido actualizada.` });
    } else {
      // Insertar nueva plantilla en Supabase
      const { error } = await supabase.from('plantillas').insert([finalData]);
      if (error) {
        toast({ title: 'Error al guardar', description: error.message, variant: 'destructive' });
        return;
      }

      setTemplates((prev) => [finalData, ...prev]);
      toast({ title: 'Plantilla Creada', description: `La plantilla "${finalData.name}" ha sido creada.` });
    }

    setEditingTemplate(null);
    setTemplateFormData({
      id: generateNewId(),
      name: '',
      description: '',
      targetObjective: '',
      level: '',
      durationDays: '7',
      daysPerWeek: '3',
      structure: [],
      isCommunity: false,
      user_id: '',
    });
    setIsFormOpen(false);
  };

  // 3) Función para generar con IA usando tu BACKEND
  const handleGenerarConIA = async () => {
    const descripcion = prompt(
      "Describe el objetivo deportivo (por ejemplo: 'entrenamiento técnico para baloncesto sub-18, mejorar posición de pívot')"
    );
    if (!descripcion) return;

    try {
      // Llama a tu backend, no a OpenAI directo
      const response = await fetch('https://prosportai-production.up.railway.app/api/generar-plantilla', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: descripcion }),
      });

      if (!response.ok) throw new Error('Error llamando al backend');

      const plantillaGenerada = await response.json();

      // Añade datos obligatorios
      if (!plantillaGenerada.id) plantillaGenerada.id = generateNewId();
      plantillaGenerada.user_id = currentUser.id;
      plantillaGenerada.isCommunity = false;

      // Guarda en Supabase
      const { error } = await supabase.from('plantillas').insert([plantillaGenerada]);
      if (error) {
        toast({ title: 'Error guardando en Supabase', description: error.message, variant: 'destructive' });
        return;
      }

      setTemplates((prev) => [plantillaGenerada, ...prev]);
      toast({ title: 'Plantilla generada por IA', description: plantillaGenerada.name });
    } catch (err) {
      toast({ title: 'Error al generar plantilla', description: err.message, variant: 'destructive' });
    }
  };

  if (!currentUser || (currentUser.rol !== 'entrenador' && currentUser.rol !== 'admin')) {
    return <Navigate to="/panel-usuario" replace />;
  }

  // Filtrar según searchTerm
  const filteredTemplates = templates.filter((t) =>
    [t.name, t.description, t.targetObjective, t.level]
      .some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container py-10">
      {/* Título + Botones */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row justify-between items-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient mb-4 md:mb-0">
          Mis Plantillas de Entrenamiento
        </h1>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setEditingTemplate(null);
              setTemplateFormData({
                id: generateNewId(),
                name: '',
                description: '',
                targetObjective: '',
                level: '',
                durationDays: '7',
                daysPerWeek: '3',
                structure: [],
                isCommunity: false,
                user_id: '',
              });
              setIsFormOpen(true);
            }}
          >
            <PlusCircle className="mr-2 h-5 w-5" /> Crear Nueva Plantilla
          </Button>

          <Button variant="secondary" onClick={handleGenerarConIA}>
            🤖 Generar con IA
          </Button>

          <Button variant="outline" asChild>
            <Link to="/comunidad">
              <Users className="mr-2 h-4 w-4" /> Explorar Comunidad
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Modal Crear/Editar */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <TemplateForm
            templateFormData={templateFormData}
            handleInputChange={(e) =>
              setTemplateFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
            handleSelectChange={(name, value) =>
              setTemplateFormData((prev) => ({ ...prev, [name]: value }))
            }
            handleDaysPerWeekChange={(value) => {
              const numDays = parseInt(value) || 0;
              const newStructure = Array.from({ length: numDays }, (_, i) => ({
                name: `Día ${i + 1}`,
                exercises: [],
              }));
              setTemplateFormData((prev) => ({
                ...prev,
                daysPerWeek: value,
                structure: newStructure,
              }));
            }}
            handleUpdateDayData={(dayIndex, updatedDayData) => {
              setTemplateFormData((prev) => {
                const newStructure = [...(prev.structure || [])];
                newStructure[dayIndex] = updatedDayData;
                return { ...prev, structure: newStructure };
              });
            }}
            handleSubmit={handleSubmit}
            setIsFormOpen={setIsFormOpen}
            editingTemplate={editingTemplate}
          />
        </DialogContent>
      </Dialog>

      {/* Modal Vista Detalle */}
      <Dialog open={isDetailViewOpen} onOpenChange={setIsDetailViewOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <TemplateDetailView template={viewingTemplate} />
        </DialogContent>
      </Dialog>

      {/* Búsqueda */}
      <div className="mb-6">
        <Label htmlFor="search-templates" className="sr-only">
          Buscar plantillas
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="search-templates"
            type="text"
            placeholder="Buscar en mis plantillas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full md:w-1/2 lg:w-1/3"
          />
        </div>
      </div>

      {/* Listado de plantillas */}
      {filteredTemplates.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          animate="visible"
        >
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onEdit={(t) => {
                setEditingTemplate(t);
                setTemplateFormData(t);
                setIsFormOpen(true);
              }}
              onDelete={async (id) => {
                const { error } = await supabase.from('plantillas').delete().eq('id', id);
                if (error) {
                  toast({ title: 'Error al eliminar', description: error.message, variant: 'destructive' });
                  return;
                }
                setTemplates((prev) => prev.filter((x) => x.id !== id));
                toast({ title: 'Plantilla eliminada' });
              }}
              onDownloadJSON={(data, filename) => {
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const href = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = href;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                a.remove();
              }}
              onView={(template) => {
                setViewingTemplate(template);
                setIsDetailViewOpen(true);
              }}
            />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <LayoutGrid className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No tienes plantillas personales</h3>
          <p className="text-muted-foreground text-sm mb-4">
            {searchTerm
              ? `No hay resultados para "${searchTerm}".`
              : 'Crea una plantilla o genera una con IA.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default PlantillasEntrenamientoPage;

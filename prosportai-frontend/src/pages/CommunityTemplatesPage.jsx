import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Search, LayoutGrid, Users, Eye } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import TemplateCard from '@/components/training-templates/TemplateCard';
import TemplateDetailView from '@/components/training-templates/TemplateDetailView';

// ... communityTemplatesData, STORAGE_KEY_TEMPLATES, generateNewId ...

const CommunityTemplatesPage = () => {
  const { currentUser } = useAuth();
  const [communityTemplates, setCommunityTemplates] = useState(communityTemplatesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingTemplate, setViewingTemplate] = useState(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const { toast } = useToast();

  // ======= BLOQUEO DE ACCESO =======
  if (!currentUser) return <Navigate to="/login" replace />;
  if (!currentUser.membresiaActiva) return <Navigate to="/mi-cuenta" replace />;
  // Cambia 'membresiaActiva' por el campo que uses para controlar la membresía

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
              onEdit={() => toast({ title: "Acción no permitida", description: "Las plantillas de comunidad no se pueden editar directamente. Cópiala a tus plantillas para modificarla.", variant: "destructive" })}
              onDelete={() => toast({ title: "Acción no permitida", description: "Las plantillas de comunidad no se pueden eliminar.", variant: "destructive" })}
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

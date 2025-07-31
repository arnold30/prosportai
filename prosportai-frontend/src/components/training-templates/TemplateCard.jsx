import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit3, Trash2, FileText, FileJson, Eye, Copy, Share2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const itemVariants = { hidden: { y: 15, opacity: 0 }, visible: { y: 0, opacity: 1 } };

const TemplateCard = ({
  template,
  onEdit,
  onDelete,
  onDownloadJSON,
  onView,
  isCommunityTemplate = false,
  onCopyToMyTemplates,
  onShare
}) => {
  const { toast } = useToast();

  return (
    <motion.div variants={itemVariants}>
      <Card
        className={`h-full flex flex-col hover:shadow-xl transition-all duration-300 border-primary/10 cursor-pointer group ${isCommunityTemplate ? 'border-accent/20' : 'border-primary/10'}`}
        onClick={() => onView(template)}
      >
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className={`text-lg leading-tight group-hover:text-primary transition-colors ${isCommunityTemplate ? 'text-accent-foreground group-hover:text-accent' : ''}`}>
              {template.name}
              {isCommunityTemplate && <span className="text-xs font-normal text-accent/80 ml-1">(Comunidad)</span>}
            </CardTitle>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
              template.level === 'Principiante' ? 'bg-green-100 text-green-700' :
              template.level === 'Intermedio' ? 'bg-blue-100 text-blue-700' :
              template.level === 'Avanzado' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {template.level || 'N/A'}
            </span>
          </div>
          <CardDescription className="text-xs">{template.targetObjective || 'N/A'} - {template.durationDays} días ({template.daysPerWeek}x semana)</CardDescription>
        </CardHeader>

        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {template.description || "Sin descripción detallada."}
          </p>
          <p className="text-xs mt-2 text-muted-foreground">
            Ejercicios definidos: {template.structure?.reduce((acc, day) => acc + (day.exercises?.length || 0), 0) || 0}
          </p>
        </CardContent>

        <CardFooter className="flex justify-between items-center pt-3">
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                onDownloadJSON(template, `${template.name.replace(/\s+/g, '_')}.json`);
              }}
              title="Descargar JSON"
            >
              <FileJson className="h-4 w-4 text-green-600" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                toast({ title: "Próximamente", description: "Descarga en PDF estará disponible pronto." });
              }}
              title="Descargar PDF (Próximamente)"
            >
              <FileText className="h-4 w-4 text-red-600" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 md:hidden"
              onClick={(e) => {
                e.stopPropagation();
                onView(template);
              }}
              title="Ver Detalles"
            >
              <Eye className="h-4 w-4 text-blue-600" />
            </Button>
          </div>

          <div className="flex gap-2">
            {isCommunityTemplate ? (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onCopyToMyTemplates(template);
                }}
                className="border-accent text-accent hover:bg-accent/10 hover:text-accent"
              >
                <Copy className="mr-1 h-3 w-3" /> Copiar
              </Button>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(template); }}>
                  <Edit3 className="mr-1 h-3 w-3" /> Editar
                </Button>
                <Button variant="destructive" size="sm" onClick={(e) => { e.stopPropagation(); onDelete(template.id); }}>
                  <Trash2 className="mr-1 h-3 w-3" /> Eliminar
                </Button>
                {!template.is_community && onShare && (
                  <Button variant="secondary" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    onShare(template.id);
                  }}>
                    <Share2 className="mr-1 h-3 w-3" /> Compartir
                  </Button>
                )}
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TemplateCard;

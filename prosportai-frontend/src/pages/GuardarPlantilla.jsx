import { useState } from "react";
import { supabase } from "../../prosportai-supabase-frontend/src/lib/supabaseClient";

export default function GuardarPlantilla() {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    objetivo: "",
    nivel: "",
    dias: 3,
    is_community: false,
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { data: sessionData, error: userError } = await supabase.auth.getUser();

  if (userError || !sessionData?.user?.id) {
    toast({
      title: "Error de sesión",
      description: "Usuario no autenticado.",
      variant: "destructive"
    });
    return;
  }

  const validatedStructure = Array.isArray(templateFormData.structure)
    ? templateFormData.structure.map((day, index) => ({
        name: day.name || `Día ${index + 1}`,
        exercises: Array.isArray(day.exercises) ? day.exercises : []
      }))
    : getDefaultStructure(templateFormData.daysPerWeek);

  const plantilla = {
    user_id: sessionData.user.id,
    nombre: templateFormData.name,
    descripcion: templateFormData.description,
    objetivo: templateFormData.targetObjective,
    nivel: templateFormData.level,
    dias: parseInt(templateFormData.daysPerWeek),
    estructura: validatedStructure,
    is_community: templateFormData.isCommunity || false,
  };

  const { error } = await supabase.from('plantillas').insert([plantilla]);

  if (error) {
    toast({
      title: "Error al guardar",
      description: error.message,
      variant: "destructive"
    });
  } else {
    toast({
      title: "Plantilla Guardada",
      description: `La plantilla "${templateFormData.name}" ha sido guardada en Supabase.`
    });

    // Opcional: actualizar la UI con reload de plantillas desde Supabase
    setIsFormOpen(false);
    setTemplateFormData(initialFormState());
  }
}
};

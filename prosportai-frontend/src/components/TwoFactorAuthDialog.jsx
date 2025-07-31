import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ShieldCheck, Smartphone } from 'lucide-react';

const TwoFactorAuthDialog = ({ open, onOpenChange, onVerify }) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulación de verificación
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (code === "123456") { // Código de demostración
      toast({
        title: "¡2FA Activada!",
        description: "La autenticación de dos factores se ha configurado correctamente.",
        action: <ShieldCheck className="text-green-500" />
      });
      onVerify(true); // Indica éxito
      onOpenChange(false); // Cierra el diálogo
    } else {
      toast({
        variant: "destructive",
        title: "Código Incorrecto",
        description: "El código de verificación no es válido. Inténtalo de nuevo.",
      });
      onVerify(false); // Indica fallo
    }
    setIsLoading(false);
    setCode('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Smartphone className="mr-2 h-6 w-6 text-primary" />
            Activar Autenticación de Dos Factores (2FA)
          </DialogTitle>
          <DialogDescription>
            Para mayor seguridad, ingresa el código de verificación que se mostraría en tu aplicación de autenticación. (Para esta demo, usa '123456')
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Código
              </Label>
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="_ _ _ _ _ _"
                className="col-span-3 tracking-[0.3em] text-center"
                maxLength={6}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Verificando..." : "Verificar y Activar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TwoFactorAuthDialog;
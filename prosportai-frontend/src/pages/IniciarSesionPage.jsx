import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { LogIn, ArrowLeft, Eye, EyeOff, CheckCircle, ShieldQuestion } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";


const TwoFactorAuthPromptDialog = ({ open, onOpenChange, onVerify2FA, email }) => {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    await onVerify2FA(code);
    setIsVerifying(false);
    setCode('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <ShieldQuestion className="mr-2 h-6 w-6 text-primary" />
            Verificación de Dos Factores
          </DialogTitle>
          <DialogDescription>
            Se requiere un código de autenticación para la cuenta {email}. Ingresa el código de tu aplicación de autenticación. (Demo: 123456)
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="2fa-code" className="text-right">
                Código
              </Label>
              <Input
                id="2fa-code"
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
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isVerifying}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isVerifying}>
              {isVerifying ? "Verificando..." : "Verificar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};


const IniciarSesionPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [show2FAPrompt, setShow2FAPrompt] = useState(false);
  const [userFor2FA, setUserFor2FA] = useState(null);

  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSuccessfulLogin = (user) => {
    login(user);
    toast({
      title: "¡Inicio de Sesión Exitoso!",
      description: `Bienvenido de nuevo, ${user.nombre}.`,
      action: <CheckCircle className="text-green-500" />
    });
    
    if (user.rol === "entrenador") navigate("/entrenadores");
    else if (user.rol === "club") navigate("/clubes");
    else if (user.rol === "atleta") navigate("/atletas");
    else navigate("/");
  };

  const handleVerify2FA = async (code) => {
    if (code === "123456") { // Código de demostración para 2FA
      setShow2FAPrompt(false);
      handleSuccessfulLogin(userFor2FA);
    } else {
      toast({
        variant: "destructive",
        title: "Código 2FA Incorrecto",
        description: "El código de verificación no es válido. Inténtalo de nuevo.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay de red

      const users = JSON.parse(localStorage.getItem("prosportai_users")) || [];
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        if (user.is2FAEnabled) {
          setUserFor2FA(user);
          setShow2FAPrompt(true);
        } else {
          handleSuccessfulLogin(user);
        }
      } else {
        toast({
          variant: "destructive",
          title: "Error de Autenticación",
          description: "Correo electrónico o contraseña incorrectos.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error Inesperado",
        description: "Ocurrió un problema. Inténtalo de nuevo.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/3 hero-pattern opacity-30 z-0"></div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="z-10"
        >
          <Button variant="ghost" asChild className="absolute top-6 left-6 text-sm">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Inicio
            </Link>
          </Button>
          <Card className="w-full max-w-md shadow-2xl border-primary/20 bg-card/90 backdrop-blur-sm">
            <CardHeader className="text-center">
              <LogIn className="mx-auto h-12 w-12 text-primary mb-3" />
              <CardTitle className="text-3xl font-bold tracking-tight">Iniciar Sesión en ProSportAi</CardTitle>
              <CardDescription className="text-md">
                Accede a tu panel de control personalizado.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email-login">Correo Electrónico</Label>
                  <Input
                    id="email-login"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="tu@ejemplo.com"
                    className="mt-1"
                  />
                </div>
                <div className="relative">
                  <Label htmlFor="password-login">Contraseña</Label>
                  <Input
                    id="password-login"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Tu contraseña"
                    className="mt-1 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-7 h-7 w-7 text-muted-foreground hover:text-primary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="flex items-center justify-end text-sm">
                  <Button variant="link" asChild className="p-0 h-auto font-normal">
                    <Link to="/recuperar-contrasena">¿Olvidaste tu contraseña?</Link>
                  </Button>
                </div>
                <Button type="submit" className="w-full text-lg py-6" disabled={isLoading}>
                  {isLoading ? "Iniciando sesión..." : "Entrar"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center text-sm">
              <p className="text-muted-foreground">
                ¿Aún no tienes una cuenta?{" "}
                <Button variant="link" asChild className="p-0 h-auto font-semibold">
                  <Link to="/registro">Regístrate Gratis Aquí</Link>
                </Button>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
      {userFor2FA && (
        <TwoFactorAuthPromptDialog
          open={show2FAPrompt}
          onOpenChange={setShow2FAPrompt}
          onVerify2FA={handleVerify2FA}
          email={userFor2FA.email}
        />
      )}
    </>
  );
};

export default IniciarSesionPage;
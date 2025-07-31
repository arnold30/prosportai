import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { UserPlus, ArrowLeft, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const RegistroPage = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rol, setRol] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { register: registerAuthUser } = useAuth(); // Renombrado para evitar confusión

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error de Contraseña",
        description: "Las contraseñas no coinciden. Por favor, verifica.",
      });
      return;
    }
    if (!rol) {
      toast({
        variant: "destructive",
        title: "Error de Registro",
        description: "Por favor, selecciona un rol.",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simular una llamada a API para registrar al usuario
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newUser = { nombre, email, password, rol, id: Date.now().toString() }; // Añadir id único

      // Guardar en localStorage (simulación de base de datos)
      const users = JSON.parse(localStorage.getItem("prosportai_users")) || [];
      const existingUser = users.find(u => u.email === email);

      if (existingUser) {
        toast({
          variant: "destructive",
          title: "Error de Registro",
          description: "Este correo electrónico ya está registrado.",
        });
        setIsLoading(false);
        return;
      }
      
      users.push(newUser);
      localStorage.setItem("prosportai_users", JSON.stringify(users));

      // Loguear al usuario recién registrado usando el contexto
      registerAuthUser(newUser);

      toast({
        title: "¡Registro Exitoso!",
        description: `Bienvenido a ProSportAi, ${nombre}. Tu cuenta ha sido creada.`,
        action: (
          <CheckCircle className="text-green-500" />
        )
      });

      // Redirigir según el rol
      if (rol === "entrenador") {
        navigate("/entrenadores");
      } else if (rol === "club") {
        navigate("/clubes");
      } else if (rol === "atleta") {
        navigate("/atletas");
      } else {
        navigate("/");
      }

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error Inesperado",
        description: "Ocurrió un problema durante el registro. Inténtalo de nuevo.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
        <Card className="w-full max-w-lg shadow-2xl border-primary/20 bg-card/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <UserPlus className="mx-auto h-12 w-12 text-primary mb-3" />
            <CardTitle className="text-3xl font-bold tracking-tight">Crea tu Cuenta en ProSportAi</CardTitle>
            <CardDescription className="text-md">
              Únete a la revolución del entrenamiento deportivo inteligente.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="nombre">Nombre Completo</Label>
                <Input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  placeholder="Tu nombre y apellido"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="tu@ejemplo.com"
                  className="mt-1"
                />
              </div>
              <div className="relative">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Crea una contraseña segura"
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
              <div className="relative">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Repite tu contraseña"
                  className="mt-1 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-7 h-7 w-7 text-muted-foreground hover:text-primary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <div>
                <Label htmlFor="rol">Soy un...</Label>
                <Select value={rol} onValueChange={setRol}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Selecciona tu rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entrenador">Entrenador</SelectItem>
                    <SelectItem value="atleta">Atleta</SelectItem>
                    <SelectItem value="club">Club / Organización</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full text-lg py-6" disabled={isLoading}>
                {isLoading ? "Creando cuenta..." : "Registrarme Gratis"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center text-sm">
            <p className="text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <Button variant="link" asChild className="p-0 h-auto font-semibold">
                <Link to="/iniciar-sesion">Inicia Sesión Aquí</Link>
              </Button>
            </p>
            <p className="mt-3 text-xs text-muted-foreground text-center">
              Al registrarte, aceptas nuestros{" "}
              <Link to="/terminos" className="underline hover:text-primary">Términos de Servicio</Link> y 
              <Link to="/privacidad" className="underline hover:text-primary"> Política de Privacidad</Link>.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegistroPage;
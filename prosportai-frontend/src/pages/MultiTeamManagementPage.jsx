import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { PlusCircle, Edit3, Trash2, Users, BarChart, CalendarDays, Search } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const initialTeams = [
  { id: 'team1', name: 'Equipo Juvenil A', category: 'Juvenil', sport: 'Fútbol', coach: 'Carlos Pérez', players: 22, status: 'Activo' },
  { id: 'team2', name: 'Equipo Senior Femenino', category: 'Senior', sport: 'Baloncesto', coach: 'Laura Gómez', players: 15, status: 'Activo' },
  { id: 'team3', name: 'Cadetes B', category: 'Cadete', sport: 'Fútbol', coach: 'Miguel Rodríguez', players: 18, status: 'En planificación' },
  { id: 'team4', name: 'Infantil A Voleibol', category: 'Infantil', sport: 'Voleibol', coach: 'Ana Torres', players: 12, status: 'Activo' },
];

const MultiTeamManagementPage = () => {
  const [teams, setTeams] = useState(initialTeams);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [teamFormData, setTeamFormData] = useState({ name: '', category: '', sport: '', coach: '', players: '' });
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeamFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setTeamFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTeam) {
      setTeams(teams.map(team => team.id === editingTeam.id ? { ...editingTeam, ...teamFormData, players: parseInt(teamFormData.players) } : team));
      toast({ title: "Equipo Actualizado", description: `El equipo "${teamFormData.name}" ha sido actualizado.` });
    } else {
      const newTeam = { id: `team${Date.now()}`, ...teamFormData, players: parseInt(teamFormData.players), status: 'Activo' };
      setTeams([...teams, newTeam]);
      toast({ title: "Equipo Creado", description: `El equipo "${teamFormData.name}" ha sido creado.` });
    }
    setEditingTeam(null);
    setTeamFormData({ name: '', category: '', sport: '', coach: '', players: '' });
    setIsFormOpen(false);
  };

  const handleEdit = (team) => {
    setEditingTeam(team);
    setTeamFormData({ name: team.name, category: team.category, sport: team.sport, coach: team.coach, players: team.players.toString() });
    setIsFormOpen(true);
  };

  const handleDelete = (teamId) => {
    const teamToDelete = teams.find(team => team.id === teamId);
    setTeams(teams.filter(team => team.id !== teamId));
    toast({ title: "Equipo Eliminado", description: `El equipo "${teamToDelete?.name}" ha sido eliminado.`, variant: "destructive" });
  };
  
  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.coach.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="container py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-center mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient mb-4 md:mb-0">
          Gestión Multiequipo
        </h1>
        <div className="flex gap-2">
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingTeam(null); setTeamFormData({ name: '', category: '', sport: '', coach: '', players: '' }); }}>
                <PlusCircle className="mr-2 h-5 w-5" /> Añadir Nuevo Equipo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
              <DialogHeader>
                <DialogTitle>{editingTeam ? 'Editar Equipo' : 'Añadir Nuevo Equipo'}</DialogTitle>
                <DialogDescription>
                  {editingTeam ? 'Actualiza los detalles de este equipo.' : 'Introduce los detalles del nuevo equipo.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Nombre</Label>
                  <Input id="name" name="name" value={teamFormData.name} onChange={handleInputChange} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">Categoría</Label>
                  <Select name="category" onValueChange={(value) => handleSelectChange('category', value)} value={teamFormData.category}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecciona categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Infantil">Infantil</SelectItem>
                      <SelectItem value="Cadete">Cadete</SelectItem>
                      <SelectItem value="Juvenil">Juvenil</SelectItem>
                      <SelectItem value="Senior">Senior</SelectItem>
                      <SelectItem value="Amateur">Amateur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sport" className="text-right">Deporte</Label>
                   <Select name="sport" onValueChange={(value) => handleSelectChange('sport', value)} value={teamFormData.sport}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecciona deporte" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fútbol">Fútbol</SelectItem>
                      <SelectItem value="Baloncesto">Baloncesto</SelectItem>
                      <SelectItem value="Voleibol">Voleibol</SelectItem>
                      <SelectItem value="Balonmano">Balonmano</SelectItem>
                      <SelectItem value="Hockey">Hockey</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="coach" className="text-right">Entrenador</Label>
                  <Input id="coach" name="coach" value={teamFormData.coach} onChange={handleInputChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="players" className="text-right">Jugadores</Label>
                  <Input id="players" name="players" type="number" value={teamFormData.players} onChange={handleInputChange} className="col-span-3" min="1" />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancelar</Button>
                  <Button type="submit">{editingTeam ? 'Guardar Cambios' : 'Crear Equipo'}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      <div className="mb-8">
        <Label htmlFor="search-teams" className="sr-only">Buscar equipos</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="search-teams"
            type="text"
            placeholder="Buscar por nombre, categoría, deporte o entrenador..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full md:w-1/2"
          />
        </div>
      </div>

      {filteredTeams.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredTeams.map((team) => (
            <motion.div key={team.id} variants={itemVariants}>
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 border-primary/10">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{team.name}</CardTitle>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${team.status === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {team.status}
                    </span>
                  </div>
                  <CardDescription>{team.sport} - {team.category}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-primary" />
                      <span>{team.players} Jugadores</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-primary" /> {/* Consider different icon for coach */}
                      <span>Entrenador: {team.coach}</span>
                    </div>
                    <div className="flex items-center">
                      <BarChart className="mr-2 h-4 w-4 text-primary" />
                      <span>Ver Estadísticas</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarDays className="mr-2 h-4 w-4 text-primary" />
                      <span>Calendario del Equipo</span>
                    </div>
                  </div>
                </CardContent>
                <div className="p-4 pt-0 flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(team)}>
                    <Edit3 className="mr-1 h-4 w-4" /> Editar
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(team.id)}>
                    <Trash2 className="mr-1 h-4 w-4" /> Eliminar
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <Users className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No se encontraron equipos</h2>
          <p className="text-muted-foreground">
            {searchTerm ? `No hay equipos que coincidan con "${searchTerm}". Intenta con otra búsqueda.` : 'Aún no has añadido ningún equipo. ¡Empieza creando uno!'}
          </p>
          {!searchTerm && (
             <Button onClick={() => setIsFormOpen(true)} className="mt-6">
                <PlusCircle className="mr-2 h-5 w-5" /> Añadir Primer Equipo
              </Button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default MultiTeamManagementPage;
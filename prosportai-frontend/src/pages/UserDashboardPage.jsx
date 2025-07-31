
import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CalendarDays, Dumbbell, User, Settings } from 'lucide-react';
import TemplateDetailView from '@/components/training-templates/TemplateDetailView';

import OverviewTab from '@/components/dashboard/tabs/OverviewTab';
import TrainingTab from '@/components/dashboard/tabs/TrainingTab';
import ProfileTab from '@/components/dashboard/tabs/ProfileTab';
import SettingsTab from '@/components/dashboard/tabs/SettingsTab';

const UserDashboardPage = () => {
  const { currentUser, loading, updateUser } = useAuth();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("overview");
  const [viewingTemplate, setViewingTemplate] = useState(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Cargando panel...</p></div>;
  }

  if (!currentUser) {
    return <Navigate to="/iniciar-sesion" replace />;
  }
  
  const userWithDetails = { 
    ...currentUser, 
    plan: currentUser.plan || 'Pro',
    renewalDate: currentUser.renewalDate || 'N/A',
    stats: currentUser.stats || {
      hoursTrainedWeekly: '8.5h',
      personalBest5k: '22:30 min',
      consistency: '92%',
      activeAthletes: currentUser.rol === 'entrenador' ? '15' : undefined,
      avgCompliance: currentUser.rol === 'entrenador' ? '88%' : undefined,
      sessionsPlannedWeekly: currentUser.rol === 'entrenador' ? '45' : undefined,
      activeTeams: currentUser.rol === 'club' ? '12' : undefined,
      totalAthletes: currentUser.rol === 'club' ? '180' : undefined,
      overallPerformance: currentUser.rol === 'club' ? 'Positivo' : undefined,
    }
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const handleOpenTemplateDetails = (template) => {
    setViewingTemplate(template);
    setIsDetailViewOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container py-8 md:py-12"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <Avatar className="h-16 w-16 md:h-20 md:w-20 border-2 border-primary">
              <AvatarImage src={`https://avatar.vercel.sh/${currentUser.email}.png?key=${Date.now()}`} alt={currentUser.nombre} />
              <AvatarFallback className="text-2xl bg-primary/20 text-primary">
                {currentUser.nombre?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Bienvenido de nuevo, <span className="text-gradient">{currentUser.nombre}!</span>
              </h1>
              <p className="text-muted-foreground capitalize">{currentUser.rol}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => handleTabChange('settings')}>
            <Settings className="mr-2 h-4 w-4" />
            Configuración Rápida
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 bg-muted/60 p-1 h-auto">
            <TabsTrigger value="overview" className="py-2.5"><CalendarDays className="mr-2 h-4 w-4 sm:inline hidden" />Resumen</TabsTrigger>
            <TabsTrigger value="training" className="py-2.5"><Dumbbell className="mr-2 h-4 w-4 sm:inline hidden" />Entrenamiento</TabsTrigger>
            <TabsTrigger value="profile" className="py-2.5"><User className="mr-2 h-4 w-4 sm:inline hidden" />Perfil</TabsTrigger>
            <TabsTrigger value="settings" className="py-2.5"><Settings className="mr-2 h-4 w-4 sm:inline hidden" />Ajustes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab userWithDetails={userWithDetails} onNavigateToTrainingTab={() => handleTabChange('training')} />
          </TabsContent>

          <TabsContent value="training">
            <TrainingTab onOpenTemplateDetails={handleOpenTemplateDetails} />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileTab currentUser={currentUser} onUpdateUser={updateUser} />
          </TabsContent>
          
          <TabsContent value="settings">
            <SettingsTab currentUser={currentUser} onUpdateUser={updateUser} />
          </TabsContent>
        </Tabs>
      </motion.div>

      <Dialog open={isDetailViewOpen} onOpenChange={setIsDetailViewOpen}>
        <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh]">
          <TemplateDetailView template={viewingTemplate} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDashboardPage;

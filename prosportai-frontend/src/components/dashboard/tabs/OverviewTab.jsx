import React from 'react';
import { motion } from 'framer-motion';
import TrainingPlanSummaryWidget from '@/components/dashboard/overview/TrainingPlanSummaryWidget';
import StatsWidget from '@/components/dashboard/overview/StatsWidget';
import MembershipWidget from '@/components/dashboard/overview/MembershipWidget';
import ActivityFeedWidget from '@/components/dashboard/overview/ActivityFeedWidget';
import NotificationsWidget from '@/components/dashboard/overview/NotificationsWidget';
import RecentMessagesWidget from '@/components/dashboard/overview/RecentMessagesWidget';

const OverviewTab = ({ userWithDetails, onNavigateToTrainingTab }) => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <TrainingPlanSummaryWidget user={userWithDetails} onNavigateToTrainingTab={onNavigateToTrainingTab} />
      <StatsWidget user={userWithDetails} />
      <MembershipWidget user={userWithDetails} />
      <ActivityFeedWidget />
      <NotificationsWidget />
      <RecentMessagesWidget />

      {/* NUEVO: Widget exclusivo para Pro */}
      {(userWithDetails.rol === "entrenador" || userWithDetails.rol === "club") && userWithDetails.plan === "Pro" && (
        <motion.div 
          className="bg-gradient-to-tr from-blue-100 via-purple-100 to-orange-100 rounded-xl p-6 shadow-lg flex flex-col justify-between"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span role="img" aria-label="Football Analysis" className="text-2xl">⚽</span>
              <span className="font-semibold text-lg">Análisis Avanzado de Jugadores</span>
            </div>
            <p className="text-sm mb-4 text-gray-600">
              Accede a la búsqueda dinámica y análisis IA de equipos y jugadores profesionales con datos reales.
            </p>
            <a
              href="/analisis-jugadores-ia"
              className="inline-block mt-2 px-4 py-2 bg-primary text-white rounded shadow hover:scale-105 transition"
            >
              Ir al Análisis IA
            </a>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default OverviewTab;

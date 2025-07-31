
import React from 'react';
import { motion } from 'framer-motion';
import SecuritySettings from '@/components/dashboard/settings/SecuritySettings';
import IntegrationsSettings from '@/components/dashboard/settings/IntegrationsSettings';

const SettingsTab = ({ currentUser, onUpdateUser }) => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <SecuritySettings user={currentUser} onUpdateUser={onUpdateUser} />
      <IntegrationsSettings />
    </motion.div>
  );
};

export default SettingsTab;


import React from 'react';
import { motion } from 'framer-motion';
import UserProfileSettings from '@/components/dashboard/profile/UserProfileSettings';
import PreferencesSettings from '@/components/dashboard/profile/PreferencesSettings';

const ProfileTab = ({ currentUser, onUpdateUser }) => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <UserProfileSettings user={currentUser} onUpdateUser={onUpdateUser} />
      <PreferencesSettings />
    </motion.div>
  );
};

export default ProfileTab;

import React from 'react';
import ChatAssistant from '@/components/ChatAssistant';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ChatAssistantPage = () => {
  const { t } = useTranslation();
  const initialSystemMessage = t('chat_assistant.initial_system_message_prosportai');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background py-12 md:py-16 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container text-center mb-8 md:mb-12 px-4"
      >
        <MessageSquare className="mx-auto h-16 w-16 text-primary mb-4 animate-bounce" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gradient mb-3">
          {t('chat_assistant_page.main_title')}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('chat_assistant_page.main_subtitle')}
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full px-4"
      >
        <ChatAssistant initialSystemMessage={initialSystemMessage} />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="container text-center mt-8 md:mt-12 px-4"
      >
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          {t('chat_assistant_page.disclaimer')}
        </p>
      </motion.div>
    </div>
  );
};
export default ChatAssistantPage;

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Zap, Navigation, LayoutDashboard, FileText, Users, Settings, LogIn, UserPlus, Languages, Info, LifeBuoy, BookOpen, Video, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const tutorialSections = [
  {
    icon: <Navigation size={32} className="text-primary" />,
    titleKey: "tutorial.navigation.title",
    descriptionKey: "tutorial.navigation.description",
    points: [
      { titleKey: "tutorial.navigation.header.title", textKey: "tutorial.navigation.header.text", icon: <Zap size={20} className="text-accent" /> },
      { titleKey: "tutorial.navigation.language.title", textKey: "tutorial.navigation.language.text", icon: <Languages size={20} className="text-accent" /> },
      { titleKey: "tutorial.navigation.user_menu.title", textKey: "tutorial.navigation.user_menu.text", icon: <Users size={20} className="text-accent" /> },
      { titleKey: "tutorial.navigation.footer.title", textKey: "tutorial.navigation.footer.text", icon: <Info size={20} className="text-accent" /> },
    ]
  },
  {
    icon: <LayoutDashboard size={32} className="text-primary" />,
    titleKey: "tutorial.dashboard.title",
    descriptionKey: "tutorial.dashboard.description",
    points: [
      { titleKey: "tutorial.dashboard.overview.title", textKey: "tutorial.dashboard.overview.text", icon: <LayoutDashboard size={20} className="text-accent" /> },
      { titleKey: "tutorial.dashboard.training.title", textKey: "tutorial.dashboard.training.text", icon: <FileText size={20} className="text-accent" /> },
      { titleKey: "tutorial.dashboard.profile.title", textKey: "tutorial.dashboard.profile.text", icon: <Users size={20} className="text-accent" /> },
      { titleKey: "tutorial.dashboard.settings.title", textKey: "tutorial.dashboard.settings.text", icon: <Settings size={20} className="text-accent" /> },
    ]
  },
  {
    icon: <FileText size={32} className="text-primary" />,
    titleKey: "tutorial.templates.title",
    descriptionKey: "tutorial.templates.description",
    points: [
      { titleKey: "tutorial.templates.access.title", textKey: "tutorial.templates.access.text", icon: <FileText size={20} className="text-accent" /> },
      { titleKey: "tutorial.templates.create.title", textKey: "tutorial.templates.create.text", icon: <UserPlus size={20} className="text-accent" /> },
      { titleKey: "tutorial.templates.view_edit.title", textKey: "tutorial.templates.view_edit.text", icon: <BookOpen size={20} className="text-accent" /> },
      { titleKey: "tutorial.templates.delete.title", textKey: "tutorial.templates.delete.text", icon: <Info size={20} className="text-accent" /> },
    ]
  },
   {
    icon: <LogIn size={32} className="text-primary" />,
    titleKey: "tutorial.auth.title",
    descriptionKey: "tutorial.auth.description",
    points: [
      { titleKey: "tutorial.auth.register.title", textKey: "tutorial.auth.register.text", icon: <UserPlus size={20} className="text-accent" /> },
      { titleKey: "tutorial.auth.login.title", textKey: "tutorial.auth.login.text", icon: <LogIn size={20} className="text-accent" /> },
      { titleKey: "tutorial.auth.logout.title", textKey: "tutorial.auth.logout.text", icon: <Users size={20} className="text-accent" /> },
    ]
  },
  {
    icon: <LifeBuoy size={32} className="text-primary" />,
    titleKey: "tutorial.support.title",
    descriptionKey: "tutorial.support.description",
    points: [
      { titleKey: "tutorial.support.faq.title", textKey: "tutorial.support.faq.text", icon: <BookOpen size={20} className="text-accent" /> },
      { titleKey: "tutorial.support.video.title", textKey: "tutorial.support.video.text", icon: <Video size={20} className="text-accent" /> },
      { titleKey: "tutorial.support.contact.title", textKey: "tutorial.support.contact.text", icon: <MessageCircle size={20} className="text-accent" /> },
    ]
  }
];

const TutorialPage = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container text-center mb-12 md:mb-16"
      >
        <Zap className="mx-auto h-16 w-16 text-primary mb-4 animate-float" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gradient mb-4">
          {t('tutorial.main_title')}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('tutorial.main_subtitle')}
        </p>
      </motion.div>

      <motion.div
        className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {tutorialSections.map((section, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="h-full shadow-xl hover:shadow-primary/20 transition-shadow duration-300 border-primary/10 flex flex-col">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  {section.icon}
                </div>
                <CardTitle className="text-2xl">{t(section.titleKey)}</CardTitle>
                <CardDescription className="text-base">{t(section.descriptionKey)}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4">
                  {section.points.map((point, pIndex) => (
                    <li key={pIndex} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className="flex-shrink-0 mt-1">{point.icon}</div>
                      <div>
                        <p className="font-semibold text-foreground">{t(point.titleKey)}</p>
                        <p className="text-sm text-muted-foreground">{t(point.textKey)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: tutorialSections.length * 0.1 + 0.5 }}
        className="container text-center mt-16"
      >
        <p className="text-lg text-muted-foreground mb-6">
          {t('tutorial.ready_to_start')}
        </p>
        <Button size="lg" asChild className="shadow-lg hover:shadow-primary/50 transition-shadow">
          <Link to="/panel-usuario">{t('tutorial.go_to_dashboard')}</Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default TutorialPage;

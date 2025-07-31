import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicyPage = () => {
  const { t } = useTranslation();

  const sections = [
    { titleKey: 'privacy_policy.introduction.title', contentKey: 'privacy_policy.introduction.content' },
    { titleKey: 'privacy_policy.data_collection.title', contentKey: 'privacy_policy.data_collection.content' },
    { titleKey: 'privacy_policy.data_use.title', contentKey: 'privacy_policy.data_use.content' },
    { titleKey: 'privacy_policy.data_sharing.title', contentKey: 'privacy_policy.data_sharing.content' },
    { titleKey: 'privacy_policy.data_security.title', contentKey: 'privacy_policy.data_security.content' },
    { titleKey: 'privacy_policy.cookies.title', contentKey: 'privacy_policy.cookies.content' },
    { titleKey: 'privacy_policy.user_rights.title', contentKey: 'privacy_policy.user_rights.content' },
    { titleKey: 'privacy_policy.childrens_privacy.title', contentKey: 'privacy_policy.childrens_privacy.content' },
    { titleKey: 'privacy_policy.changes.title', contentKey: 'privacy_policy.changes.content' },
    { titleKey: 'privacy_policy.contact.title', contentKey: 'privacy_policy.contact.content' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container text-center mb-12 md:mb-16"
      >
        <ShieldCheck className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gradient mb-4">
          {t('privacy_policy.main_title')}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('privacy_policy.main_subtitle')}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          {t('privacy_policy.last_updated', { date: new Date('2025-05-31').toLocaleDateString(t('privacy_policy.locale')) })}
        </p>
      </motion.div>

      <div className="container max-w-4xl">
        <Card className="shadow-xl border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <FileText className="mr-3 h-7 w-7 text-primary" />
              {t('privacy_policy.document_title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {sections.map((section, index) => (
              <motion.section
                key={section.titleKey}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                aria-labelledby={t(section.titleKey)}
              >
                <h2 id={t(section.titleKey)} className="text-2xl font-semibold text-primary mb-3">
                  {t(section.titleKey)}
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-4">
                  {t(section.contentKey).split('\n\n').map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              </motion.section>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
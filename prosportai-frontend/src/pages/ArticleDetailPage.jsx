import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { placeholderArticles } from '@/data/blogArticles';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CalendarDays, UserCircle, Tag, Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const article = placeholderArticles.find(art => art.slug === slug);

  if (!article) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">{t('blog.article_not_found_title')}</h1>
        <p className="text-muted-foreground mb-6">{t('blog.article_not_found_message')}</p>
        <Button asChild>
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> {t('blog.back_to_blog')}
          </Link>
        </Button>
      </div>
    );
  }

  const articleImage = article.imageKey === 'blog.article1.image' ? "https://images.unsplash.com/photo-1677694031058-95963b42a0b7" :
                       article.imageKey === 'blog.article2.image' ? "https://images.unsplash.com/photo-1543286386-71314a00d68b" :
                       article.imageKey === 'blog.article3.image' ? "https://images.unsplash.com/photo-1517836357463-d25dfeac3438" :
                       article.imageKey === 'blog.article4.image' ? "https://images.unsplash.com/photo-1560272564-c83b66b1ad12" :
                       article.imageKey === 'blog.article5.image' ? "https://images.unsplash.com/photo-1593479091093-65399f597a9d" :
                       article.imageKey === 'blog.article6.image' ? "https://images.unsplash.com/photo-1542744173-8e7e53415bb0" :
                       article.imageKey === 'blog.article7.image' ? "https://images.unsplash.com/photo-1500990017474-677872045090" :
                       "https://images.unsplash.com/photo-1508098682722-e99c43a406b2"; // Default image

  const formattedDate = new Date(article.date).toLocaleDateString(t('blog.locale'), {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const contentLines = t(article.contentKey, { returnObjects: true });
  const articleContent = Array.isArray(contentLines) ? contentLines.map((line, index) => <p key={index} className="mb-4 leading-relaxed">{line}</p>) : <p className="mb-4 leading-relaxed">{contentLines}</p>;


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container py-8 md:py-12 max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <Button variant="outline" asChild size="sm">
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> {t('blog.back_to_blog')}
          </Link>
        </Button>
      </div>

      <article>
        <header className="mb-8">
          <div className="mb-4">
            <Badge variant="secondary" className="text-sm">
              <Layers className="mr-1.5 h-4 w-4" />
              {t(article.categoryKey)}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gradient mb-4">
            {t(article.titleKey)}
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CalendarDays className="mr-1.5 h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <UserCircle className="mr-1.5 h-4 w-4" />
              <span>{t(article.authorKey)}</span>
            </div>
          </div>
        </header>

        <div className="aspect-video rounded-lg overflow-hidden mb-8 shadow-lg">
          <img 
            className="w-full h-full object-cover"
            alt={t(article.titleKey)}
           src="https://images.unsplash.com/photo-1441458834224-9b5d5a49dda3" />
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90">
          {articleContent}
        </div>

        <footer className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="mr-1 h-5 w-5 text-muted-foreground" />
            <span className="font-semibold text-muted-foreground">{t('blog.tags_label')}:</span>
            {article.tagsKeys.map(tagKey => (
              <Badge key={tagKey} variant="outline">{t(tagKey)}</Badge>
            ))}
          </div>
        </footer>
      </article>
    </motion.div>
  );
};

export default ArticleDetailPage;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Rss, Search, CalendarDays, UserCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { placeholderArticles } from '@/data/blogArticles'; // Importar desde el nuevo archivo

const ArticleCard = ({ article, t }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const articleImage = article.imageKey === 'blog.article1.image' ? "https://images.unsplash.com/photo-1677694031058-95963b42a0b7" :
                       article.imageKey === 'blog.article2.image' ? "https://images.unsplash.com/photo-1543286386-71314a00d68b" :
                       article.imageKey === 'blog.article3.image' ? "https://images.unsplash.com/photo-1517836357463-d25dfeac3438" :
                       article.imageKey === 'blog.article4.image' ? "https://images.unsplash.com/photo-1560272564-c83b66b1ad12" :
                       article.imageKey === 'blog.article5.image' ? "https://images.unsplash.com/photo-1593479091093-65399f597a9d" :
                       article.imageKey === 'blog.article6.image' ? "https://images.unsplash.com/photo-1542744173-8e7e53415bb0" :
                       article.imageKey === 'blog.article7.image' ? "https://images.unsplash.com/photo-1500990017474-677872045090" :
                       "https://images.unsplash.com/photo-1508098682722-e99c43a406b2"; // Default image

  return (
    <motion.div variants={itemVariants}>
      <Card className="h-full shadow-xl hover:shadow-primary/20 transition-shadow duration-300 border-primary/10 flex flex-col overflow-hidden">
        <Link to={`/blog/${article.slug}`} className="aspect-video overflow-hidden block">
          <img   
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
            alt={t(article.titleKey)}
           src="https://images.unsplash.com/photo-1456339445756-beb5120afc42" />
        </Link>
        <CardHeader>
          <CardTitle className="text-xl lg:text-2xl leading-tight hover:text-primary transition-colors">
            <Link to={`/blog/${article.slug}`}>{t(article.titleKey)}</Link>
          </CardTitle>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
            <CalendarDays size={14} /> <span>{new Date(article.date).toLocaleDateString(t('blog.locale'), { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <UserCircle size={14} /> <span>{t(article.authorKey)}</span>
          </div>
          <div className="mt-1">
            <span className="text-xs font-semibold px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full">{t(article.categoryKey)}</span>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription className="text-sm leading-relaxed line-clamp-3">{t(article.summaryKey)}</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button variant="link" asChild className="p-0 h-auto">
            <Link to={`/blog/${article.slug}`}>{t('blog.read_more')}</Link>
          </Button>
          <div className="flex space-x-1">
            {article.tagsKeys.slice(0, 2).map(tagKey => (
              <span key={tagKey} className="text-xs px-1.5 py-0.5 bg-muted text-muted-foreground rounded">#{t(tagKey)}</span>
            ))}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};


const BlogPage = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setArticles(placeholderArticles);
  }, []);

  const categories = [
    { value: 'all', labelKey: 'blog.categories.all' },
    { value: 'blog.categories.ia_deporte', labelKey: 'blog.categories.ia_deporte' },
    { value: 'blog.categories.nutricion', labelKey: 'blog.categories.nutricion' },
    { value: 'blog.categories.salud_bienestar', labelKey: 'blog.categories.salud_bienestar' },
    { value: 'blog.categories.gestion_equipos', labelKey: 'blog.categories.gestion_equipos' },
    { value: 'blog.categories.rendimiento_deportivo', labelKey: 'blog.categories.rendimiento_deportivo' },
  ];

  const filteredArticles = articles
    .filter(article => 
      selectedCategory === 'all' || article.categoryKey === selectedCategory
    )
    .filter(article => 
      t(article.titleKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
      t(article.summaryKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tagsKeys.some(tagKey => t(tagKey).toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container text-center mb-12 md:mb-16"
      >
        <Rss className="mx-auto h-16 w-16 text-primary mb-4 animate-pulse" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gradient mb-4">
          {t('blog.main_title')}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('blog.main_subtitle')}
        </p>
      </motion.div>

      <div className="container mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row gap-4 items-center p-4 bg-muted/70 rounded-lg shadow">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder={t('blog.search_placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[240px]">
              <SelectValue placeholder={t('blog.filter_category')} />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>{t(cat.labelKey)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredArticles.length > 0 ? (
        <motion.div
          className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredArticles.map(article => (
            <ArticleCard key={article.id} article={article} t={t} />
          ))}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="container text-center py-16"
        >
          <Search className="mx-auto h-20 w-20 text-muted-foreground mb-6" />
          <h2 className="text-2xl font-semibold mb-3">{t('blog.no_articles_found_title')}</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            {searchTerm || selectedCategory !== 'all' ? t('blog.no_articles_criteria') : t('blog.no_articles_yet')}
          </p>
        </motion.div>
      )}

      {/* Placeholder para paginación futura */}
      {/* {filteredArticles.length > 0 && (
        <div className="container mt-12 md:mt-16 flex justify-center">
          <Button variant="outline" className="mr-2" disabled>{t('blog.previous_page')}</Button>
          <Button variant="outline" disabled>{t('blog.next_page')}</Button>
        </div>
      )} */}
    </div>
  );
};

export default BlogPage;
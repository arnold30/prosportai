import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation, Trans } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuTrigger, 
  NavigationMenuContent,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Menu, X, Globe, UserCircle, LogOut, LayoutDashboard, FileSpreadsheet, Zap, Rss, MessageSquare } from "lucide-react"; 
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const languages = [
  { code: "es", name: "Español" },
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "pt", name: "Português" },
  { code: "no", name: "Norsk" },
  { code: "da", name: "Dansk" },
  { code: "sv", name: "Svenska" },
];

const Logo = () => (
  <div className="flex items-center">
    <Zap className="h-7 w-7 text-primary" />
    <span className="ml-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
      ProSportAi
    </span>
  </div>
);


const Header = () => {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const changeLanguageHandler = (langCode) => {
    i18n.changeLanguage(langCode);
  };

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  const navLinks = [
    { to: "/entrenadores", textKey: "header.coaches" },
    { to: "/clubes", textKey: "header.clubs" },
    { to: "/atletas", textKey: "header.athletes" },
    { to: "/asistente-ia", textKey: "header.ai_assistant_nav" }, // Nuevo enlace
  ];

  const resourceLinks = [
    { href: "/documentacion", titleKey: "header.documentation", descriptionKey: "header.documentation_desc", icon: <FileSpreadsheet className="h-5 w-5 text-primary" /> },
    { href: "/tutorial", titleKey: "header.tutorials", descriptionKey: "header.tutorials_desc", icon: <Zap className="h-5 w-5 text-primary" /> },
    { href: "/blog", titleKey: "header.blog", descriptionKey: "header.blog_desc", icon: <Rss className="h-5 w-5 text-primary" /> },
    { href: "/comunidad", titleKey: "header.community", descriptionKey: "header.community_desc", icon: <UserCircle className="h-5 w-5 text-primary" /> },
  ];

  const currentSelectedLanguage = languages.find(lang => lang.code === i18n.language) || languages.find(lang => lang.code === 'es');


  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.to}>
                  <Link to={link.to} className={navigationMenuTriggerStyle()}>
                    {t(link.textKey)}
                  </Link>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuTrigger>{t('header.resources')}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md"
                          to={resourceLinks[0].href}
                        >
                          <div className="flex items-center mb-2">
                            {resourceLinks[0].icon}
                            <div className="ml-2 text-lg font-medium text-white">
                              {t(resourceLinks[0].titleKey)}
                            </div>
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            {t(resourceLinks[0].descriptionKey)}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {resourceLinks.slice(1).map((link) => (
                       <li key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            to={link.href}
                          >
                            <div className="flex items-center">
                              {link.icon}
                              <div className="ml-2 text-sm font-medium leading-none">{t(link.titleKey)}</div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {t(link.descriptionKey)}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger aria-label={t('header.language_selector_aria')}>
                  <Globe className="h-4 w-4 mr-1" />
                  {currentSelectedLanguage.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-1 p-2">
                    {languages.map((lang) => (
                      <li key={lang.code}>
                        <button
                          onClick={() => changeLanguageHandler(lang.code)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-md text-sm",
                            i18n.language === lang.code 
                              ? "bg-primary text-primary-foreground" 
                              : "hover:bg-accent hover:text-accent-foreground"
                          )}
                        >
                          {lang.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <UserCircle className="h-5 w-5" />
                  <span>{currentUser.nombre}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{t('header.my_account')} ({currentUser.rol})</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/panel-usuario')}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  {t('header.my_panel')}
                </DropdownMenuItem>
                {(currentUser.rol === 'entrenador' || currentUser.rol === 'admin') && (
                  <DropdownMenuItem onClick={() => navigate('/plantillas-entrenamiento')}>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    {t('header.training_templates')}
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => navigate('/panel-usuario?tab=profile')}>
                  <UserCircle className="mr-2 h-4 w-4" />
                  {t('header.edit_profile')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:!text-red-600 hover:!bg-red-500/10">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('header.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link to="/iniciar-sesion">{t('header.login')}</Link>
              </Button>
              <Button asChild>
                <Link to="/registro">{t('header.register')}</Link>
              </Button>
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center">
           {currentUser && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <UserCircle className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                 <DropdownMenuLabel>{t('header.my_account')} ({currentUser.rol})</DropdownMenuLabel>
                <DropdownMenuSeparator />
                 <DropdownMenuItem onClick={() => {navigate('/panel-usuario'); setMobileMenuOpen(false);}}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  {t('header.my_panel')}
                </DropdownMenuItem>
                {(currentUser.rol === 'entrenador' || currentUser.rol === 'admin') && (
                  <DropdownMenuItem onClick={() => {navigate('/plantillas-entrenamiento'); setMobileMenuOpen(false);}}>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    {t('header.training_templates')}
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => {navigate('/panel-usuario?tab=profile'); setMobileMenuOpen(false);}}>
                  <UserCircle className="mr-2 h-4 w-4" />
                  {t('header.edit_profile')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {handleLogout(); setMobileMenuOpen(false);}} className="text-red-600 hover:!text-red-600 hover:!bg-red-500/10">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('header.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                 <Link 
                  key={link.to}
                  to={link.to} 
                  className="px-3 py-2 text-base rounded-md hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(link.textKey)}
                </Link>
              ))}
              <NavigationMenu orientation="vertical" className="w-full">
                <NavigationMenuList className="flex-col items-start w-full">
                  <NavigationMenuItem className="w-full">
                    <NavigationMenuTrigger className="w-full justify-start px-3 py-2 text-base">{t('header.resources')}</NavigationMenuTrigger>
                    <NavigationMenuContent className="w-full p-2 space-y-1">
                      {resourceLinks.map((link) => (
                        <NavigationMenuLink key={link.href} asChild>
                          <Link 
                            to={link.href} 
                            className="block px-3 py-2 text-sm rounded-md hover:bg-accent"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <div className="flex items-center font-medium">
                              {link.icon}
                              <span className="ml-2">{t(link.titleKey)}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{t(link.descriptionKey)}</p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                   <NavigationMenuItem className="w-full">
                    <NavigationMenuTrigger className="w-full justify-start px-3 py-2 text-base" aria-label={t('header.language_selector_aria')}>
                       <Globe className="h-4 w-4 mr-2" />
                      {currentSelectedLanguage.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-full p-2 space-y-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            changeLanguageHandler(lang.code);
                          }}
                           className={cn(
                            "w-full text-left px-3 py-2 rounded-md text-sm",
                            i18n.language === lang.code 
                              ? "bg-primary text-primary-foreground" 
                              : "hover:bg-accent hover:text-accent-foreground"
                          )}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
            
            {!currentUser && (
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/iniciar-sesion" onClick={() => setMobileMenuOpen(false)}>
                    {t('header.login')}
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/registro" onClick={() => setMobileMenuOpen(false)}>
                    {t('header.register')}
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
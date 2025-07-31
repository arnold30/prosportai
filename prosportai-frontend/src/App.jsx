import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import EntrenadoresPage from "@/pages/EntrenadoresPage";
import ClubesPage from "@/pages/ClubesPage";
import AtletasPage from "@/pages/AtletasPage";
import MultiTeamManagementPage from "@/pages/MultiTeamManagementPage";
import DemoEntrenadoresPage from "@/pages/DemoEntrenadoresPage";
import RegistroPage from "@/pages/RegistroPage";
import IniciarSesionPage from "@/pages/IniciarSesionPage";
import UserDashboardPage from "@/pages/UserDashboardPage";
import GestionSuscripcionPage from "@/pages/GestionSuscripcionPage";
import PlantillasEntrenamientoPage from "@/pages/PlantillasEntrenamientoPage";
import TutorialPage from "@/pages/TutorialPage";
import BlogPage from "@/pages/BlogPage";
import ArticleDetailPage from "@/pages/ArticleDetailPage"; // Nueva importación
import ChatAssistantPage from "@/pages/ChatAssistantPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import SalesContactPage from "@/pages/SalesContactPage";
import CommunityTemplatesPage from "@/pages/CommunityTemplatesPage";
import { AuthProvider } from "@/contexts/AuthContext";
import AnalisisJugadoresIA from "./pages/AnalisisJugadoresIA";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/entrenadores" element={<EntrenadoresPage />} />
              <Route path="/clubes" element={<ClubesPage />} />
              <Route path="/atletas" element={<AtletasPage />} />
              <Route path="/gestion-multiequipo" element={<MultiTeamManagementPage />} />
              <Route path="/demo-entrenadores" element={<DemoEntrenadoresPage />} />
              <Route path="/registro" element={<RegistroPage />} />
              <Route path="/iniciar-sesion" element={<IniciarSesionPage />} />
              <Route path="/panel-usuario" element={<UserDashboardPage />} />
              <Route path="/gestion-suscripcion" element={<GestionSuscripcionPage />} />
              <Route path="/plantillas-entrenamiento" element={<PlantillasEntrenamientoPage />} />
              <Route path="/tutorial" element={<TutorialPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<ArticleDetailPage />} /> {/* Nueva ruta dinámica */}
              <Route path="/asistente-ia" element={<ChatAssistantPage />} />
              <Route path="/politica-privacidad" element={<PrivacyPolicyPage />} />
              <Route path="/contacto-ventas" element={<SalesContactPage />} />
              <Route path="/comunidad" element={<CommunityTemplatesPage />} />
              <Route path="/analisis-jugadores-ia" element={<AnalisisJugadoresIA />} />

              {/* Otras rutas se agregarán según sea necesario */}
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
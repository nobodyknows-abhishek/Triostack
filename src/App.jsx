import React, { useState, useEffect, Suspense, lazy } from "react";
import Lenis from "lenis";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollBackground from "./components/ScrollBackground";
import ScrollToTop from "./components/ScrollToTop";

// Lazy-loaded routes for code splitting
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const Team = lazy(() => import("./pages/Team"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-light border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  if (!user) return <Navigate to="/admin/login" />;
  return children;
};

// Reusable Loader Component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center pt-24 pb-20">
    <div className="w-12 h-12 border-4 border-primary-light/30 border-t-primary-light rounded-full animate-spin"></div>
  </div>
);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <ErrorBoundary>
            <div className="min-h-screen transition-colors duration-300 dark:bg-dark bg-slate-50 text-slate-900 dark:text-slate-200 relative overflow-x-hidden">
              <ScrollBackground />
              <Navbar />
              <main>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route
                      path="/admin/dashboard/*"
                      element={
                        <ProtectedRoute>
                          <AdminDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </ErrorBoundary>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

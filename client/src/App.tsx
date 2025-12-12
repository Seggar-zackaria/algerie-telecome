import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Lazy load pages
const LandingPage = lazy(() => import("@/pages/LandingPage").then(module => ({ default: module.LandingPage })));
const NotFound = lazy(() => import("@/pages/NotFound").then(module => ({ default: module.NotFound })));
const ServerError = lazy(() => import("@/pages/ServerError").then(module => ({ default: module.ServerError })));
const AdminLayout = lazy(() => import("@/layouts/AdminLayout").then(module => ({ default: module.AdminLayout })));
const DashboardHome = lazy(() => import("@/pages/admin/DashboardHome").then(module => ({ default: module.DashboardHome })));
const HeroManagementPage = lazy(() => import("@/pages/admin/HeroManagementPage").then(module => ({ default: module.HeroManagementPage })));
const SignIn = lazy(() => import("@/pages/auth/SignIn").then(module => ({ default: module.SignIn })));
const RegistrationsPage = lazy(() => import("@/pages/admin/RegistrationsPage").then(module => ({ default: module.RegistrationsPage })));
const ContentPage = lazy(() => import("@/pages/admin/ContentPage").then(module => ({ default: module.ContentPage })));


function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="content" element={<ContentPage />} />
            <Route path="registrations" element={<RegistrationsPage />} />
            <Route path="hero" element={<HeroManagementPage />} />
          </Route>
          <Route path="/server-error" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AuthProvider>

  );
}

export default App;

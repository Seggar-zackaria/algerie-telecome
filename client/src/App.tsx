import { Routes, Route } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import { NotFound } from "@/pages/NotFound";
import { ServerError } from "@/pages/ServerError";
import { AdminLayout } from "@/layouts/AdminLayout";
import { DashboardHome } from "@/pages/admin/DashboardHome";
import { HeroManagementPage } from "@/pages/admin/HeroManagementPage";
import { SignIn } from "@/pages/auth/SignIn";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { RegistrationsPage } from "@/pages/admin/RegistrationsPage";
import { ContentPage } from "@/pages/admin/ContentPage";

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;

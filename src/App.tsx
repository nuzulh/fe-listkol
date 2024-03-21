import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoadingPage } from "@/components/loading";
import Aos from "aos";
import "aos/dist/aos.css";
import GuardLayout from './components/layouts/guard-layout';

const HomePage = lazy(() => import("@/pages/home.page"));
const LoginPage = lazy(() => import("@/pages/login.page"));
const RegisterPage = lazy(() => import("@/pages/register.page"));
const DashboardPage = lazy(() => import("@/pages/app/dashboard.page"));

export default function App() {
  useEffect(() => {
    Aos.init({
      easing: "ease-out-cubic",
      duration: 700,
      once: true,
    });
  }, []);

  return (
    <Suspense fallback={<LoadingPage />}>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route path="/app" element={<GuardLayout />}>
            <Route index element={<DashboardPage />} />
          </Route>
          <Route path="*" element={<div>not found</div>} />
        </Routes>
      </Router>
    </Suspense>
  );
}

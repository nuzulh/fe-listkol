import { LoadingPage } from "@/components/loading";
import BillingPage from '@/pages/app/billing.page';
import CampaignPage from '@/pages/app/campaign.page';
import CreatorPage from '@/pages/app/creator.page';
import Aos from "aos";
import "aos/dist/aos.css";
import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GuardLayout from './components/layouts/guard-layout';
import CampaignHistoryPage from './pages/app/campaign-history.page';

const HomePage = lazy(() => import("@/pages/home.page"));
const LoginPage = lazy(() => import("@/pages/login.page"));
const RegisterPage = lazy(() => import("@/pages/register.page"));

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
          </Route>
          <Route path='/auth' element={<GuardLayout />}>
            <Route index element={<Navigate to='login' />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route path="/app" element={<GuardLayout />}>
            <Route index element={<Navigate to='creator' />} />
            <Route path='creator' element={<CreatorPage />} />
            <Route path='campaign' element={<CampaignPage />} />
            <Route path='campaign-history' element={<CampaignHistoryPage />} />
            <Route path='billing' element={<BillingPage />} />
          </Route>
          <Route path="*" element={<div>not found</div>} />
        </Routes>
      </Router>
    </Suspense>
  );
}

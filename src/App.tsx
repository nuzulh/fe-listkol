import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoadingPage } from "@/components/loading";
import Aos from "aos";
import "aos/dist/aos.css";

const HomePage = lazy(() => import("@/pages/home.page"));

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
        </Routes>
      </Router>
    </Suspense>
  );
}

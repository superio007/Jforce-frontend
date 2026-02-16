import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
const HomePage = lazy(() => import("../pages/site/HomePage"));
const NotFound = lazy(() => import("../pages/site/NotFound"));
const SignPage = lazy(() => import("../pages/auth/SigninPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
import MainLayout from "../layouts/SiteLayout";
import AuthLayout from "../layouts/AuthLayout";
import FallbackLoader from "../components/UI/FallbackLoader.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route
          path="/signin"
          element={
            <Suspense fallback={<FallbackLoader />}>
              <SignPage />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<FallbackLoader />}>
              <RegisterPage />
            </Suspense>
          }
        />
      </Route>
      <Route path="/" element={<MainLayout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<FallbackLoader />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<FallbackLoader />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

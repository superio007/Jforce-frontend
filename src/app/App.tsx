import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
const HomePage = lazy(() => import("../pages/site/HomePage"));
const NotFound = lazy(() => import("../pages/site/NotFound"));
const SignPage = lazy(() => import("../pages/auth/SigninPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
const ExpenseForm = lazy(() => import("../components/Expense/ExpenseForm"));
const Expenses = lazy(() => import("../pages/site/Expense"));
import MainLayout from "../layouts/SiteLayout";
import AuthLayout from "../layouts/AuthLayout";
import FallbackLoader from "../components/UI/FallbackLoader.tsx";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route
          path="/auth/signin"
          element={
            <Suspense fallback={<FallbackLoader />}>
              <SignPage />
            </Suspense>
          }
        />
        <Route
          path="/auth/register"
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
          path="/expenses/:action"
          element={
            <Suspense fallback={<FallbackLoader />}>
              <ExpenseForm />
            </Suspense>
          }
        />
        <Route
          path="/expenses/:action/:id"
          element={
            <Suspense fallback={<FallbackLoader />}>
              <ExpenseForm />
            </Suspense>
          }
        />
        <Route
          path="/expenses"
          element={
            <Suspense fallback={<FallbackLoader />}>
              <Expenses />
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

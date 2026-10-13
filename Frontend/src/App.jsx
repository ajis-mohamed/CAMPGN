import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

import LandingPage from "./pages/public/LandingPage";
import PublicLayout from "./layouts/PageLayout";
import About from "./pages/public/About";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CreatorDashboard from "./pages/creator/CreatorDashboard";
import BrandDashboard from "./pages/brand/BrandDashboard";

import { checkAuth } from "./services/authService";
import { ProtectedRoute } from "./routing/ProtectedRoute";
import { PublicOnlyRoute } from "./routing/PublicOnlyRoute";
import { AnimatedSection } from "./animation/AnimatedSection";
import NotFound from "./pages/NotFound";

// Zustand
import useUserStore from "./zustand/useUserStore";
import CreatorProfile from "./pages/creator/CreatorProfile";

const URL = "http://localhost:5000/";

function App() {
  const setAuthState = useUserStore((state) => state.setAuthState);

  const [loading, setLoading] = useState(true);
  const [accountTypeLoading, setAccountTypeLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = checkAuth(async (currentUser) => {
      console.log("AUTH USER:", currentUser);

      // User is logged out
      if (!currentUser) {
        setAuthState(null, null);
        setAccountTypeLoading(false);
        setLoading(false);
        return;
      }

      // User is logged in
      setAuthState(currentUser, null);
      setAccountTypeLoading(true);

      try {
        const idToken = await currentUser.getIdToken();
        const response = await axios.get(
          `${URL}accounttype`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        const resolvedAccountType = response.data.accountType;

        console.log(
          "ACCOUNT TYPE FROM BACKEND:",
          resolvedAccountType
        );

        if (resolvedAccountType !== "brand" && resolvedAccountType !== "creator") {
          throw new Error("The account type returned by the server is invalid.");
        }

        setAuthState(currentUser, resolvedAccountType);
      } catch (error) {
        console.error(
          "ERROR FETCHING ACCOUNT TYPE:", error.message);

        setAuthState(currentUser, null);
      } finally {
        setAccountTypeLoading(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [setAuthState]);

  // Initial authentication loading
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col sm:flex-row items-center justify-center gap-3 bg-[#faf9ff]">
        <div className="w-5 h-5 border-2 border-[#737b8a]/30 border-t-[#737b8a] rounded-full animate-spin" />

        <p className="text-sm font-semibold text-[#737b8a]">
          Loading CAPGN Workspace...
        </p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route element={<PublicLayout />}>

          <Route
            path="/"
            element={
              <PublicOnlyRoute
              >
                <LandingPage />
              </PublicOnlyRoute>
            }
          />

          <Route
            path="/about"
            element={
              <AnimatedSection>
                <About />
              </AnimatedSection>
            }
          />
        </Route>


        {/* ================= AUTH ================= */}

        <Route
          path="/login"
          element={
            <PublicOnlyRoute
            >
              <Login />
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicOnlyRoute
            >
              <Register />
            </PublicOnlyRoute>
          }
        />


        {/* ================= CREATOR DASHBOARD ================= */}

        <Route
          path="/creator/dashboard"
          element={
            <ProtectedRoute
              accountTypeLoading={accountTypeLoading}
              allowedType="creator"
            >
              <CreatorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/creator/profile"
          element={
            <ProtectedRoute
              accountTypeLoading={accountTypeLoading}
              allowedType="creator"
            >
              <CreatorProfile />
            </ProtectedRoute>
          }
        />

        {/* ================= BRAND DASHBOARD ================= */}

        <Route
          path="/brand/dashboard"
          element={
            <ProtectedRoute
              accountTypeLoading={accountTypeLoading}
              allowedType="brand"
            >
              <BrandDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
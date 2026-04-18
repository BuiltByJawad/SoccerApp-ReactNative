import React, { useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MobileLayout from "./components/MobileLayout";
import { RequireAuth, RequireAdmin, RequirePlayer } from "./components/AuthGuard";

import SplashScreen from "./screens/player/SplashScreen";
import LoginScreen from "./screens/player/LoginScreen";
import RegisterScreen from "./screens/player/RegisterScreen";
import HomeScreen from "./screens/player/HomeScreen";
import VenueDetailsScreen from "./screens/player/VenueDetailsScreen";
import BookSessionScreen from "./screens/player/BookSessionScreen";
import CheckoutScreen from "./screens/player/CheckoutScreen";
import ConfirmationScreen from "./screens/player/ConfirmationScreen";
import MyBookingsScreen from "./screens/player/MyBookingsScreen";
import ProfileScreen from "./screens/player/ProfileScreen";
import ForgotPasswordScreen from "./screens/player/ForgotPasswordScreen";
import ProfileSubScreen from "./screens/player/ProfileSubScreen";

import AdminDashboardScreen from "./screens/admin/AdminDashboardScreen";
import AdminVenuesScreen from "./screens/admin/AdminVenuesScreen";
import AdminBookingsScreen from "./screens/admin/AdminBookingsScreen";
import AdminSettingsScreen from "./screens/admin/AdminSettingsScreen";
import AdminReportsScreen from "./screens/admin/AdminReportsScreen";

function Router() {
  return (
    <MobileLayout>
      <Switch>
        <Route path="/" component={SplashScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/home">{() => <RequirePlayer><HomeScreen /></RequirePlayer>}</Route>
        <Route path="/venue/:id">{(params) => <RequirePlayer><VenueDetailsScreen /></RequirePlayer>}</Route>
        <Route path="/book/:id">{(params) => <RequirePlayer><BookSessionScreen /></RequirePlayer>}</Route>
        <Route path="/checkout">{() => <RequirePlayer><CheckoutScreen /></RequirePlayer>}</Route>
        <Route path="/confirmation">{() => <RequirePlayer><ConfirmationScreen /></RequirePlayer>}</Route>
        <Route path="/bookings">{() => <RequirePlayer><MyBookingsScreen /></RequirePlayer>}</Route>
        <Route path="/profile">{() => <RequirePlayer><ProfileScreen /></RequirePlayer>}</Route>
        <Route path="/profile/:section">{(params) => <RequirePlayer><ProfileSubScreen section={params.section} /></RequirePlayer>}</Route>
        <Route path="/forgot-password" component={ForgotPasswordScreen} />
        <Route path="/admin">{() => <RequireAdmin><AdminDashboardScreen /></RequireAdmin>}</Route>
        <Route path="/admin/venues">{() => <RequireAdmin><AdminVenuesScreen /></RequireAdmin>}</Route>
        <Route path="/admin/bookings">{() => <RequireAdmin><AdminBookingsScreen /></RequireAdmin>}</Route>
        <Route path="/admin/settings">{() => <RequireAdmin><AdminSettingsScreen /></RequireAdmin>}</Route>
        <Route path="/admin/reports">{() => <RequireAdmin><AdminReportsScreen /></RequireAdmin>}</Route>
        <Route>
          <div style={{ color: '#fff', textAlign: 'center', padding: 40 }}>Page not found</div>
        </Route>
      </Switch>
    </MobileLayout>
  );
}

function App() {
  useEffect(() => {
    const theme = localStorage.getItem("pf-theme");
    if (theme === "light") {
      document.documentElement.classList.add("pf-light");
    } else {
      document.documentElement.classList.remove("pf-light");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

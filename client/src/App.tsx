import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MobileLayout from "./components/MobileLayout";

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

import AdminDashboardScreen from "./screens/admin/AdminDashboardScreen";
import AdminVenuesScreen from "./screens/admin/AdminVenuesScreen";
import AdminBookingsScreen from "./screens/admin/AdminBookingsScreen";

function Router() {
  return (
    <MobileLayout>
      <Switch>
        <Route path="/" component={SplashScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/home" component={HomeScreen} />
        <Route path="/venue/:id" component={VenueDetailsScreen} />
        <Route path="/book/:id" component={BookSessionScreen} />
        <Route path="/checkout" component={CheckoutScreen} />
        <Route path="/confirmation" component={ConfirmationScreen} />
        <Route path="/bookings" component={MyBookingsScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/admin" component={AdminDashboardScreen} />
        <Route path="/admin/venues" component={AdminVenuesScreen} />
        <Route path="/admin/bookings" component={AdminBookingsScreen} />
        <Route>
          <div style={{ color: '#fff', textAlign: 'center', padding: 40 }}>Page not found</div>
        </Route>
      </Switch>
    </MobileLayout>
  );
}

function App() {
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

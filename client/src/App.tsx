import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";

// Page imports
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Features from "@/pages/Features";
import Students from "@/pages/Students";
import Companies from "@/pages/Companies";
import AuthPage from "@/pages/auth-page";
import NotFound from "@/pages/not-found";
import Employee from "@/pages/Employee";
import Employer from "@/pages/Employer";
import Pricing from "@/pages/Pricing";
import Profile from "@/pages/Profile";
import StudentDashboard from "@/pages/StudentDashboard";

function Router() {
  const [location, setLocation] = useLocation();

  // Update active navigation based on current location
  useEffect(() => {
    // Handle hash navigation
    if (location.startsWith("/#")) {
      const hash = location.substring(2);
      setLocation(`/${hash}`);
    }
  }, [location, setLocation]);

  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/features" component={Features} />
        <Route path="/students" component={Students} />
        <Route path="/companies" component={Companies} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/auth" component={AuthPage} />
        
        {/* Protected Routes */}
        <ProtectedRoute path="/profile" component={Profile} />
        <ProtectedRoute path="/student-dashboard" component={StudentDashboard} />
        <ProtectedRoute path="/employee" component={Employee} />
        <ProtectedRoute path="/employer" component={Employer} />
        
        {/* 404 Page */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

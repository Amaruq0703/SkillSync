import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

// Page imports
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Features from "@/pages/Features";
import Students from "@/pages/Students";
import Companies from "@/pages/Companies";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import NotFound from "@/pages/not-found";

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
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

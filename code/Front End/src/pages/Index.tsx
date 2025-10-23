import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import Dashboard from "@/components/Dashboard";

export default function Index() {
  const [hasStarted, setHasStarted] = useState(false);
  return !hasStarted ? (
    <WelcomeScreen onStart={() => setHasStarted(true)} />
  ) : (
    <Dashboard />
  );
}

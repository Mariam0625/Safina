import { useState } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import WelcomeScreen from "@/components/WelcomeScreen";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <LanguageProvider>
      {!hasStarted ? (
        <WelcomeScreen onStart={() => setHasStarted(true)} />
      ) : (
        <Dashboard />
      )}
    </LanguageProvider>
  );
};

export default Index;

'use client';
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface DemoModeContextType {
  isDemo: boolean;
  toggleDemo: () => void;
  activeScenario: string;
  setActiveScenario: (s: string) => void;
}

const DemoModeContext = createContext<DemoModeContextType>({
  isDemo: false,
  toggleDemo: () => {},
  activeScenario: 'organic',
  setActiveScenario: () => {},
});

export function DemoModeProvider({ children }: { children: ReactNode }) {
  const [isDemo, setIsDemo] = useState(true);
  const [activeScenario, setActiveScenario] = useState('organic');
  const toggleDemo = useCallback(() => setIsDemo(v => !v), []);
  return (
    <DemoModeContext.Provider value={{ isDemo, toggleDemo, activeScenario, setActiveScenario }}>
      {children}
    </DemoModeContext.Provider>
  );
}

export const useDemoMode = () => useContext(DemoModeContext);

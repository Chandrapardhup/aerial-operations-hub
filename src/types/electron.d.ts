
declare global {
  interface Window {
    electronAPI?: {
      openMissionPlanner: () => Promise<void>;
    };
  }
}

export {};

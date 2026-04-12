import { useState, useEffect } from 'react';

export function useMaintenanceMode() {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  useEffect(() => {
    // Check if VITE_MAINTENANCE_MODE is set to 'true'
    const maintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === 'true';
    setIsMaintenanceMode(maintenanceMode);
  }, []);

  return isMaintenanceMode;
}

import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Server, Database } from 'lucide-react';
import { realUsersApi } from '@/services/realUsersApi';

const BackendStatusIndicator: React.FC = () => {
  const [isBackendAvailable, setIsBackendAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        await realUsersApi.getUsers(1, '', '');
        setIsBackendAvailable(true);
      } catch (error) {
        setIsBackendAvailable(false);
      }
    };

    checkBackendStatus();
    
    // Check status every 30 seconds
    const interval = setInterval(checkBackendStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (isBackendAvailable === null) {
    return (
      <Badge variant="outline" className="gap-2">
        <Server className="h-3 w-3" />
        Verificando...
      </Badge>
    );
  }

  return (
    <Badge 
      variant={isBackendAvailable ? "default" : "secondary"} 
      className="gap-2"
    >
      {isBackendAvailable ? (
        <>
          <Server className="h-3 w-3" />
          Backend Conectado
        </>
      ) : (
        <>
          <Database className="h-3 w-3" />
          Datos Mock
        </>
      )}
    </Badge>
  );
};

export default BackendStatusIndicator;
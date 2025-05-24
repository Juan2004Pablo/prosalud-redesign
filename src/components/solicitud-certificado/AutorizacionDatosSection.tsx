
import React from 'react';

const AutorizacionDatosSection: React.FC = () => {
  return (
    <div className="py-4 px-6 border rounded-lg shadow-sm bg-white border-l-4 border-primary">
      <h3 className="text-md font-semibold text-gray-700 mb-1">
        Autorización de Tratamiento de Datos Personales
      </h3>
      <p className="text-xs text-muted-foreground">
        Al hacer clic en "Enviar Solicitud", usted autoriza de forma previa, expresa e informada el tratamiento de sus datos personales conforme al artículo 17, literal b de la Ley 1581 de 2012 y nuestra política de tratamiento de datos.
      </p>
    </div>
  );
};

export default AutorizacionDatosSection;

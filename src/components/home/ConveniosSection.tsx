
import React from 'react';

const conveniosData = [
  { 
    name: "E.S.E. HOSPITAL MARCO FIDEL SUÁREZ - BELLO",
    imageUrl: "/hospital-marco-fidel-suarez.jpg"
  },
  { 
    name: "E.S.E. HOSPITAL SAN JUAN DE DIOS - RIONEGRO",
    imageUrl: "/hospital-san-juan-de-dios-rionegro.jpg"
  },
  { 
    name: "PROMOTORA MÉDICA Y ODONTOLÓGICA S.A.",
    imageUrl: "/promotora-medica-odontologica.jpg"
  },
  { 
    name: "SOCIEDAD MÉDICA RIONEGRO SOMER S.A.",
    imageUrl: "/somer-sa.jpg"
  },
  { 
    name: "E.S.E. HOSPITAL VENANCIO DÍAZ DÍAZ",
    imageUrl: "/hospital-venancio-diaz.webp"
  },
  { 
    name: "E.S.E. HOSPITAL LA MERCED - CIUDAD BOLÍVAR",
    imageUrl: "/la-merced-ciudad-bolivar.jpeg"
  },
  { 
    name: "E.S.E. HOSPITAL SANTA ELENA - FREDONIA",
    imageUrl: "/hospital-santa-elena-fredonia.jpg"
  },
];

const ConveniosSection: React.FC = () => {
  return (
    <section id="convenios" className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-prosalud text-text-light p-6 rounded-lg shadow-lg mb-10 md:mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">
            A lo largo de nuestra trayectoria hemos tenido convenios con diferentes entidades en Antioquia
          </h2>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {conveniosData.map((convenio, index) => (
            <li 
              key={index} 
              className="bg-card p-6 rounded-lg shadow-md border border-prosalud-border hover:shadow-xl hover:border-primary-prosalud transition-all duration-300 flex items-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-10 w-10 rounded-full overflow-hidden mr-4 shrink-0">
                <img 
                  src={convenio.imageUrl} 
                  alt={convenio.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-md font-medium text-text-dark">{convenio.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ConveniosSection;

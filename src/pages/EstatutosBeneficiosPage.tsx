
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Separator } from '@/components/ui/separator';

const EstatutosBeneficiosPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary-prosalud mb-2">
            Estatutos y Beneficios Sindicales
          </h1>
          <p className="text-lg text-gray-600">
            Información relevante sobre los estatutos, derechos, deberes y beneficios para los afiliados partícipes.
          </p>
        </header>

        <Separator className="my-8 bg-primary-prosalud-light" />

        <section className="mb-10 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-primary-prosalud mb-4">Capítulo IV</h2>
          <article className="mb-4">
            <h3 className="text-xl font-medium text-gray-800 mb-1">Artículo 11°. OBLIGACIONES DE LOS AFILIADOS PARTICIPES.</h3>
            {/* Aquí podría ir el contenido detallado del artículo si se proporciona */}
          </article>
          <article className="mb-4">
            <h3 className="text-xl font-medium text-gray-800 mb-1">Artículo 12°. DERECHOS DE LOS AFILIADOS PARTICIPES.</h3>
            {/* Aquí podría ir el contenido detallado del artículo si se proporciona */}
          </article>
          <article>
            <h3 className="text-xl font-medium text-gray-800 mb-1">Artículo 13°. DEBERES DE LOS AFILIADOS PARTICIPES.</h3>
            {/* Aquí podría ir el contenido detallado del artículo si se proporciona */}
          </article>
        </section>

        <Separator className="my-8" />

        <section className="mb-10 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-primary-prosalud mb-4">Estatutos - Capítulo V</h2>
          <article>
            <h3 className="text-xl font-medium text-gray-800 mb-1">Artículo 32°. SISTEMA DISCIPLINARIO APLICABLE A LOS AFILIADOS PARTICIPES</h3>
            {/* Aquí podría ir el contenido detallado del artículo si se proporciona */}
          </article>
        </section>
        
        <div className="my-8 p-4 bg-blue-50 border-l-4 border-primary-prosalud rounded-md">
          <p className="text-gray-700">
            Dichos ítems están contenidos en los Estatutos Sindicales y Reglamento del Contrato Sindical depositados en el Ministerio de la protección Social y se divulgan en la página web <a href="http://www.sindicatoprosalud.com" target="_blank" rel="noopener noreferrer" className="text-primary-prosalud hover:underline font-medium">www.sindicatoprosalud.com</a>
          </p>
        </div>

        <Separator className="my-8" />

        <section className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-primary-prosalud mb-4">Compensaciones, auxilios y beneficios</h2>
          <p className="text-gray-700 leading-relaxed">
            El Sindicato, de acuerdo con la asamblea, el reglamento o contrato sindical, establecerá la frecuencia de las compensaciones, de los auxilios y beneficios.
          </p>
        </section>
      </div>
    </MainLayout>
  );
};

export default EstatutosBeneficiosPage;

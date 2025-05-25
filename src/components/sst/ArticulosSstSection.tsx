
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ExternalLink } from 'lucide-react';

interface Article {
  title: string;
  url: string;
}

interface ArticulosSstSectionProps {
  articles: Article[];
}

const ArticulosSstSection: React.FC<ArticulosSstSectionProps> = ({ articles }) => {
  return (
    <section className="mb-12 animate-[fadeInUp_0.5s_ease-out_1.4s_forwards] opacity-0">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">
        <FileText size={32} className="mr-3 inline-block text-secondary-prosaludgreen" />
        Artículos
      </h2>
      <p className="text-center text-muted-foreground mb-8 -mt-4">Para que estemos preparados ten en cuenta lo siguiente:</p>
      <div className="grid md:grid-cols-2 gap-6">
        {articles.map((article, index) => (
          <Card key={index} className="shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary-prosalud flex items-center">
                <FileText size={22} className="mr-2 text-primary-prosalud" />
                {article.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-secondary-prosaludgreen hover:text-secondary-prosaludgreen/80 font-medium"
              >
                Ver documento
                <ExternalLink size={18} className="ml-2" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ArticulosSstSection;

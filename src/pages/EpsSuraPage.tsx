
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Heart, Phone, Mail, Globe, Users, FileText, 
  UserCheck, UserMinus, CreditCard, Copy,
  ExternalLink, AlertCircle, Info, CheckCircle,
  ArrowRight, Building2, Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EpsSuraPage: React.FC = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado",
      description: "Texto copiado al portapapeles",
      variant: "default"
    });
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-primary-prosalud to-primary-prosalud-dark overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative container mx-auto px-4 py-16 max-w-6xl">
            <div className="text-center text-white">
              <div className="flex justify-center items-center gap-3 mb-6">
                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                  <Heart className="h-8 w-8" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">
                  Gestión EPS Sura
                </h1>
              </div>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Encuentra toda la información necesaria para gestionar tus servicios con EPS Sura de forma rápida y eficiente
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Traslado de EPS - Featured Section */}
          <div className="mb-16 bg-white rounded-2xl shadow-xl overflow-hidden border border-primary-prosalud/10">
            <div className="bg-gradient-to-r from-primary-prosalud/5 to-primary-prosalud/10 p-8 border-b">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-prosalud rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-primary-prosalud mb-2">
                    Traslado de EPS a EPS Sura
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Cambia tu afiliación de manera fácil y rápida enviando tus documentos por WhatsApp
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-amber-800 mb-2">Información importante</p>
                    <p className="text-amber-700 mb-4">
                      Para realizar el proceso de traslado, envía la siguiente información al WhatsApp:
                    </p>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-amber-600" />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard("3002799230")}
                        className="text-amber-700 hover:text-amber-800 border-amber-300 hover:bg-amber-100"
                      >
                        3002799230
                        <Copy className="h-3 w-3 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary-prosalud" />
                    Documentos Requeridos
                  </h3>
                  <div className="space-y-3">
                    {[
                      "Copia de la cédula o fotografía",
                      "Dirección, barrio y ciudad donde vive",
                      "Número de celular",
                      "Correo electrónico personal"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary-prosalud" />
                    Información Adicional
                  </h3>
                  <div className="space-y-3">
                    {[
                      "Informar si tienes beneficiarios",
                      "Número de documento y RH",
                      "Tratamientos en curso (si aplica)",
                      "Nombre de la empresa donde labora"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Servicios en línea - Grid Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Servicios en Línea</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Accede a los servicios digitales de EPS Sura desde su portal oficial
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Retiro de Beneficiarios */}
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
                <div className="h-2 bg-gradient-to-r from-primary-prosalud to-primary-prosalud-dark"></div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary-prosalud/10 rounded-lg">
                      <UserMinus className="h-5 w-5 text-primary-prosalud" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Retiro de Beneficiarios</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Proceso en línea con firma digital
                  </p>
                  <div className="text-xs text-gray-500 mb-4 p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-3 w-3 inline mr-1" />
                    Enviar a: ceretirobenepssura@suramericana.com.co
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-orange-500 group-hover:text-white transition-colors"
                    onClick={() => window.open('https://www.epssura.com', '_blank')}
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Portal EPS Sura
                  </Button>
                </div>
              </div>
              
              {/* Cambio de IPS */}
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
                <div className="h-2 bg-gradient-to-r from-orange-500 to-red-500"></div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <UserCheck className="h-5 w-5 text-orange-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Cambio de IPS</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-6">
                    Cambia tu punto de atención médica fácilmente a través del portal en línea
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary-prosalud group-hover:text-white transition-colors"
                    onClick={() => window.open('https://portaleps.epssura.com/ServiciosUnClick/#/ips/cambioIps', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Acceder al Portal
                  </Button>
                </div>
              </div>

              {/* UPC Adicional */}
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
                <div className="h-2 bg-gradient-to-r from-primary-prosalud to-primary-prosalud-dark"></div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary-prosalud/10 rounded-lg">
                      <CreditCard className="h-5 w-5 text-primary-prosalud" />
                    </div>
                    <h3 className="font-semibold text-gray-900">UPC Adicional</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Consulta valores y realiza el proceso de UPC adicional
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Phone className="h-3 w-3" />
                      <span>ARUS: 6042727</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Phone className="h-3 w-3" />
                      <span>WhatsApp: 3158024685</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-purple-600 group-hover:text-white transition-colors"
                    onClick={() => window.open('https://www.epssura.com/cuotas-moderadoras-copagos-valores-upc-y-tarifas', '_blank')}
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Consultar Valores
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Servicios Adicionales - Horizontal Cards */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Servicios Adicionales</h2>
            
            <div className="space-y-6">
              {[
                {
                  title: "Transcripción de Incapacidad",
                  description: "Portal → INICIAR SESIÓN → SOLICITUDES Y AUTORIZACIONES → TRANSCRIBIR INCAPACIDAD",
                  icon: FileText,
                  color: "from-green-500 to-green-600"
                },
                {
                  title: "Certificados",
                  description: "Portal → INICIAR SESIÓN → CERTIFICADOS Y CONSULTAS → Seleccionar certificado",
                  icon: Building2,
                  color: "from-blue-500 to-blue-600"
                },
                {
                  title: "Actualización de Documentos",
                  description: "Portal → INICIAR SESIÓN → SOLICITUDES Y AUTORIZACIONES → ACTUALIZACIÓN DE DOCUMENTO",
                  icon: Clock,
                  color: "from-indigo-500 to-indigo-600"
                }
              ].map((service, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="flex items-center p-6">
                    <div className={`p-4 bg-gradient-to-r ${service.color} rounded-xl mr-6`}>
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">{service.title}</h3>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Información de Contacto - Bottom Section */}
          <div className="bg-gradient-to-r from-primary-prosalud/5 to-primary-prosalud/10 rounded-2xl p-8 border border-primary-prosalud/20">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-primary-prosalud mb-2">Información de Contacto</h2>
              <p className="text-gray-600">Canales oficiales de EPS Sura para comunicarte directamente</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary-prosalud" />
                  Portal Web Oficial
                </h3>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open('https://www.epssura.com', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  www.epssura.com
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary-prosalud" />
                  Contacto para Traslados
                </h3>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => copyToClipboard("3002799230")}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  WhatsApp: 3002799230
                  <Copy className="h-3 w-3 ml-auto" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EpsSuraPage;

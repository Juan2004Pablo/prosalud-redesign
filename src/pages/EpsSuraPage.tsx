
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Heart, Phone, Mail, Globe, Users, FileText, 
  UserCheck, UserMinus, CreditCard, Copy,
  ExternalLink, AlertCircle, Info, CheckCircle
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
      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Heart className="h-10 w-10 text-primary-prosalud" />
              <h1 className="text-3xl md:text-4xl font-bold text-primary-prosalud">
                Gestión EPS Sura
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Información y procedimientos para la gestión de servicios con EPS Sura
            </p>
          </div>

          <div className="space-y-8">
            {/* Traslado de EPS */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                <CardTitle className="flex items-center gap-3 text-blue-800">
                  <Users className="h-6 w-6" />
                  Traslado de EPS a EPS Sura
                </CardTitle>
                <CardDescription className="text-blue-600">
                  Proceso para cambiar tu afiliación a EPS Sura
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800">Importante</p>
                      <p className="text-yellow-700 text-sm mt-1">
                        Para realizar el proceso de traslado, envía la siguiente información al WhatsApp:
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard("3002799230")}
                          className="text-yellow-700 hover:text-yellow-700 border-yellow-300 hover:bg-yellow-100"
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          3002799230
                          <Copy className="h-3 w-3 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Documentos Requeridos
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Copia de la cédula o fotografía
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Dirección, barrio y ciudad donde vive
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Número de celular
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Correo electrónico personal
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Info className="h-5 w-5 text-blue-600" />
                      Información Adicional
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Informar si tienes beneficiarios
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Número de documento y RH
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Tratamientos en curso (si aplica)
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Nombre de la empresa donde labora
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cambio de IPS */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                <CardTitle className="flex items-center gap-3 text-green-800">
                  <UserCheck className="h-6 w-6" />
                  Cambio de IPS
                </CardTitle>
                <CardDescription className="text-green-600">
                  Cambia tu punto de atención médica
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-gray-600 mb-4">
                    Puedes cambiar tu IPS (punto de atención) siguiendo estos pasos:
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    {[
                      "Ingresa a la página www.epssura.com.co",
                      "Ingresa a la opción 'Servicios a un clic'",
                      "En la parte superior ingresa en el botón 'INICIAR SESIÓN'",
                      "Ingresa usuario y contraseña",
                      "Ingresa a la opción 'Solicitudes y autorizaciones'",
                      "Selecciona 'Cambio de IPS' y diligencia la información"
                    ].map((step, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Badge variant="outline" className="min-w-[24px] h-6 rounded-full flex items-center justify-center text-xs">
                          {index + 1}
                        </Badge>
                        <p className="text-sm text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      className="text-green-700 hover:text-green-700 border-green-300 hover:bg-green-50"
                      onClick={() => window.open('https://portaleps.epssura.com/ServiciosUnClick/#/ips/cambioIps', '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Acceder al Portal
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Grid de servicios adicionales */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Retiro de Beneficiarios */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-red-50 to-red-100">
                  <CardTitle className="flex items-center gap-3 text-red-800">
                    <UserMinus className="h-6 w-6" />
                    Retiro de Beneficiarios
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 mb-3">Pasos para retirar un beneficiario:</p>
                    
                    <div className="space-y-2 text-sm">
                      {[
                        "Ingresa a www.epssura.com.co",
                        "Servicios a un clic → INICIAR SESIÓN",
                        "AFILIACIONES Y RETIROS → RETIRO de beneficiario",
                        "Responder SI a todas las preguntas del sistema",
                        "Diligenciar correo y agregar beneficiario a retirar",
                        "Firmar digitalmente y finalizar proceso"
                      ].map((step, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Badge variant="outline" className="min-w-[20px] h-5 rounded-full flex items-center justify-center text-xs">
                            {index + 1}
                          </Badge>
                          <p className="text-xs text-gray-600">{step}</p>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-4" />
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-xs text-blue-800 font-medium mb-1">Enviar formulario a:</p>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-blue-600" />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:bg-blue-100 h-auto p-1"
                          onClick={() => copyToClipboard("ceretirobenepssura@suramericana.com.co")}
                        >
                          ceretirobenepssura@suramericana.com.co
                          <Copy className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-xs text-yellow-800">
                        <strong>Nota:</strong> No es necesario adjuntar documentos, excepto si son casados se debe anexar la sentencia de divorcio.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* UPC Adicional */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
                  <CardTitle className="flex items-center gap-3 text-purple-800">
                    <CreditCard className="h-6 w-6" />
                    Proceso UPC Adicional
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 mb-3">Proceso para UPC adicional:</p>
                    
                    <div className="space-y-2 text-sm">
                      {[
                        "Consultar valores UPC según edad del beneficiario",
                        "Comunicarse con operador de pago (ARUS 6042727)",
                        "Realizar pago de UPC (conservar comprobante)",
                        "Solicitar turno virtual por la página",
                        "Un asesor se comunicará para orientar el proceso"
                      ].map((step, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Badge variant="outline" className="min-w-[20px] h-5 rounded-full flex items-center justify-center text-xs">
                            {index + 1}
                          </Badge>
                          <p className="text-xs text-gray-600">{step}</p>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-4" />
                    
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-purple-700 border-purple-300 hover:bg-purple-50 w-full"
                        onClick={() => window.open('https://www.epssura.com/cuotas-moderadoras-copagos-valores-upc-y-tarifas', '_blank')}
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Consultar Valores UPC
                      </Button>
                      
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-purple-600" />
                        <span className="text-sm text-gray-600">ARUS:</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard("6042727")}
                          className="text-purple-600 hover:bg-purple-50 h-auto p-1"
                        >
                          6042727
                          <Copy className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-purple-600" />
                        <span className="text-sm text-gray-600">WhatsApp:</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard("3158024685")}
                          className="text-purple-600 hover:bg-purple-50 h-auto p-1"
                        >
                          3158024685
                          <Copy className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Servicios en línea */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Transcripción de Incapacidad */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100">
                  <CardTitle className="text-lg text-orange-800">
                    Transcripción de Incapacidad
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">Acceso:</p>
                    <p className="text-xs text-gray-600">Portal → INICIAR SESIÓN → SOLICITUDES Y AUTORIZACIONES → TRANSCRIBIR INCAPACIDAD</p>
                  </div>
                </CardContent>
              </Card>

              {/* Certificados */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100">
                  <CardTitle className="text-lg text-teal-800">
                    Certificados
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">Acceso:</p>
                    <p className="text-xs text-gray-600">Portal → INICIAR SESIÓN → CERTIFICADOS Y CONSULTAS → Seleccionar certificado deseado</p>
                  </div>
                </CardContent>
              </Card>

              {/* Actualización de Documentos */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100">
                  <CardTitle className="text-lg text-indigo-800">
                    Actualización de Documentos
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">Acceso:</p>
                    <p className="text-xs text-gray-600">Portal → INICIAR SESIÓN → SOLICITUDES Y AUTORIZACIONES → ACTUALIZACIÓN DE DOCUMENTO DE IDENTIDAD</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Información de contacto */}
            <Card className="shadow-lg border-primary-prosalud/20">
              <CardHeader className="bg-gradient-to-r from-primary-prosalud/10 to-primary-prosalud/20">
                <CardTitle className="flex items-center gap-3 text-primary-prosalud">
                  <Phone className="h-6 w-6" />
                  Información de Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-800">EPS Sura - Portal Web</h3>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => window.open('https://www.epssura.com.co', '_blank')}
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      www.epssura.com.co
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-800">Contacto para Traslados</h3>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => copyToClipboard("3002799230")}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      WhatsApp: 3002799230
                      <Copy className="h-3 w-3 ml-auto" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EpsSuraPage;

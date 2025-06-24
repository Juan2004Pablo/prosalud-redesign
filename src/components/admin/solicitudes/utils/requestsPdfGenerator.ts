
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Request } from '@/types/requests';
import { requestTypeLabels, statusLabels } from '@/data/requestsMock';

interface DateRangeFilter {
  includeAll: boolean;
  start?: Date;
  end?: Date;
}

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const generateRequestsPDFReport = (requests: Request[], dateRange: DateRangeFilter): jsPDF => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(41, 128, 185);
  doc.text('REPORTE DE SOLICITUDES PROSALUD', 20, 25);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Fecha de generación: ${new Date().toLocaleDateString('es-ES')}`, 20, 35);
  
  if (!dateRange.includeAll && dateRange.start && dateRange.end) {
    doc.text(`Período: ${dateRange.start.toLocaleDateString('es-ES')} - ${dateRange.end.toLocaleDateString('es-ES')}`, 20, 42);
  }

  // Summary Statistics
  const totalRequests = requests.length;
  const pendingRequests = requests.filter(r => r.status === 'pending').length;
  const resolvedRequests = requests.filter(r => r.status === 'resolved').length;
  const inProgressRequests = requests.filter(r => r.status === 'in_progress').length;
  const rejectedRequests = requests.filter(r => r.status === 'rejected').length;

  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('RESUMEN GENERAL', 20, 55);

  const summaryData = [
    ['Total de solicitudes', totalRequests.toString()],
    ['Solicitudes pendientes', pendingRequests.toString()],
    ['Solicitudes en proceso', inProgressRequests.toString()],
    ['Solicitudes resueltas', resolvedRequests.toString()],
    ['Solicitudes rechazadas', rejectedRequests.toString()]
  ];

  doc.autoTable({
    startY: 60,
    head: [['Métrica', 'Valor']],
    body: summaryData,
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    margin: { left: 20, right: 20 }
  });

  // Requests by Type
  const requestsByType: { [key: string]: number } = {};
  requests.forEach(request => {
    const typeLabel = requestTypeLabels[request.request_type];
    requestsByType[typeLabel] = (requestsByType[typeLabel] || 0) + 1;
  });

  const typeData = Object.entries(requestsByType).map(([type, count]) => [type, count.toString()]);

  doc.text('SOLICITUDES POR TIPO', 20, doc.lastAutoTable.finalY + 20);

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 25,
    head: [['Tipo de Solicitud', 'Cantidad']],
    body: typeData,
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    margin: { left: 20, right: 20 }
  });

  // Detailed Requests List
  doc.addPage();
  doc.setFontSize(14);
  doc.text('DETALLE DE SOLICITUDES', 20, 25);

  const requestsData = requests.map(request => [
    `${request.name} ${request.last_name}`,
    `${request.id_type}: ${request.id_number}`,
    requestTypeLabels[request.request_type],
    statusLabels[request.status],
    new Date(request.created_at).toLocaleDateString('es-ES'),
    request.resolved_at ? new Date(request.resolved_at).toLocaleDateString('es-ES') : 'N/A'
  ]);

  doc.autoTable({
    startY: 35,
    head: [['Solicitante', 'Documento', 'Tipo', 'Estado', 'Fecha Creación', 'Fecha Resolución']],
    body: requestsData,
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    margin: { left: 10, right: 10 },
    styles: { fontSize: 8 },
    columnStyles: {
      0: { cellWidth: 35 },
      1: { cellWidth: 30 },
      2: { cellWidth: 40 },
      3: { cellWidth: 25 },
      4: { cellWidth: 25 },
      5: { cellWidth: 25 }
    }
  });

  // Requests by Status Chart (text-based)
  if (doc.lastAutoTable.finalY < 220) {
    doc.text('DISTRIBUCIÓN POR ESTADO', 20, doc.lastAutoTable.finalY + 20);
    
    const statusData = [
      ['Pendiente', pendingRequests.toString(), `${((pendingRequests/totalRequests)*100).toFixed(1)}%`],
      ['En Proceso', inProgressRequests.toString(), `${((inProgressRequests/totalRequests)*100).toFixed(1)}%`],
      ['Resuelto', resolvedRequests.toString(), `${((resolvedRequests/totalRequests)*100).toFixed(1)}%`],
      ['Rechazado', rejectedRequests.toString(), `${((rejectedRequests/totalRequests)*100).toFixed(1)}%`]
    ];

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 25,
      head: [['Estado', 'Cantidad', 'Porcentaje']],
      body: statusData,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] },
      margin: { left: 20, right: 20 }
    });
  }

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10);
    doc.text('ProSalud - Sistema de Gestión de Solicitudes', 20, doc.internal.pageSize.height - 10);
  }

  return doc;
};

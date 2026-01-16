import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Product, Category, Transaction } from '../types';
import { CURRENCY_SYMBOL } from '../constants';

// --- Inventory PDF ---
export const generateInventoryPDF = (products: Product[], categories: Category[]) => {
  const doc: any = new jsPDF();
  const today = new Date().toLocaleDateString();

  doc.setFontSize(20);
  doc.text('Inventario General de Abastecimiento', 14, 22);
  doc.setFontSize(10);
  doc.text(`Fecha de Corte: ${today}`, 14, 30);

  let finalY = 40;

  categories.forEach((cat) => {
    const catProducts = products.filter(p => p.categoryId === cat.id);
    if (catProducts.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(41, 128, 185);
      doc.text(cat.name, 14, finalY + 10);
      
      const tableData = catProducts.map(p => {
        return [
            p.code,
            p.name,
            p.supplier || '-', // Added supplier
            p.stock,
            p.unit,
            `${CURRENCY_SYMBOL}${p.price.toFixed(2)}`,
            p.location || '-',
            p.stock === 0 ? 'AGOTADO' : (p.stock <= p.minStock ? 'CRÍTICO' : 'OK')
        ];
      });

      autoTable(doc, {
        startY: finalY + 15,
        head: [['Código', 'Material/Producto', 'Proveedor', 'Stock', 'Unid.', 'Costo', 'Ubic.', 'Estado']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [52, 73, 94] },
        styles: { fontSize: 7 },
        columnStyles: { 7: { fontStyle: 'bold' } },
        didParseCell: function(data: any) {
            if (data.section === 'body' && data.column.index === 7) {
                 if (data.cell.raw === 'AGOTADO') data.cell.styles.textColor = [0, 0, 0];
                 else if (data.cell.raw === 'CRÍTICO') data.cell.styles.textColor = [231, 76, 60];
            }
        }
      });
      finalY = doc.lastAutoTable.finalY + 5;
    }
  });
  doc.save(`Inventario_Abastecimiento_${new Date().toISOString().split('T')[0]}.pdf`);
};

// --- Transaction History PDF ---
export const generateTransactionHistoryPDF = (transactions: Transaction[]) => {
    const doc: any = new jsPDF();
    const today = new Date().toLocaleDateString();

    doc.setFontSize(18);
    doc.text('Reporte de Movimientos / Despachos', 14, 22);
    doc.setFontSize(10);
    doc.text(`Generado el: ${today}`, 14, 30);

    const tableData = transactions.map(t => [
        new Date(t.date).toLocaleDateString() + ' ' + new Date(t.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        t.productName,
        t.quantity,
        t.reason || '-',
        t.destination || 'N/A',
        t.receiver || 'N/A',
        t.user
    ]);

    autoTable(doc, {
        startY: 40,
        head: [['Fecha', 'Material', 'Cant.', 'Motivo/Obra', 'Destino', 'Receptor', 'Resp.']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [192, 57, 43] }, // Red header for exits
        styles: { fontSize: 8 },
    });

    doc.save(`Despachos_${new Date().toISOString().split('T')[0]}.pdf`);
};

// --- Replenishment Order PDF ---
export const generateReplenishmentPDF = (products: Product[]) => {
    const doc: any = new jsPDF();
    const today = new Date().toLocaleDateString();
    
    // Filter needed products
    const toOrder = products.filter(p => p.stock <= p.minStock);

    doc.setFontSize(18);
    doc.text('Solicitud de Compra / Reposición', 14, 22);
    doc.setFontSize(10);
    doc.text(`Fecha: ${today}`, 14, 30);
    doc.text('Listado de materiales bajo stock mínimo.', 14, 35);

    const tableData = toOrder.map(p => {
        const suggested = (p.minStock * 2) - p.stock; 
        return [
            p.code,
            p.name,
            p.supplier || 'No Asignado',
            p.stock,
            p.minStock,
            suggested > 0 ? suggested : 0,
            p.unit
        ];
    });

    autoTable(doc, {
        startY: 45,
        head: [['Código', 'Material', 'Proveedor Sugerido', 'Actual', 'Min.', 'A Pedir', 'Unid']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [243, 156, 18] }, // Orange/Yellow header
        styles: { fontSize: 9 },
        columnStyles: {
            3: { fontStyle: 'bold', textColor: [231, 76, 60] }
        }
    });

    doc.save(`Solicitud_Compra_${new Date().toISOString().split('T')[0]}.pdf`);
};
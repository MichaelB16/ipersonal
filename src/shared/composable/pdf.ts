import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const usePdf = () => {
  const exportFile = (
    columns: string[],
    data: any,
    filename: string,
    callback
  ) => {
    const doc = new jsPDF({
      orientation: 'landscape',
    });
    callback(doc);
    autoTable(doc, {
      head: [columns],
      body: data,
      margin: { right: 6, left: 6, top: 12, bottom: 6 },
      rowPageBreak: 'auto',
      theme: 'striped',
      styles: { font: 'times', fontSize: 10, cellPadding: 3 },
    });
    doc.save(filename);
  };

  return { exportFile };
};

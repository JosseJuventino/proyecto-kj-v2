import ExcelJS from 'exceljs';

interface TableHeader {
  text: string;
  style?: string;
}

interface TableRow {
  [key: string]: string | number;
}

interface GenerateExcelOptions {
  title: string;
  headers: TableHeader[];
  rows: TableRow[];
}

export const generateExcel = async ({ title, headers, rows }: GenerateExcelOptions) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(title);

  // Configurar encabezados de columna
  worksheet.columns = headers.map(header => ({
    header: header.text,
    key: header.text,
    width: 10 // Valor inicial de ancho, se ajustará posteriormente
  }));

  // Añadir filas de datos
  rows.forEach(row => {
    const rowData = headers.map(header => row[header.text] || ''); // Evitar undefined
    worksheet.addRow(rowData);
  });

  // Ajustar el ancho de las columnas al contenido más largo
  worksheet.columns.forEach(column => {
    if (column && typeof column.key === 'string') {
      let maxLength = 0;
      const colValues = worksheet.getColumn(column.key).values;
      colValues.forEach(value => {
        const length = value ? value.toString().length : 10;
        if (length > maxLength) {
          maxLength = length;
        }
      });
      column.width = maxLength + 2; // Ajuste adicional para espacio extra
    }
  });

  // Descargar archivo Excel
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `Reporte_${new Date().toLocaleDateString().replace(/\//g, "-")}.xlsx`;
  link.click();
};

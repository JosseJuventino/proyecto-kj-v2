import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface TableHeader {
  text: string;
  style?: string;
}

interface TableRow {
  [key: string]: string | number;
}

interface GeneratePDFOptions {
  title: string;
  headers: TableHeader[];
  rows: TableRow[];
}

export const generatePDF = ({ title, headers, rows }: GeneratePDFOptions) => {
  const fileName = `Reporte_${new Date()
    .toLocaleDateString()
    .replace(/\//g, "-")}.pdf`;
  const docDefinition: any = {
    content: [
      { text: title, style: "header" },
      {
        table: {
          headerRows: 1,
          widths: Array(headers.length).fill("*"),
          body: [
            headers.map((header) => header.text),
            ...rows.map((row) => headers.map((header) => row[header.text])),
          ],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black",
      },
    },
  };

  pdfMake.createPdf(docDefinition).download(fileName);
};

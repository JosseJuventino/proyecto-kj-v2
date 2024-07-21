import { useState } from "react";
import { getProjectByName } from "@/services/project.service";
import { generatePDF } from "@/utils/generatePDF";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProyectsAdminProps {
  header: string[];
  rows: (string | number)[][];
  showAction?: boolean;
  showCheckbox?: boolean;
}

const ProyectsAdmin: React.FC<ProyectsAdminProps> = ({
  header,
  rows,
  showAction,
  showCheckbox,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isFileNameModalOpen, setIsFileNameModalOpen] = useState(false);
  const [fileName, setFileName] = useState(
    `Reporte_${new Date().toLocaleDateString().replace(/\//g, '-')}`
  );
  const [selectedRowData, setSelectedRowData] = useState<
    (string | number)[] | null
  >(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleRowClick = (rowData: (string | number)[], rowIndex: number) => {
    setSelectedRowIndex(rowIndex === selectedRowIndex ? null : rowIndex);
    setSelectedRowData(rowData);
    setIsButtonDisabled(rowIndex === null);
  };

  const handleApprove = async () => {
    if (!selectedRowData) {
      return;
    }

    const projectName = selectedRowData[1] as string;

    try {
      const encodedProjectName = encodeURIComponent(projectName);
      const response = await getProjectByName(encodedProjectName);
      console.log(response);
      setIsApprovalModalOpen(false);
    } catch (error) {
      console.error("Error al aprobar el proyecto:", error);
    }
  };

  const handleGeneratePDF = () => {
    const title = 'Reporte de proyectos';
    const headers = header.map(h => ({ text: h }));
    const rowsData = rows.map(row => {
      const rowObj: { [key: string]: string | number } = {};
      header.forEach((h, i) => {
        rowObj[h] = row[i];
      });
      return rowObj;
    });

    generatePDF({ title, headers, rows: rowsData });
    setIsFileNameModalOpen(false);
  };

  return (
    <>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setIsFileNameModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generar PDF
          <i className="ml-2 fa-solid fa-file-pdf"></i>
        </button>
        <button
          onClick={() => setIsApprovalModalOpen(true)}
          disabled={isButtonDisabled}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
        >
          Aprobar
          <i className="ml-2 fa-solid fa-check"></i>
        </button>
      </div>

      {isApprovalModalOpen && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Aprobar Proyecto</h2>
            <p className="mb-4">¿Está seguro de que desea aprobar el proyecto seleccionado?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsApprovalModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleApprove}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Aprobar
              </button>
            </div>
          </div>
        </div>
      )}

      {isFileNameModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Ingrese el nombre del archivo</h2>
            <input
              type="text"
              placeholder="Nombre del archivo"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsFileNameModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleGeneratePDF}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Generar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto cursor-pointer">
        <div className="min-w-full bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
          <Table className="min-w-full">
            <TableHeader className="bg-gray-100">
              <TableRow>
                {header.map((column, index) => (
                  <TableHead key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {column}
                  </TableHead>
                ))}
                {showAction && <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((rowData, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  onClick={() => handleRowClick(rowData, rowIndex)}
                  className={`${rowIndex === selectedRowIndex ? "bg-gray-300" : ""}`}
                >
                  {rowData.map((cellData, cellIndex) => (
                    <TableCell key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cellData}
                    </TableCell>
                  ))}
                  {showCheckbox && (
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                      />
                    </TableCell>
                  )}
                  {showAction && (
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <i className="fa-solid fa-eye-slash"></i>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ProyectsAdmin;

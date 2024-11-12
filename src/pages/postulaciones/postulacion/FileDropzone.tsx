import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FaFilePdf, FaFileWord, FaTrash } from 'react-icons/fa';
import { PDFDocument } from 'pdf-lib';

interface FileItem {
  id: string;
  file: File;
  preview: string;
}

const ItemType = 'FILE';

const FileDropzone: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: URL.createObjectURL(file),
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const moveFile = (dragIndex: number, hoverIndex: number) => {
    const updatedFiles = [...files];
    const [movedItem] = updatedFiles.splice(dragIndex, 1);
    updatedFiles.splice(hoverIndex, 0, movedItem);
    setFiles(updatedFiles);
  };

  const removeFile = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const mergeFiles = async () => {
    const mergedPdf = await PDFDocument.create();
    for (const file of files) {
      const pdf = await PDFDocument.load(await file.file.arrayBuffer());
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }
    const mergedPdfFile = await mergedPdf.save();
    const blob = new Blob([mergedPdfFile], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'merged.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const downloadSingleFile = (file: FileItem) => {
    const url = URL.createObjectURL(file.file);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', file.file.name);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-yellow-100 border border-yellow-400 rounded-lg my-5 p-4">
        <p className="text-yellow-800 font-semibold">
          ADVERTENCIA: Debe ordenar los archivos en el siguiente orden:
        </p>
        <ol className="list-decimal list-inside text-gray-700">
          <li>DATOS GENERALES</li>
          <li>EXPERIENCIA LABORAL</li>
          <li>TITULOS O CERTIFICADOS</li>
          <li>REPORTE DE SUNEDU</li>
          <li>CURSOS DE ESPECIALIZACION</li>
          <li>EXPERIENCIA LABORAL</li>
          <li>DECLARACIÓN JURADA DE NO TENER INCOMPATIBILIDAD LEGAL NI HORARIA</li>
          <li>DECLARACIÓN JURADA DE NO TENER INCOMPATIBILIDAD POR PARENTESCO CUARTO GRADO DE CONSANGUINIDAD Y SEGUNDO DE AFINIDAD</li>
          <li>DECLARACIÓN JURADA DE NO TENER ANTECEDENTES PENALES JUDICIALES NI SANCIÓN POR FALTA ADMINISTRATIVA DISCIPLINARIA</li>
          <li>CERTIADULTO</li>
          <li>CARNET DE VACUNACION</li>
          <li>VOUCHER DE PAGO</li>
        </ol>
      </div>

      <div
        {...getRootProps()}
        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
      >
        <input {...getInputProps()} />
        <p className="text-center text-gray-500">
          Arrastre y suelte sus archivos aquí, o presione para seleccionar sus archivos
        </p>
      </div>

      <div className="mt-4">
        {files.map((file, index) => (
          <DraggableFileItem
            key={file.id}
            index={index}
            file={file}
            moveFile={moveFile}
            removeFile={removeFile}
            downloadSingleFile={downloadSingleFile}
          />
        ))}
      </div>

      <button
        onClick={() => (files.length > 1 ? mergeFiles() : downloadSingleFile(files[0]))}
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {files.length > 1 ? 'Unir Archivos PDF' : 'Descargar Archivo'}
      </button>
    </DndProvider>
  );
};

interface DraggableFileItemProps {
  file: FileItem;
  index: number;
  moveFile: (dragIndex: number, hoverIndex: number) => void;
  removeFile: (id: string) => void;
  downloadSingleFile: (file: FileItem) => void; // Add this prop
}

const DraggableFileItem: React.FC<DraggableFileItemProps> = ({
  file,
  index,
  moveFile,
  removeFile,
  downloadSingleFile,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item: { index: number }) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;
      moveFile(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const renderIcon = () => {
      return <FaFilePdf className="w-7 h-7 text-red-500 me-2" />;
  };

  return (
    <div
      ref={ref}
      className={`flex items-center justify-between p-2 bg-white rounded-lg shadow-md mb-2 cursor-move ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center">
        {renderIcon()}
        <p className="text-gray-700">{file.file.name}</p>
      </div>
      <button
        onClick={() => removeFile(file.id)}
        className="mx-2 text-red-500 hover:text-red-700"
        title="Eliminar archivo"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default FileDropzone;

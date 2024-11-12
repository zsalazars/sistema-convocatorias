const PDFViewer = ({ pdfName }: { pdfName: string }) => {
  return (
    <div className="w-full h-[800px] overflow-hidden">
      <iframe
        src={`http://localhost:8080/media/${pdfName}`}
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="PDF Viewer"
      />
    </div>
  );
}

export default PDFViewer;
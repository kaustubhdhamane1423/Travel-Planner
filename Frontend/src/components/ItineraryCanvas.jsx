import React,{ useState } from 'react';
import Button from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ItineraryCanvas = () => {
  const [items, setItems] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    setItems([...items, data]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDelete = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const downloadPDF = async () => {
    const canvas = await html2canvas(document.querySelector("#itinerary-pdf"));
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save("itinerary.pdf");
  };

  return (
    <div className="w-2/3 p-4 bg-white rounded shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Itinerary</h2>
        <Button onClick={downloadPDF}>Download PDF</Button>
      </div>
      <div
        id="itinerary-pdf"
        className="border min-h-[500px] p-4 rounded bg-gray-50"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {items.length === 0 && (
          <p className="text-gray-400">Drag activities here...</p>
        )}
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white border p-2 my-2 rounded shadow flex justify-between"
          >
            <div>
              <div className="font-semibold">{item.title}</div>
              <div className="text-sm text-gray-500">{item.description}</div>
            </div>
            <button onClick={() => handleDelete(index)} className="text-red-500">×</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryCanvas;

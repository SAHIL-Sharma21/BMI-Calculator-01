import { History } from "@/services/history";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface UserHistoryProps {
  history: History[];
  setHistory: React.Dispatch<React.SetStateAction<History[]>>;
}

export const UserHistory = ({ history, setHistory }: UserHistoryProps) => {
  const clearHistory = () => {
    localStorage.removeItem("history");
    setHistory([]);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Your BMI Results", 20, 20);
  
    if (history.length > 0) {
      doc.setFontSize(12);
      let y = 40; // Start Y position for entries
  
      history.forEach((entry, idx) => {
        doc.text(`Entry ${idx + 1}:`, 20, y);
        y += 8; // Move down after the title
  
        doc.text(`Weight: ${entry.weight} KG`, 30, y);
        y += 6;
        doc.text(`Height: ${entry.height} M`, 30, y);
        y += 6;
        doc.text(`BMI: ${entry.bmi}`, 30, y);
        y += 10; // Add spacing between entries
      });
  
      doc.save("bmi_results.pdf");
    } else {
      console.error("No history found");
    }
  };

  return (
    <div className="w-[450px] bg-gray-800 shadow-lg p-6 rounded-lg mt-6">
      <h2 className="text-white text-xl font-bold text-center mb-4">
        BMI History
      </h2>

      {history.length > 0 ? (
        <div className="max-h-[300px] overflow-y-auto space-y-2">
          {history.map((entry, index) => (
            <div key={index} className="p-3 bg-gray-700 text-white rounded-lg">
              <p>Weight: {entry.weight} KG</p>
              <p>Height: {entry.height} M</p>
              <p>BMI: {entry.bmi}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-300 text-center">No history found</p>
      )}

      {history.length > 0 && (
        <>
            <Button
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-300"
            onClick={downloadPDF}
            >
                Download PDF
            </Button>


          <Button
            onClick={clearHistory}
            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-300"
          >
            Clear History
          </Button>
        </>
      )}
    </div>
  );
};

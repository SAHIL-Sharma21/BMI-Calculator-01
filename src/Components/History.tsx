import { History } from "@/services/history";
import { Button } from "@/components/ui/button";

interface UserHistoryProps {
    history: History[];
    setHistory: React.Dispatch<React.SetStateAction<History[]>>
}

export const UserHistory = ({history,setHistory}: UserHistoryProps) => {

    const clearHistory = () => {
        localStorage.removeItem("history");
        setHistory([]);
      };

  return (
    <div className="w-[450px] bg-gray-800 shadow-lg p-6 rounded-lg mt-6">
      <h2 className="text-white text-xl font-bold text-center mb-4">BMI History</h2>

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
        <Button
          onClick={clearHistory}
          className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-300"
        >
          Clear History
        </Button>
      )}
    </div>
  );
};

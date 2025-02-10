import { useState, useEffect } from "react";
import { InputForm } from "./Components/InputForm";
import { UserHistory } from "./Components/History";
import { History } from "@/services/history";

function App() {
  const [history, setHistory] = useState<History[]>([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("history") || "[]");
    setHistory(storedHistory);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center bg-gray-900 pt-10">
      <div className="flex gap-6"> {/* Makes components appear in one row */}
        <InputForm setHistory={setHistory} />
        <UserHistory history={history} setHistory={setHistory} />
      </div>
    </div>
  );
}

export default App;

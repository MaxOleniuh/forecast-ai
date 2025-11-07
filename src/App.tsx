import React from "react";
import Chat from "./components/Chat";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="text-center py-6 bg-blue-500 text-white text-xl font-bold">
        Forecast Question Analysis
      </header>
      <main className="p-4">
        <Chat />
      </main>
    </div>
  );
};

export default App;

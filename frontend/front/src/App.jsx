// src/App.jsx
import React, { useState } from "react";
import FlashcardContainer from "./components/FlashcardContainer";
import AdminDashboard from "./components/AdminDashboard";
import "./App.css";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleFlashcardAdded = () => {
    setRefresh(!refresh); // Toggle to refresh flashcards
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flashcards App</h1>
      </header>
      <main className="App-main">
        <FlashcardContainer refresh={refresh} />
        <AdminDashboard onFlashcardAdded={handleFlashcardAdded} />
      </main>
    </div>
  );
}

export default App;

// import React, { useState } from "react";
// import FlashcardContainer from "./components/FlashcardContainer";
// import AdminDashboard from "./components/AdminDashboard";
// import "./App.css";
// const App = () => {
//   const [refreshTrigger, setRefreshTrigger] = useState(0);

//   const handleFlashcardAdded = () => {
//     setRefreshTrigger((prev) => prev + 1); // Trigger a refresh
//   };

//   return (
//     <div>
//       <AdminDashboard onFlashcardAdded={handleFlashcardAdded} />
//       <FlashcardContainer refreshTrigger={refreshTrigger} />
//     </div>
//   );
// };

// export default App;

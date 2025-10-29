import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AddEntryPage from "./Pages/AddEntryPage";
import EntriesListPage from "./Pages/EntriesListPage";
import LoginPage from "./Pages/LoginPage"; // ✅ new import

function App() {
  const user = localStorage.getItem("user"); // check if logged in

  return (
    <Router>
      <Routes>
        {/* Login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={user ? <AddEntryPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/entries"
          element={user ? <EntriesListPage /> : <Navigate to="/login" />}
        />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

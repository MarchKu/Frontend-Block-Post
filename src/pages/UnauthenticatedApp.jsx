import { Routes, Route } from "react-router-dom";
import RegisterPage from "./RegisterPage.jsx";
import LoginPage from "./LoginPage.jsx"
function UnauthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedApp;

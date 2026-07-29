import { Routes, Route, useNavigate,Navigate } from "react-router-dom";
import AppLayout from "..//src/layouts/AppLayout.jsx";
import Landing from "../src/pages/Landing.jsx";
import Dashboard from "../src/pages/Dashbord.jsx";
import LabResults from "../src/pages/LabResult.jsx";
import Wellness from "../src/pages/Wellness.jsx";
import ScanAnalysis from "../src/pages/ScanAnalysis.jsx";
import CompareReports from "../src/pages/CompareReports.jsx";
import FindDoctors from "../src/pages/FindDoctors.jsx";
import Archive from "../src/pages/Archive.jsx";
import AIAssistant from "../src/pages/AIAsistant.jsx";
import FindCare from "../src/pages/FindCare.jsx";
import MedicineIdentifier from "../src/pages/MedicineIdentifier.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<AppLayout />}>
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/find-care" element={<FindCare />} />
        <Route path="/medicine-identifier" element={<MedicineIdentifier />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lab-results" element={<LabResults />} />
        <Route path="/wellness" element={<Wellness />} />
        <Route path="/scan-analysis" element={<ScanAnalysis />} />
        <Route path="/compare-reports" element={<CompareReports />} />
        <Route path="/doctors" element={<FindDoctors />} />
        <Route path="/archive" element={<Archive />} />

        <Route path="*" element={<Navigate to="/ai-assistant" replace />} />
      </Route>
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp />} />
      <Route
        path="*"
        element={
          <div className="notfound">
            <h1>404</h1>
            <p>This page doesn&apos;t exist.</p>
            <a href="/">Go home</a>
          </div>
        }
      />
    </Routes>
  );
}

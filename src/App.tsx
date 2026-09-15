import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import CollectionsPage from "./pages/CollectionsPage";
import ExplorePage from "./pages/ExplorePage";
import RocketDetailPage from "./pages/RocketDetailPage";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<ExplorePage />} />
        <Route path="/rockets/:id" element={<RocketDetailPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default App;

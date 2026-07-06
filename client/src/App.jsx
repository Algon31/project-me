import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./features/auth/components/ProtectedRoute";

import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Status from "./features/dashboard/pages/Status";
import Today from "./features/today/pages/Today";
import Analytics from "./features/analytics/pages/Analytics";
import Achievements from "./features/achievements/pages/Achievements";
import Notifications from "./features/notifications/pages/Notifications";
import Goals from "./features/goals/pages/Goals";
import Settings from "./features/settings/pages/Forge";
import NotFound from "./pages/NotFound";
import Landing from "./features/home/pages/Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/Status"
          element={
            <ProtectedRoute>
              <Status />
            </ProtectedRoute>
          }
        />

        <Route
          path="/today"
          element={
            <ProtectedRoute>
              <Today />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/achievements"
          element={
            <ProtectedRoute>
              <Achievements />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/goals"
          element={
            <ProtectedRoute>
              <Goals />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

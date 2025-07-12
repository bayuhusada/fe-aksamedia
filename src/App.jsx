import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EditProfile from './pages/EditProfile';
import NotFound from './pages/NotFound';
import ProtectedRoutes from './components/ProtectedRoutes';
import { isAuthenticated } from './utils/auth';
import CrudPages from './pages/CrudPages';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>

        <Route
          path="/"
          element={
            isAuthenticated()
              ? <Navigate to="/dashboard" />
              : <Login />
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoutes>
              <EditProfile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/data"
          element={
            <ProtectedRoutes>
              <CrudPages />
            </ProtectedRoutes>
          }
        />

        <Route path="/404" element={<NotFound />} />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;

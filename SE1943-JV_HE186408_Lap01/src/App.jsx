import './App.css'
import Login from '../src/page/Login.jsx'
import Layout from './page/Layout.jsx'
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import HomePage from './page/Home.jsx'
import ProtectedRoute from './security/ProtectedRoute.jsx';
import ManagePhamacy from './components/ManagePhamacy.jsx';
import AddPhamacy from './components/AddPhamacy.jsx';
import EditPhymacy from './components/EditPhamacy.jsx';
import PhamacyDetail from './components/PhamacyDetail.jsx';
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/manage-phamacy"
          element={
            <ProtectedRoute>
              <ManagePhamacy />
            </ProtectedRoute>
          }
        />
        <Route
          path="add-phamacy"
          element={
            <ProtectedRoute>
              <AddPhamacy />
            </ProtectedRoute>
          }
        />
        <Route
          path="edit-phamacy/:id"
          element={
            <ProtectedRoute>
              <EditPhymacy />
            </ProtectedRoute>
          }
        />
        <Route
          path="phamacy/:id"
          element={
            <ProtectedRoute>
              <PhamacyDetail />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

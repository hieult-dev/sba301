import './App.css'
import Login from '../src/page/Login.jsx'
import Layout from './page/Layout.jsx'
import ManageAgent from '../src/components/ManageAgent.jsx'
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import HomePage from './page/Home.jsx'
import ProtectedRoute from './security/ProtectedRoute.jsx';
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="agents" element={<ManageAgent />} />
      </Route>
    </Routes>
  );
}

import './App.css'
import Login from '../src/page/Login.jsx'
import Layout from './page/Layout.jsx'
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import HomePage from './page/Home.jsx'
import ProtectedRoute from './security/ProtectedRoute.jsx';
import ManageEmployee from './components/ManageEmployee.jsx';
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="employees" element={<ManageEmployee />} />
      </Route>
    </Routes>
  );
}

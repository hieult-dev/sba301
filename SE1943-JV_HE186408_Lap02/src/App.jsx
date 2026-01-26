import './App.css'
import Login from '../src/page/Login.jsx'
import Layout from './page/Layout.jsx'
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import HomePage from './page/Home.jsx'
import ProtectedRoute from './security/ProtectedRoute.jsx';
import ManageFood from './components/ManageFood.jsx';
import AddFood from './components/AddFood.jsx';
import EditFood from './components/EditFood.jsx';
import FoodDetail from './components/FoodDetail.jsx';
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/manage-food"
          element={
            <ProtectedRoute>
              <ManageFood />
            </ProtectedRoute>
          }
        />
        <Route
          path="add-food"
          element={
            <ProtectedRoute>
              <AddFood />
            </ProtectedRoute>
          }
        />
        <Route
          path="edit-food/:id"
          element={
            <ProtectedRoute>
              <EditFood />
            </ProtectedRoute>
          }
        />
        <Route
          path="food/:id"
          element={
            <ProtectedRoute>
              <FoodDetail />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

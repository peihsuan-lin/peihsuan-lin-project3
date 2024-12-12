import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  createRoutesFromElements
} from "react-router-dom";
import './index.css'
import HomePage from './components/Home.jsx'
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import UserPage from './components/User.jsx';
import Navbar from './components/Navbar.jsx';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 mt-20">
        <Outlet />
      </main>
    </>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/user/:username" element={<UserPage />} />
      <Route path='/' element={<HomePage />} />
    </Route>
  )
);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

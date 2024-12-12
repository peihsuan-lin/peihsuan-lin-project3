import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import HomePage from './components/Home.jsx'
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import UserPage from './components/User.jsx';

const router = createBrowserRouter([
  {
    path: '/home',
    element:
      <HomePage />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/user/:username',
    element: <UserPage />
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

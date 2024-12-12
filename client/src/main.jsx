import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import HomePage from './HomePage.jsx'
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import UserPage from './UserPage.jsx';

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

import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'


// const router = createBrowserRouter([{
//   element: <App />,
//   children: [
//     {
//       path: '/',
//       element:  <HomePage />,
//     },
//     {
//       path: '/profile',
//       element: <ProfilePage />,
//     }, 
//     {
//       path: '/settings',
//       element: <SettingsPage />,
//     }
//   ]
// },
// {
//   path: '/signup',
//   element: <SignUpPage />,
// },
// {
//   path: '/login',
//   element: <LoginPage />,
// },
// ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictMode>,
)

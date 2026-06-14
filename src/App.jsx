import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import GoogleProfile from './components/GoogleProfile'
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import UserAuth from './pages/UserAuth'
import Dashboard from './pages/Dashboard'
import AlbumDetails from './pages/AlbumDetails';
import ImageDetails from './pages/ImageDetails';


const router = createBrowserRouter([
  {
    path: '/',
    element: <UserAuth />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/album/:albumId',
    element: <AlbumDetails />,
  },
  {
    path: '/album/:albumId/image/:imageId',
    element: <ImageDetails />,
  },
  // {
  //   path: '/v2/profile/google',
  //   element: <GoogleProfile />,
  // },
])

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
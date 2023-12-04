import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import store from './store'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RegistrationPage from './Pages/RegistrationPage.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import './Firebaseconfigaration.jsx'

import 'react-toastify/dist/ReactToastify.css';
import ProfilePage from './Component/ProfilePage/ProfilePage.jsx'

const router = createBrowserRouter([
  {
    path: "/registration",
    element: <RegistrationPage></RegistrationPage>,
  },
  
  {
    path: "/login",
    element:<LoginPage></LoginPage> ,
  },
  {
    path: "/Profile",
    element: <ProfilePage></ProfilePage>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />

    </Provider>

  </React.StrictMode>

)

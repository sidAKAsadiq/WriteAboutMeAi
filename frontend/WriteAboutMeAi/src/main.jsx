import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register_page from './pages/Register_page.jsx'
import Home_page from './pages/Home_page.jsx'
import Login_page from './pages/Login_page.jsx'
import Logout from './components/Logout.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Protected from './components/Protected.jsx'
import Generate_about_me_page from './pages/Generate_about_me_page.jsx'
import History_page from './pages/History_page.jsx'

const router = createBrowserRouter([
  {
    path : '/',
    element : <App />,
    children : [
      {
        path : '/',
        element : <Home_page />
      },
      {
        path : '/register',
        element : (
         // <Protected authentication = {false} >
            <Register_page />
          //</Protected>
        ),
      },
      {
        path : '/login',
        element : (
         // <Protected authentication = {false}>
            <Login_page />
          //</Protected>
        ),
      },
      {
        path : '/logout',
        element : (
         // <Protected authentication = {false}>
            <Logout />
          //</Protected>
        ),
      },
      {
        path : '/generate_about_me',
        element : (
         // <Protected authentication = {true}> 
            <Generate_about_me_page />
          //</Protected>
        )
      },
      {
        path : '/history',
        element : (
         // <Protected authentication = {true}> 
            <History_page />
          //</Protected>
        )
      },      
    ]
  }
])






createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider  router = {router} />
    </Provider>
)

import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import UserPosts from './Components/UserPosts/UserPosts.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes.jsx'
import ProtectedAuth from './Components/ProtectedAuth/ProtectedAuth.jsx'

function App() {

  let router = createBrowserRouter([
    {path: '', element: <Layout/> , children: [
      {index:true , element:<ProtectedRoutes><Home/></ProtectedRoutes>},
      {path:'userPosts' , element:<ProtectedRoutes><UserPosts/></ProtectedRoutes>},

      {path:'login' , element:<ProtectedAuth><Login/></ProtectedAuth>},
      {path:'register' , element:<ProtectedAuth><Register/></ProtectedAuth>},

      {path:'*' , element: <NotFound/>},
    ]}
  ])
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  ) 
}

export default App

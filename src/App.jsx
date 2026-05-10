import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PostDetails from './Components/PostDetails/PostDetails.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import UserPosts from './Components/UserPosts/UserPosts.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes.jsx'
import ProtectedAuth from './Components/ProtectedAuth/ProtectedAuth.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {

  const queryClient = new QueryClient();

  let router = createBrowserRouter([
    {path: '', element: <Layout/> , children: [
      {index:true , element:<ProtectedRoutes><Home/></ProtectedRoutes>},
      {path:'userPosts' , element:<ProtectedRoutes><UserPosts/></ProtectedRoutes>},
      {path: 'postDetails/:id', element: <ProtectedRoutes><PostDetails/></ProtectedRoutes>}, // ← add this


      {path:'login' , element:<ProtectedAuth><Login/></ProtectedAuth>},
      {path:'register' , element:<ProtectedAuth><Register/></ProtectedAuth>},

      {path:'*' , element: <NotFound/>},
    ]}
  ])
  return (
      <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </>
  ) 
}

export default App;

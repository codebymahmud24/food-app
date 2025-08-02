import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./auth/Login";
import { Register } from "./auth/Register";
import MainLayout from "./layout/MainLayout";
import { ForgatPassword } from "./auth/ForgatPassword";
import { VerifyEmail } from "./auth/VerifyEmail";
import { ResetPassword } from "./auth/ResetPassword";
import HeroSection from "./components/HeroSection";
import Profile from "./components/Profile";
import SearchPage from "./components/SearchPage";


const App = () => {
  // MainLayout and also it has some children routes likes profile, settings, etc.
  // If  uer is not logged in, redirect to login page
  // If user is logged in, show the main layout with children routes
  const router = createBrowserRouter([
    {
      path:"/",
      element: <MainLayout />,
      children: [
        {
          path:"/",
          element: <HeroSection />
        },
        {
          path:"/profile",
          element: <Profile />
        },
        {
          path:"/search/:searchText",
          element: <SearchPage />
        }
      ]
    },
    {
      path:"/login",
      element: <Login />
    },
    {
      path:"/register",
      element: <Register />
    },{
      path:"/forgot-password",
      element: <ForgatPassword />
    },
    {
      path: "/verify-email",
      element: <VerifyEmail />
    },
    {
      path: "/reset-password",
      element: <ResetPassword />
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
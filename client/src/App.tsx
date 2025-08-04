import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./auth/Login";
import { Register } from "./auth/Register";
import MainLayout from "./layout/MainLayout";
import { ForgatPassword } from "./auth/ForgatPassword";
import { VerifyEmail } from "./auth/VerifyEmail";
import { ResetPassword } from "./auth/ResetPassword";
import HeroSection from "./components/HeroSection";
import Profile from "./components/Profile";
import SearchPage from "./components/SearchPage";
import RestaurantDetail from "./components/RestaurantDetail";
import Cart from "./components/Cart";
import {Toaster} from "react-hot-toast"
import Restaurant from "./admin/Restaurant";
import AddMenu from "./admin/AddMenu";
import Orders from "./admin/Orders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search/:searchText",
        element: <SearchPage />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path:"/admin/restaurant",
        element:<Restaurant />
      },
      {
        path:"/admin/menu",
        element:<AddMenu />
      },
      {
        path:"/admin/orders",
        element: <Orders />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgatPassword />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);


const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;
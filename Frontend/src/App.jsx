import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetail from "./pages/ProductDetail";
import ProductList from './admin/ProductList';
import AddProduct from './admin/AddProduct';
import EditProduct from './admin/EditProduct';


const router = createBrowserRouter([
  //pages for website...
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/products/:id", element: <ProductDetail /> },

  //admin route path
  { path: "/admin/products", element: <ProductList /> },
  { path: "/admin/products/add", element: <AddProduct /> },
  { path: "/admin/products/edit/:id", element: <EditProduct /> }
]);

export default function App() {
  return <RouterProvider router={router} />;
}

import "./App.css";
import Criteria from "./Components/Criteria";
import Home from "./Components/Home";
import Layout from "./Components/Layout";
import MoreDetails from "./Components/MoreDetails";
import Context from "./StockContext/Context";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/criteria/:id",
          element: <Criteria />,
        },
        {
          path: "/moredetails/:id/:variable",
          element: <MoreDetails />,
        },
      ],
    },
  ]);

  return (
    <Context>
      <RouterProvider router={router} />
    </Context>
  );
}

export default App;

import { RouterProvider } from "react-router";
import { router } from "./constants/Routes.jsx";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer theme="colored" />
    </>
  );
};

export default App;

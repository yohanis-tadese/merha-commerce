import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Lists from "./pages/Lists";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { AuthContext } from "./context/authContext";
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { token, setToken } = useContext(AuthContext);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <>
          <Navbar setToken={setToken} />
          <div className="flex w-full gap-7">
            <Sidebar />
            <div className="flex-1 p-4">
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute roles={["admin"]}>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/add-item"
                  element={
                    <ProtectedRoute roles={["admin"]}>
                      <Add />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/list-items"
                  element={
                    <ProtectedRoute roles={["admin"]}>
                      <Lists />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute roles={["admin"]}>
                      <Orders />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;

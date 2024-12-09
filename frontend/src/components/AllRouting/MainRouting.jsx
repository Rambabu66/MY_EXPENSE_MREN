import React, { Suspense, useState,lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../creditionals/Login";
import Registers from "../creditionals/Registers";
import RefreshHandler from "../MainPages/RefreshHandler";
const Home = lazy(() => import("../MainPages/Home/Home"));

const MainRouting = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({ element }) => {
    // Your authentication logic goes here...

    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route
          path="/login"
          element={
            
              <Login />
              
          }
        />
        <Route
          path="/signup"
          element={
           
              <Registers />
            
          }
        />

        <Route
          path="/home"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PrivateRoute element={<Home />} />
              </Suspense>
          }
        />
      </Routes>
    </>
  );
};

export default MainRouting;

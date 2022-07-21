import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { FC, lazy, Suspense } from "react";
import Loader from "./components/UI/Loader/Loader";
import Home from "./pages/Home";

const Login = lazy(
  () => import(/* webpackChunkName: "Login" */ "./pages/Login/Login")
);

const App: FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<MainLayout />}>
        <Route
          path={"login"}
          element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          }
        />
        <Route path={"/"} element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;

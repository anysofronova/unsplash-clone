import { FC, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages";
import { MainLayout } from "./layouts";
import { Loader } from "./components";

const Login = lazy(() =>
  import("./pages").then((module) => ({ default: module.Login }))
);
const NotFound = lazy(() =>
  import("./pages").then((module) => ({ default: module.NotFound }))
);

const App: FC = () => {
  return (
    <Routes>
      <Route path={""} element={<MainLayout />}>
        <Route
          path={"/login"}
          element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          }
        />
        <Route path={"/home"} element={<Home />} />
        <Route
          path={"/notFound"}
          element={
            <Suspense fallback={<Loader />}>
              <NotFound />
            </Suspense>
          }
        />
        <Route path={"/"} element={<Home />} />
        <Route path={"*"} element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;

import React from "react";
import { observer } from "mobx-react-lite";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Login from "./containers/login";
import Todo from "./containers/todo";

interface Props {}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/todo" element={<Todo />} />
    </Route>
  )
);

const App: React.FC<Props> = observer(() => {
  // return <Login />;
  return <RouterProvider router={router} />;
});

export default App;

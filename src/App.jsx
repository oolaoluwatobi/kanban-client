import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout, {loader as layoutLoader} from "./components/Layout";
import HomePage from "./pages/HomePage";
import CreateTaskPage, {
  loader as createTaskPageLoader,
  action as createTaskPageAction,
} from "./pages/CreateTaskPage";
import EditTaskPage, {action as editTaskPageAction, loader as editTaskPageLoader } from "./pages/EditTaskPage";
import Destroy, {action as destroyAction} from "./components/Destroy";
import TaskDetailsPage, { action as taskDetailsPageAction, loader as taskDetailsPageLoader} from "./pages/TaskDetailsPage";
import ErrorPage from "./pages/ErrorPage";
import HomePageLogo from "./components/HomePageLogo";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} loader={layoutLoader} 
    errorElement={<ErrorPage />} >
      <Route path="/" element={<HomePage />} >
        <Route index element={<HomePageLogo />} />
        <Route
          path="add/task"
          element={<CreateTaskPage />}
          loader={createTaskPageLoader}
          action={createTaskPageAction}
          errorElement={<ErrorPage />}
        />
        <Route
          path="tasks/:id/edit"
          // key={loaderData.status}
          element={<EditTaskPage />}
          loader={editTaskPageLoader}
          action={editTaskPageAction}
          errorElement={<ErrorPage />}
        />
        <Route
          path="tasks/:id"
          element={<TaskDetailsPage />}
          loader={taskDetailsPageLoader}
          action={taskDetailsPageAction}
          errorElement={<ErrorPage />}
        />
        <Route
          path="tasks/:id/destroy"
          element={<Destroy />}
          action={destroyAction}
          errorElement={<ErrorPage />}
        />

      </Route>
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AdminHome from "./pages/Admin/AdminHome.tsx";
import HomePage from "./pages/Global/HomePage.tsx";
import ListStudent from "./pages/Global/ListStudent.tsx";
import Schedule from "./pages/Global/Schedule.tsx";
import Score from "./pages/Global/Score.tsx";
import Setting from "./pages/Global/Setting.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Main from "./pages/Main.tsx";
import SignUp from "./pages/SignUp.tsx";
import {
  getListStudent,
  getValueOfCookie,
  goToHome,
  showErrorMessage,
} from "./scripts/Function.ts";
const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<Main />}>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="home" element={<Home />}>
        <Route path="list" element={<ListStudent />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="score" element={<Score />} />
        <Route path="setting" element={<Setting />} />
        <Route path="student" element={<HomePage />} />
      </Route>
      <Route path="admin" element={<AdminHome />} />
    </Route>
    <Route path="admin" element={<AdminHome />} />
  </>,
);
declare global {
  interface Window {
    getListStudent: (message: string) => void;
    getValueOfCookie(name: string): string;
    goToHome: () => void;
    showErrorMessage: (message: string) => void;
  }
}
window.getListStudent = getListStudent;
window.getValueOfCookie = getValueOfCookie;
window.goToHome = goToHome;
window.showErrorMessage = showErrorMessage;
const router = createBrowserRouter(routes);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer
      autoClose={2000}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
    />
    <RouterProvider router={router} />
  </React.StrictMode>,
);

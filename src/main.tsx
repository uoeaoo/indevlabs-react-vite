import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DashboardPage from "./pages/DashboardPage.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskPage from "./pages/TaskPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/task/:id" element={<TaskPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

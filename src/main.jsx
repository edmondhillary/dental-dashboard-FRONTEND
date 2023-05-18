import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UsersProvider } from "./context/UserContext/UsersState";
import { TreatmentsProvider } from "./context/TreatmentsContext/TreatmentState";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TreatmentsProvider>
    <UsersProvider>
      <App />
    </UsersProvider>
  </TreatmentsProvider>
);

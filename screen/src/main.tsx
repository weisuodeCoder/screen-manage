import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@/assets/fonts/index.css";
import App from "./App.tsx";
import "./assets/animate.min.css";
import "@ant-design/v5-patch-for-react-19";

createRoot(document.getElementById("root")!).render(<App />);

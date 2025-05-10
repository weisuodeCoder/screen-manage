import { useState } from "react";
import "./App.css";
import Home from "./views/home/Home";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <>
      <Home />
    </>
  );
}

export default App;

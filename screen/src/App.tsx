import "./App.css";
import Pie from "./components/pie/Pie";
import GradientLine from "./components/gradientLine/GradientLine";
import FadeLine from "./components/fadeInLine/FadeLine";
import ReleaseBar from "./components/releaseBar/ReleaseBar";
import HorizontalBar from "./components/horizontalBar/HorizontalBar";
import ThreeDPie from "./components/3dPie/ThreeDPie";

function App() {
  return (
    <>
      <Pie />
      <GradientLine />
      <FadeLine />
      <ReleaseBar />
      <HorizontalBar />
      <ThreeDPie />
    </>
  );
}

export default App;

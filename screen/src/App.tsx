import './App.css'
import Pie from './components/pie/Pie'
import GradientLine from './components/gradientLine/GradientLine'
import FadeLine from './components/fadeInLine/FadeLine'
import ReleaseBar from './components/releaseBar/ReleaseBar'
import HorizontalBar from './components/horizontalBar/HorizontalBar'
import ThreeDPie from './components/3dPie/ThreeDPie'
import SmallContent from './components/smallContent/SmallContent'
import Modal from './components/modal/Modal'
import Example from "./views/example";
import { useState } from 'react'
function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <>
      <Pie />
      <GradientLine />
      <FadeLine />
      <ReleaseBar />
      <HorizontalBar />
      <ThreeDPie />
      <Example />
      <SmallContent data={[
        { name: 'A', value: 30 },
        { name: 'B', value: 20 },
        { name: 'C', value: 50 },
      ]} />
      <button onClick={toggleModal}>打开弹窗</button>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <div style={{ color: 'white', padding: '20px' }}>
          我是内容
        </div>
      </Modal>
    </>
  )
}

export default App;

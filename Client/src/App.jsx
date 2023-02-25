import { Canvas } from '@react-three/fiber';
import './App.css';
import Star from './components/Star';
import Box from './components/Box'

function App() {
  return (
    <div className="App">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Star position={[-1, 0, 2]} ></Star>
      </Canvas>
    </div>
  );
}

export default App;

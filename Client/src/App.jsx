import { Canvas, useThree, CubeTextureProps } from '@react-three/fiber';
import './App.css';
import Star from './components/Star';
import * as THREE from 'three';
import { CameraControls, FlyControls, OrbitControls } from '@react-three/drei';

export default function App() {


  return (
    <div className="h-screen w-screen">
      <Canvas>
      <ambientLight intensity={0.5} />
      <mesh scale={20}>
        <torusGeometry args={[1, 0.25, 32, 100]} />
        <meshStandardMaterial />
      </mesh>
      <FlyControls />
     </Canvas>
    </div>
  );
}
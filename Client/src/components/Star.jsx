import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"

export default function Star(props) {
    const ref = useRef()
    const [hovered, hover] = useState(false)
   
    return (
      <mesh
        {...props}
        ref={ref}
        scale={1}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <sphereGeometry args={[1, 20, 20, 20, 10]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
  }
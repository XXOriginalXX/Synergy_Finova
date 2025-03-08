import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";
import * as THREE from "three";

const GradientMaterial = () => {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
          gl_FragColor = mix(vec4(0.0, 0.0, 0.5, 1.0), vec4(0.5, 0.8, 1.0, 1.0), vUv.y);
        }
      `,
    });
  }, []);

  return material;
};

const RotatingCube = () => {
  const cubeRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.005;
      cubeRef.current.rotation.y += 0.005;
    }
  });

  const material = GradientMaterial();

  return (
    <Box ref={cubeRef} args={[2, 2, 2]}>
      <primitive attach="material" object={material} />
    </Box>
  );
};

const HolographicCube = () => {
  return (
    <div className="w-full h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 4] }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[5, 5, 5]} intensity={2} />
        <RotatingCube />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default HolographicCube;

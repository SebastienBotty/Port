import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function DistortedShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.rotation.x += delta * 0.15;
    mesh.rotation.y += delta * 0.2;
    mesh.rotation.x += state.pointer.y * 0.0006;
    mesh.rotation.y += state.pointer.x * 0.0006;
  });

  return (
    <Icosahedron ref={meshRef} args={[1.4, 4]}>
      <MeshDistortMaterial
        color="#8a5cf6"
        distort={0.4}
        speed={1.5}
        roughness={0.25}
        metalness={0.5}
      />
    </Icosahedron>
  );
}

function Hero3D() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.2} />
      <Suspense fallback={null}>
        <DistortedShape />
      </Suspense>
    </Canvas>
  );
}

export default Hero3D;

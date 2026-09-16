import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export const GoldCoinModel = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.5;
      ref.current.rotation.y += delta * 1;
    }
  });
  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.2, 32]} />
        <meshStandardMaterial color="#F59E0B" metalness={0.7} roughness={0.2} />
      </mesh>
    </Float>
  );
};

export const CrystalModel = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.8;
      ref.current.rotation.z += delta * 0.3;
    }
  });
  return (
    <Float speed={2} rotationIntensity={3} floatIntensity={3}>
      <mesh ref={ref}>
        <octahedronGeometry args={[1.2]} />
        <meshPhysicalMaterial color="#3B82F6" transparent opacity={0.8} roughness={0} metalness={0.1} transmission={1} />
      </mesh>
    </Float>
  );
};

export const TorusModel = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.4;
      ref.current.rotation.y += delta * 0.6;
    }
  });
  return (
    <Float speed={2} rotationIntensity={4} floatIntensity={2}>
      <mesh ref={ref}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <meshStandardMaterial color="#10B981" metalness={0.5} roughness={0.2} />
      </mesh>
    </Float>
  );
};

export const SparkleModel = () => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state, delta) => {
      if (ref.current) {
        ref.current.rotation.y += delta;
        ref.current.rotation.z += delta * 1.5;
        ref.current.scale.setScalar(Math.sin(state.clock.elapsedTime * 2) * 0.2 + 0.8);
      }
    });
    return (
      <Float speed={4} rotationIntensity={5} floatIntensity={3}>
        <mesh ref={ref}>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial color="#FBBF24" transparent opacity={0.9} roughness={0} metalness={0.8} transmission={0.5} />
        </mesh>
      </Float>
    );
};

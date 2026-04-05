"use client";

import * as THREE from "three";
import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { usePerformance } from "@/hooks/usePerformance";

function StarField() {
  const ref = useRef<THREE.Points>(null);
  const { lowPowerMode } = usePerformance();
  
  const [positions] = useState<Float32Array>(() => {
    const count = lowPowerMode ? 1000 : 5000;
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  });

  useFrame((_state, delta) => {
    if (ref.current && !lowPowerMode) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute
            args={[positions, 3]}
            attach="attributes-position"
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          color="#6C63FF"
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <StarField />
      </Canvas>
    </div>
  );
}

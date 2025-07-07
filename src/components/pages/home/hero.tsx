'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Torus } from '@react-three/drei';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function RotatingTorus() {
  const torusRef = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.001;
      torusRef.current.rotation.y += 0.002;
    }
  });

  return (
    <Torus ref={torusRef} args={[3, 0.2, 16, 100]} position={[0, 0, 0]}>
      <meshStandardMaterial color="hsl(var(--primary))" emissive="hsl(var(--primary))" emissiveIntensity={2} wireframe />
    </Torus>
  );
}

export function Hero() {
  return (
    <section className="relative h-[80vh] w-full bg-transparent">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="hsl(var(--accent))" intensity={100} />
          <pointLight position={[-10, -10, -10]} color="hsl(var(--secondary))" intensity={100} />
          
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

          <RotatingTorus />

          <Text
            position={[0, 0.5, 0]}
            fontSize={1}
            color="hsl(var(--foreground))"
            anchorX="center"
            anchorY="middle"
            castShadow
          >
            CampusConnect
          </Text>
          <Text
            position={[0, -0.5, 0]}
            fontSize={0.25}
            color="hsl(var(--muted-foreground))"
            anchorX="center"
            anchorY="middle"
            maxWidth={4}
            textAlign="center"
          >
            Empowering Innovators. Building The Future.
          </Text>

          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
       <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10">
          <Button size="lg" variant="outline" asChild>
              <Link href="/events">Explore Events</Link>
          </Button>
       </div>
    </section>
  );
}

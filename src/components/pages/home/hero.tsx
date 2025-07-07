'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Torus } from '@react-three/drei';
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
       <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center pointer-events-none">
        <h1 className="text-6xl font-headline text-foreground drop-shadow-[0_0_10px_hsl(var(--primary))]">
          CampusConnect
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Empowering Innovators. Building The Future.
        </p>
      </div>
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="hsl(var(--accent))" intensity={100} />
          <pointLight position={[-10, -10, -10]} color="hsl(var(--secondary))" intensity={100} />
          
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

          <RotatingTorus />

          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
       <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20">
          <Button size="lg" variant="outline" asChild>
              <Link href="/events">Explore Events</Link>
          </Button>
       </div>
    </section>
  );
}

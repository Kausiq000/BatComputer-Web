"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, Float, OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

// 1. This component loads the actual GLTF file
function BatmanModel() {
    const { scene } = useGLTF("/batman-model/scene.gltf");
    const modelRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (modelRef.current) {
            modelRef.current.rotation.y += delta * 0.2;
        }
    });

    // Massively increased scale per user request
    return <primitive ref={modelRef} object={scene} scale={0.025} position={[1.5, -4.5, 0]} />;
}

// 2. This is the main Canvas wrapper we export to the page
export default function BatmanCanvas() {
    return (
        <div className="w-full h-screen absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                <Suspense fallback={
                    <Html center position={[1.5, 0, 0]}>
                        <div className="flex items-center justify-center text-yellow-500 text-2xl md:text-3xl font-black tracking-widest animate-pulse z-0 whitespace-nowrap pl-10 md:pl-40" style={{ fontFamily: "var(--font-oswald)" }}>
                            BATCOMPUTER INITIATED...
                        </div>
                    </Html>
                }>
                    <color attach="background" args={["#050505"]} />
                    <OrbitControls enableZoom={false} enablePan={false} />
                    <Environment preset="city" />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    
                    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                        <BatmanModel />
                    </Float>

                    <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} />
                </Suspense>
            </Canvas>
        </div>
    );
}
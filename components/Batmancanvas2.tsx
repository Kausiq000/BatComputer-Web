"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float, OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

// 1. Load the actual GLTF file
function BatmanModel2() {
    // Note: ensure /batman-model2 exists in public folder
    const { scene } = useGLTF("/batman-model2/scene.gltf"); 
    const modelRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (modelRef.current) {
            // Optional slow rotation
            modelRef.current.rotation.y += delta * 0.1;
        }
    });

    // Massively increased scale per user request
    return <primitive ref={modelRef} object={scene} scale={0.045} position={[0, -7, 0]} />;
}

// 2. High-Performance Canvas Wrapper
export default function BatmanCanvas2() {
    return (
        <div className="w-full h-full absolute inset-0 z-0">
            {/* CRITICAL 60FPS FIX: dpr and gl settings */}
            <Canvas 
                camera={{ position: [0, 0, 10], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, powerPreference: "high-performance" }}
            >
                <Suspense fallback={
                    <Html center>
                        <div className="flex items-center justify-center text-[#facc15] text-xl font-bold tracking-widest animate-pulse whitespace-nowrap" style={{ fontFamily: "var(--font-oswald)" }}>
                            LOADING TACTICAL SUIT SCHEMATIC...
                        </div>
                    </Html>
                }>
                    <color attach="background" args={["#050505"]} />
                    {/* Restrict camera angles to prevent looking under the floor */}
                    <OrbitControls 
                        enableZoom={false} 
                        enablePan={false} 
                        maxPolarAngle={Math.PI / 2} 
                        minPolarAngle={Math.PI / 2} 
                        autoRotate
                        autoRotateSpeed={0.5}
                    />
                    <Environment preset="city" />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    
                    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                        <BatmanModel2 />
                    </Float>
                </Suspense>
            </Canvas>
        </div>
    );
}

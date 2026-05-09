'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  Environment, 
  Float, 
  MeshDistortMaterial,
  Sparkles,
} from '@react-three/drei'
import { 
  EffectComposer, 
  Bloom, 
  ChromaticAberration,
  Vignette,
  Noise,
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

function Monolith() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1 + state.clock.elapsedTime * 0.05
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.02
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} scale={[1.2, 2.5, 0.3]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1, 32, 32, 32]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#0a0a0a"
          roughness={0.1}
          metalness={0.95}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  )
}

function ChromeSphere({ position, scale }: { position: [number, number, number], scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.2
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#ffffff"
          roughness={0}
          metalness={1}
          envMapIntensity={3}
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  )
}

function FloatingRing({ position, rotation, scale }: { position: [number, number, number], rotation: [number, number, number], scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = rotation[2] + state.clock.elapsedTime * 0.2
      meshRef.current.rotation.x = rotation[0] + Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <torusGeometry args={[1, 0.02, 16, 100]} />
      <meshStandardMaterial
        color="#ffffff"
        roughness={0.2}
        metalness={0.9}
        emissive="#ffffff"
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

function Particles() {
  const count = 500
  const particlesRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.005
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function CameraController() {
  const { camera, pointer } = useThree()
  
  useFrame(() => {
    camera.position.x += (pointer.x * 0.5 - camera.position.x) * 0.02
    camera.position.y += (pointer.y * 0.3 - camera.position.y) * 0.02
    camera.lookAt(0, 0, 0)
  })

  return null
}

function Scene() {
  return (
    <>
      <CameraController />
      
      {/* Lighting */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={0.3} color="#ffffff" />
      <spotLight
        position={[0, 10, 0]}
        intensity={0.5}
        angle={0.3}
        penumbra={1}
        castShadow
      />

      {/* Main monolith */}
      <Monolith />

      {/* Chrome spheres */}
      <ChromeSphere position={[-3, 0.5, -1]} scale={0.4} />
      <ChromeSphere position={[3.5, -0.3, -2]} scale={0.25} />
      <ChromeSphere position={[2, 1.5, 1]} scale={0.15} />

      {/* Floating rings */}
      <FloatingRing position={[0, 0, 0]} rotation={[Math.PI / 3, 0, 0]} scale={2.5} />
      <FloatingRing position={[0, 0, 0]} rotation={[Math.PI / 2.5, Math.PI / 4, 0]} scale={3} />
      <FloatingRing position={[0, 0, 0]} rotation={[-Math.PI / 4, Math.PI / 3, 0]} scale={3.5} />

      {/* Particles */}
      <Particles />
      <Sparkles
        count={100}
        scale={15}
        size={1}
        speed={0.3}
        opacity={0.3}
        color="#ffffff"
      />

      {/* Environment */}
      <Environment preset="night" />
      <fog attach="fog" args={['#000000', 5, 25]} />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0005, 0.0005)}
        />
        <Vignette darkness={0.5} offset={0.3} />
        <Noise opacity={0.02} blendFunction={BlendFunction.OVERLAY} />
      </EffectComposer>
    </>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}

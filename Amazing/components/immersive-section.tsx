'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  Float, 
  MeshDistortMaterial,
  Environment,
  Sparkles,
} from '@react-three/drei'
import { 
  EffectComposer, 
  Bloom, 
  Vignette,
} from '@react-three/postprocessing'
import * as THREE from 'three'
import { motion, useScroll, useTransform } from 'framer-motion'

function WireframeTunnel() {
  const tunnelRef = useRef<THREE.Group>(null)
  const rings: { z: number; scale: number }[] = []
  
  for (let i = 0; i < 30; i++) {
    rings.push({ z: -i * 2, scale: 1 + i * 0.1 })
  }

  useFrame((state) => {
    if (tunnelRef.current) {
      tunnelRef.current.children.forEach((ring, i) => {
        ring.rotation.z = state.clock.elapsedTime * 0.1 + i * 0.1
        const mesh = ring as THREE.Mesh
        mesh.position.z = ((mesh.position.z + state.clock.elapsedTime * 0.5) % 60) - 60
      })
    }
  })

  return (
    <group ref={tunnelRef}>
      {rings.map((ring, i) => (
        <mesh key={i} position={[0, 0, ring.z]} scale={ring.scale}>
          <torusGeometry args={[3, 0.01, 8, 64]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  )
}

function FloatingCrystal() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.1}
          metalness={0.95}
          envMapIntensity={2}
        />
      </mesh>
      {/* Edge glow */}
      <mesh scale={1.02}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.2} />
      </mesh>
    </Float>
  )
}

function GlassShard({ position, rotation, scale }: { position: [number, number, number], rotation: [number, number, number], scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation[0] + state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = rotation[1] + state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <tetrahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#ffffff"
          roughness={0}
          metalness={0.9}
          envMapIntensity={3}
          distort={0.1}
          speed={1}
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 300

  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
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
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

function CameraRig() {
  const { camera, pointer } = useThree()
  
  useFrame((state) => {
    camera.position.x += (pointer.x * 1 - camera.position.x) * 0.02
    camera.position.y += (pointer.y * 0.5 - camera.position.y) * 0.02
    camera.lookAt(0, 0, -10)
  })

  return null
}

function ImmersiveScene() {
  return (
    <>
      <CameraRig />
      
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 5, 5]} intensity={0.5} />
      <spotLight position={[0, 10, 0]} intensity={0.3} angle={0.5} penumbra={1} />

      <WireframeTunnel />
      <FloatingCrystal />
      
      <GlassShard position={[-4, 2, -5]} rotation={[0.5, 0.3, 0]} scale={0.5} />
      <GlassShard position={[4, -1, -8]} rotation={[0.2, 0.7, 0.3]} scale={0.3} />
      <GlassShard position={[-3, -2, -3]} rotation={[0.8, 0.1, 0.5]} scale={0.4} />
      <GlassShard position={[5, 1, -6]} rotation={[0.1, 0.5, 0.2]} scale={0.35} />
      
      <ParticleField />
      <Sparkles count={50} scale={20} size={2} speed={0.3} opacity={0.2} />

      <Environment preset="night" />
      <fog attach="fog" args={['#000000', 5, 30]} />

      <EffectComposer>
        <Bloom intensity={0.3} luminanceThreshold={0.3} />
        <Vignette darkness={0.6} offset={0.3} />
      </EffectComposer>
    </>
  )
}

export function ImmersiveSection() {
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.section 
      ref={containerRef}
      className="relative h-screen w-full bg-black overflow-hidden"
      style={{ opacity }}
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <ImmersiveScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="text-[10px] tracking-[0.5em] text-white/40 uppercase">Experience</span>
          <h2 
            className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight text-glow"
            style={{ fontFamily: 'Monument Extended, sans-serif' }}
          >
            Beyond Content
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-white/60 text-lg leading-relaxed">
            Every creation is an immersive journey. Step into a world where 
            digital artistry meets cultural impact.
          </p>
        </motion.div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 text-[10px] tracking-[0.3em] text-white/30 z-20">
        <span>04</span>
      </div>
      <div className="absolute top-8 right-8 text-[10px] tracking-[0.3em] text-white/30 z-20">
        <span>IMMERSIVE</span>
      </div>
    </motion.section>
  )
}

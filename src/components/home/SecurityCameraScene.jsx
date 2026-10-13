import { Center, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

const MODEL_URL = "/models/security-camera.glb";

function CameraAsset({ scrollProgress }) {
  const group = useRef();
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions } = useAnimations(animations, group);
  const entered = useRef(0);

  useEffect(() => {
    const searchAction = actions.Sweep__180_Degrees;
    searchAction?.reset().fadeIn(0.5).play();
    return () => searchAction?.fadeOut(0.25);
  }, [actions]);

  useFrame((state, delta) => {
    if (!group.current) return;
    entered.current = THREE.MathUtils.damp(entered.current, 1, 3.6, delta);
    const p = scrollProgress.current;
    const enterX = THREE.MathUtils.lerp(-4.6, 0, entered.current);
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, enterX + p * 0.7, 3.2, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, -0.15 - p * 0.38, 3.2, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, -0.42 + p * 0.95, 2.4, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, 0.08 - p * 0.16, 2.6, delta);
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.48) * 0.025 - p * 0.12;
  });

  return <group ref={group} rotation={[0, -0.42, 0.08]}><Center><primitive object={scene} scale={0.16} /></Center></group>;
}

function SceneLights({ scrollProgress }) {
  const beam = useRef();
  useFrame((state) => {
    if (!beam.current) return;
    beam.current.rotation.z = -0.26 + scrollProgress.current * 0.64;
    beam.current.material.opacity = 0.12 + Math.sin(state.clock.elapsedTime * 1.8) * 0.025;
  });

  return <><ambientLight intensity={1.7} /><directionalLight position={[-3, 4, 4]} intensity={3.2} color="#d8efff" /><pointLight position={[-4, 1, 2]} intensity={18} distance={8} color="#28b8ff" /><pointLight position={[3, -2, 3]} intensity={10} distance={7} color="#1668ff" /><mesh ref={beam} position={[0.45, -0.35, -1.6]} rotation={[0, 0, -0.26]}><coneGeometry args={[1.4, 5.8, 4, 1, true]} /><meshBasicMaterial color="#38c8ff" transparent opacity={0.12} depthWrite={false} side={THREE.DoubleSide} /></mesh></>;
}

export default function SecurityCameraScene({ scrollProgress }) {
  return <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0.1, 5.2], fov: 27 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} className="h-full w-full"><Suspense fallback={null}><SceneLights scrollProgress={scrollProgress} /><CameraAsset scrollProgress={scrollProgress} /></Suspense></Canvas>;
}

useGLTF.preload(MODEL_URL);

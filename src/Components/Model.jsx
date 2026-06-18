import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Model = ({ url }) => {
  const { scene } = useGLTF(url);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.25,
          roughness: 0.1,
          metalness: 0,
          side: THREE.DoubleSide,
          clearcoat: 0.6,
          clearcoatRoughness: 0.1,
        });
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={0.5} />;
};

export default Model;

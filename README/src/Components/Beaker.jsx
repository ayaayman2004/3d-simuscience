import React, { useMemo, useEffect, forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Beaker = forwardRef(
  ({ position = [0, 0, 0], onReady, reactionStarted }, ref) => {
    const gltf = useGLTF("/models/lab/beaker.glb");
    const beaker = useMemo(() => gltf.scene.clone(), [gltf]);

    useEffect(() => {
      beaker.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshPhysicalMaterial({
            color: "#6d6a6a",
            transparent: true,
            opacity: reactionStarted ? 0.35 : 0.5,
            transmission: 0.7,
            roughness: 0.1,
            thickness: 0.6,
            depthWrite: false, 
          });

          child.renderOrder = 1;
        }
      });

      const box = new THREE.Box3().setFromObject(beaker);
      onReady?.({
        topY: box.max.y,
        bottomY: box.min.y,
        centerY: (box.max.y + box.min.y) / 2,
      });
    }, [beaker, reactionStarted]);

    return (
      <primitive
        ref={ref}
        object={beaker}
        position={position}
        scale={[0.5, 0.5, 0.5]}
      />
    );
  }
);

export default Beaker;

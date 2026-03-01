



import React, { useState, Suspense, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Text } from "@react-three/drei";
import * as THREE from "three";

import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Beaker from "./Beaker";
import reactionsData from "../Data/csvjson.json";
import Model from "./Model";
import "../App.css";

/* ================= MATERIAL ================= */
function PlacedMaterial({ mat }) {
  const size = 0.15;

  return (
    <mesh renderOrder={10}>
      {mat.shape === "cube" ? (
        <boxGeometry args={[size, size, size]} />
      ) : (
        <sphereGeometry args={[size / 2, 32, 32]} />
      )}

      <meshStandardMaterial
        color={mat.color}
        transparent
        opacity={0.95}
        depthTest={false}
        depthWrite={false}
      />

      <Text position={[0, size + 0.05, 0]} fontSize={0.08} color="black">
        {mat.name}
      </Text>
    </mesh>
  );
} 


/* ================= DROP HANDLER ================= */
function DropHandler({ dropRequest, onPlace, beakerBounds }) {
  const { camera, gl } = useThree();
  const raycaster = new THREE.Raycaster();

  React.useEffect(() => {
    if (!dropRequest || !beakerBounds) return;

    const { clientX, clientY, material } = dropRequest;
    const rect = gl.domElement.getBoundingClientRect();

    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera({ x, y }, camera);

    const plane = new THREE.Plane(
      new THREE.Vector3(0, 1, 0),
      -beakerBounds.centerY
    );

    const point = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, point);

    onPlace({
      ...material,
      position: [
        THREE.MathUtils.clamp(point.x, -0.2, 0.2),
        beakerBounds.bottomY + 0.25,
        0.35,
      ],
    });
  }, [dropRequest, beakerBounds]);

  return null;
}

/* ================= LAB SCENE ================= */
const LabScene = () => {
  const [dropRequest, setDropRequest] = useState(null);
  const [placedMaterials, setPlacedMaterials] = useState([]);
  const [beakerBounds, setBeakerBounds] = useState(null);

  const [selectedReaction, setSelectedReaction] = useState(null);
  const [reactionStarted, setReactionStarted] = useState(false);

  const reactantsInBeaker = useMemo(
    () => placedMaterials.map((m) => m.name).sort(),
    [placedMaterials]
  );

  const matchedReactions = useMemo(() => {
    if (reactantsInBeaker.length < 2) return [];
    return reactionsData.filter((r) => {
      const rr = r.reactants.split("+").map((x) => x.trim()).sort();
      return JSON.stringify(rr) === JSON.stringify(reactantsInBeaker);
    });
  }, [reactantsInBeaker]);

  const handleDrop = (e) => {
    e.preventDefault();
    const material = JSON.parse(e.dataTransfer.getData("application/json"));
    setDropRequest({ clientX: e.clientX, clientY: e.clientY, material });
  };

  const startReaction = () => {
    if (!selectedReaction) return;
    setReactionStarted(true);
  };

  const resetLab = () => {
    setPlacedMaterials([]);
    setSelectedReaction(null);
    setReactionStarted(false);
  };

  return (
    <div className="root-layout">
      <LeftSidebar />

      <div
        className="lab-canvas-wrap"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <Canvas camera={{ position: [0, 2, 4], fov: 50 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 10, 5]} intensity={1.2} />
          <OrbitControls />

          <Suspense fallback={null}>
            <Environment preset="studio" />
            <Beaker reactionStarted={reactionStarted} onReady={setBeakerBounds} />
          </Suspense>

          <DropHandler
            dropRequest={dropRequest}
            onPlace={(obj) =>
              setPlacedMaterials((prev) => [...prev, obj])
            }
            beakerBounds={beakerBounds}
          />

          {/*  REACTANTS (تختفي بعد بدء التفاعل) */}
          {!reactionStarted &&
            placedMaterials.map((m, i) => (
              <group key={i} position={m.position}>
                <PlacedMaterial mat={m} />
              </group>
            ))}

          {/*  PRODUCT */}
          {reactionStarted && selectedReaction && beakerBounds && (
            <>
              <mesh
                renderOrder={11}
                position={[0, beakerBounds.bottomY + 0.45, 0.35]}
              >
                <sphereGeometry args={[0.18, 32, 32]} />
                <meshStandardMaterial
                  color="#00ff99"
                  transparent
                  opacity={0.95}
                  depthTest={false}
                  depthWrite={false}
                />
              </mesh>

              <Text
                position={[0, beakerBounds.bottomY + 0.75, 0.35]}
                fontSize={0.1}
                color="black"
              >
                {selectedReaction.products}
              </Text>
            </>
          )}
        </Canvas>
      </div>

      <RightSidebar
        reactions={matchedReactions}
        selectedReaction={selectedReaction}
        reactionStarted={reactionStarted}
        onReactionChange={setSelectedReaction}
        onStartReaction={startReaction}
        onReset={resetLab}
      />
    </div>
  );
};

export default LabScene;

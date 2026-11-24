// Procedural nail-polish bottle (glass body, colored polish inside, faceted pearl cap) with a ring of
// manicured nail tips orbiting it. Slow, steady motion only (no shake). `color` recolors the polish
// smoothly. The canvas stops rendering when it is off screen or the tab is hidden; reduced motion = still frame.
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox, ContactShadows } from "@react-three/drei";

const reduce = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- nail tip geometry: almond outline, extruded, C-curved ---------- */
function makeNailGeometry() {
  const w = 0.36, h = 0.66;
  const s = new THREE.Shape();
  s.moveTo(-w / 2, 0);
  s.lineTo(-w / 2, h * 0.5);
  s.bezierCurveTo(-w / 2, h * 0.82, -w * 0.12, h, 0, h);
  s.bezierCurveTo(w * 0.12, h, w / 2, h * 0.82, w / 2, h * 0.5);
  s.lineTo(w / 2, 0);
  s.quadraticCurveTo(0, -0.07, -w / 2, 0);
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.018, bevelEnabled: true, bevelThickness: 0.014, bevelSize: 0.014, bevelSegments: 3, curveSegments: 24 });
  const p = g.attributes.position;
  const uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i);
    // C-curve across the width, gentle lengthwise arch
    p.setZ(i, p.getZ(i) - Math.pow(x / (w / 2), 2) * 0.08 - Math.pow(y / h - 0.5, 2) * 0.05);
    uv.setXY(i, (x + w / 2 + 0.02) / (w + 0.04), (y + 0.08) / (h + 0.1));
  }
  g.computeVertexNormals();
  g.translate(0, -h / 2, 0);
  return g;
}

/* ---------- nail art textures (canvas, top of canvas = free edge) ---------- */
function nailTexture(kind) {
  const c = document.createElement("canvas");
  c.width = 128; c.height = 256;
  const x = c.getContext("2d");
  const fill = (col) => { x.fillStyle = col; x.fillRect(0, 0, 128, 256); };
  if (kind === "french") {
    fill("#F6D3D8");
    x.fillStyle = "#FFFDF9";
    x.beginPath(); x.moveTo(0, 0); x.lineTo(128, 0); x.lineTo(128, 70); x.quadraticCurveTo(64, 120, 0, 70); x.fill();
  } else if (kind === "ombre") {
    const g = x.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, "#FFB38A"); g.addColorStop(1, "#F7C6D3"); x.fillStyle = g; x.fillRect(0, 0, 128, 256);
  } else if (kind === "chrome") {
    const g = x.createLinearGradient(0, 0, 128, 256);
    ["#F4EEFF", "#C9B6F2", "#FFFFFF", "#F7C6D3", "#DCD4F5"].forEach((col, i, a) => g.addColorStop(i / (a.length - 1), col));
    x.fillStyle = g; x.fillRect(0, 0, 128, 256);
  } else if (kind === "dots") {
    fill("#C9B6F2"); x.fillStyle = "#FFFDF9";
    for (let r = 0; r < 6; r++) for (let k = 0; k < 3; k++) { x.beginPath(); x.arc(22 + k * 42 + (r % 2) * 21, 24 + r * 40, 7, 0, 7); x.fill(); }
  } else if (kind === "heart") {
    fill("#FFF4F6"); x.fillStyle = "#E0284F";
    x.beginPath(); x.moveTo(64, 170); x.bezierCurveTo(10, 120, 30, 70, 64, 100); x.bezierCurveTo(98, 70, 118, 120, 64, 170); x.fill();
  } else if (kind === "glitter") {
    fill("#F4A7BC");
    for (let i = 0; i < 260; i++) { x.fillStyle = ["#FFFFFF", "#FFE3EC", "#E0284F", "#C9B6F2"][i % 4]; x.globalAlpha = 0.5 + Math.random() * 0.5; x.fillRect(Math.random() * 128, Math.random() * 256, 2.5, 2.5); }
    x.globalAlpha = 1;
  } else fill(kind);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

const TIPS = [
  { kind: "french" }, { kind: "#E0284F" }, { kind: "chrome", metal: true }, { kind: "dots" }, { kind: "#F4A7BC" },
  { kind: "ombre" }, { kind: "heart" }, { kind: "glitter" }, { kind: "#231712" }, { kind: "#C9B6F2" },
];

function NailRing({ radius = 1.75, still }) {
  const ring = useRef();
  const tips = useRef([]);
  const geo = useMemo(makeNailGeometry, []);
  const mats = useMemo(() => TIPS.map((t) => new THREE.MeshPhysicalMaterial({
    map: nailTexture(t.kind), roughness: t.metal ? 0.12 : 0.22, metalness: t.metal ? 0.65 : 0,
    clearcoat: 1, clearcoatRoughness: 0.04, iridescence: t.metal ? 0.9 : 0, side: THREE.DoubleSide,
  })), []);
  useEffect(() => () => { geo.dispose(); mats.forEach((m) => { m.map?.dispose(); m.dispose(); }); }, [geo, mats]);

  useFrame((state, dt) => {
    if (still) return;
    ring.current.rotation.y += Math.min(dt, 0.05) * 0.22;
    const t = state.clock.elapsedTime;
    tips.current.forEach((m, i) => { if (m) { m.position.y = Math.sin(t * 0.8 + i * 0.7) * 0.08; m.rotation.z = Math.sin(t * 0.6 + i) * 0.12; } });
  });

  return (
    <group rotation={[0.32, 0, -0.14]}>
      <group ref={ring}>
        {TIPS.map((_, i) => {
          const a = (i / TIPS.length) * Math.PI * 2;
          return (
            <group key={i} position={[Math.cos(a) * radius, 0, Math.sin(a) * radius]} rotation={[0, Math.PI / 2 - a, 0]}>
              <mesh ref={(m) => (tips.current[i] = m)} geometry={geo} material={mats[i]} rotation={[-0.2, 0, 0]} scale={1.05} />
            </group>
          );
        })}
      </group>
    </group>
  );
}

function Bottle({ color, still }) {
  const g = useRef();
  const polish = useRef();
  const neck = useRef();
  const target = useMemo(() => new THREE.Color(color), [color]);
  useEffect(() => { if (still && polish.current) { polish.current.color.copy(target); neck.current?.color.copy(target); } }, [still, target]);

  useFrame((state, dt) => {
    polish.current.color.lerp(target, 1 - Math.pow(0.02, Math.min(dt, 0.1)));
    neck.current.color.copy(polish.current.color);
    if (still) return;
    g.current.rotation.y += Math.min(dt, 0.05) * 0.35;
    g.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.06;
    g.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.05;
  });

  return (
    <group ref={g} position={[0, 0, 0]} rotation={[0, -0.5, 0]}>
      {/* glass body */}
      <RoundedBox args={[1.3, 1.45, 1.0]} radius={0.24} smoothness={6} position={[0, -0.45, 0]}>
        <meshPhysicalMaterial color="#ffffff" transmission={1} thickness={0.12} roughness={0} ior={1.35}
          clearcoat={1} clearcoatRoughness={0} specularIntensity={1} envMapIntensity={1.6} />
      </RoundedBox>
      {/* polish inside */}
      <RoundedBox args={[1.16, 1.22, 0.86]} radius={0.2} smoothness={5} position={[0, -0.53, 0]}>
        <meshPhysicalMaterial ref={polish} color={color} roughness={0.25} clearcoat={0.6} clearcoatRoughness={0.1} />
      </RoundedBox>
      {/* neck */}
      <mesh position={[0, 0.36, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.2, 32]} />
        <meshPhysicalMaterial ref={neck} color={color} roughness={0.25} clearcoat={0.6} />
      </mesh>
      {/* faceted pearl cap */}
      <mesh position={[0, 0.98, 0]}>
        <cylinderGeometry args={[0.27, 0.33, 1.08, 8, 1]} />
        <meshPhysicalMaterial color="#F6EEF7" flatShading roughness={0.12} metalness={0.15} clearcoat={1}
          iridescence={1} iridescenceIOR={1.6} iridescenceThicknessRange={[200, 700]} />
      </mesh>
      <mesh position={[0, 1.53, 0]}>
        <cylinderGeometry args={[0.2, 0.27, 0.04, 8, 1]} />
        <meshPhysicalMaterial color="#F6EEF7" flatShading roughness={0.12} clearcoat={1} iridescence={1} />
      </mesh>
    </group>
  );
}

export default function PolishScene({ color = "#F4A7BC", tips = true, className = "", zoom = 1 }) {
  const wrap = useRef(null);
  const [visible, setVisible] = useState(true);
  const still = reduce();

  useEffect(() => {
    const el = wrap.current;
    let inView = true;
    const update = () => setVisible(inView && !document.hidden);
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; update(); }, { rootMargin: "100px" });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);

  return (
    <div ref={wrap} className={className} aria-hidden="true">
      <Canvas frameloop={!visible ? "never" : still ? "demand" : "always"} dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.9, 8.6 / zoom], fov: 32 }} onCreated={({ camera }) => camera.lookAt(0, 0.05, 0)}
        style={{ background: "transparent" }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 4]} intensity={1.6} color="#FFF6EC" />
        <pointLight position={[-3, 1.5, -2]} intensity={12} color="#F7A3C0" distance={10} />
        <pointLight position={[3, 0.5, -2]} intensity={10} color="#C9B6F2" distance={10} />
        <Bottle color={color} still={still} />
        {tips && <NailRing still={still} />}
        <ContactShadows position={[0, -1.25, 0]} opacity={0.35} scale={5} blur={2.8} far={2.5} resolution={256} frames={1} color="#5a2a3a" />
        <Environment resolution={256} frames={1}>
          <mesh scale={30}><sphereGeometry args={[1, 32, 16]} /><meshBasicMaterial color="#F3DDE3" side={THREE.BackSide} /></mesh>
          <Lightformer form="rect" intensity={4} position={[-2.6, 1.2, 3]} rotation-y={0.6} scale={[2.2, 5, 1]} />
          <Lightformer form="rect" intensity={2.4} position={[3, 1.5, 2.4]} rotation-y={-0.8} scale={[0.6, 5, 1]} />
          <Lightformer form="rect" intensity={3} position={[0, 4, 2]} scale={[6, 2, 1]} />
          <Lightformer form="rect" intensity={2.2} color="#FFC3A0" position={[-4, 1, 0]} rotation-y={Math.PI / 2} scale={[4, 6, 1]} />
          <Lightformer form="rect" intensity={2.4} color="#C9B6F2" position={[4, 1, -1]} rotation-y={-Math.PI / 2} scale={[3, 6, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

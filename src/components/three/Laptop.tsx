"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";

import { LAPTOP } from "./sceneConfig";
import { smoothstep, type ScrollInfo } from "./useScrollProgress";
import { heroContent } from "@/data/content";
import type { SceneControls } from "./useSceneControls";

/**
 * 유리 노트북 — 스크롤이 연출한다 (히어로 구간 0→1)
 *   0.04~0.42  뚜껑이 열린다
 *   0.28~0.48  화면에 핵심 메시지가 떠오른다
 *   0.50~1.00  노트북이 카메라 쪽으로 다가오며 화면이 뷰포트를 가득 채운다 → 그 화면색이 곧 페이지 배경
 *   1.00       숨김. 이후는 본문 + 유리 테트리스
 *
 * 구조:  <root>  위치·자세 (휴식 자세 ↔ 화면 채움 자세 보간)
 *          ├ base
 *          └ <hinge> rotation.x = 열림각
 *              ├ lid · screen · <Html> 메시지
 */

const deg = (d: number) => (d * Math.PI) / 180;
const PAGE_BG = "#eef3f7";

interface Props {
  scroll: React.RefObject<ScrollInfo>;
  controls: SceneControls;
}

export default function Laptop({ scroll, controls }: Props) {
  const { laptop, material } = controls;
  const root = useRef<THREE.Group>(null);
  const hinge = useRef<THREE.Group>(null);
  const msg = useRef<HTMLDivElement>(null);
  const hs = useRef(0); // 부드럽게 따라가는 hero 진행도
  const { camera, viewport } = useThree();

  const { width: W, depth: D, baseThickness: BT, lidThickness: LT, cornerRadius: R } = LAPTOP;

  // 재사용 객체 (프레임마다 할당하지 않기 위해)
  const tmp = useMemo(
    () => ({
      restPos: new THREE.Vector3(),
      restQ: new THREE.Quaternion(),
      tgtPos: new THREE.Vector3(),
      tgtQ: new THREE.Quaternion(),
      m: new THREE.Matrix4(),
      e: new THREE.Euler(),
      s: new THREE.Vector3(),
      n: new THREE.Vector3(),
      u: new THREE.Vector3(),
      r: new THREE.Vector3(1, 0, 0),
    }),
    []
  );

  useFrame((_, dt) => {
    const g = root.current;
    const hg = hinge.current;
    if (!g || !hg) return;
    const info = scroll.current;

    hs.current += (info.hero - hs.current) * (1 - Math.exp(-dt * 9));
    const h = hs.current;

    // 1) 뚜껑
    const openT = smoothstep(h, 0.04, 0.42);
    const theta = deg(laptop.openAngle) * openT;
    hg.rotation.x = -theta;

    // 2) 메시지 — 세로 화면에선 화면 폭보다 뷰포트가 좁으므로 글 상자를 좁힌다
    if (msg.current) {
      const o = smoothstep(h, 0.28, 0.48) * (1 - smoothstep(h, 0.86, 0.97));
      msg.current.style.opacity = o.toFixed(3);
      msg.current.style.transform = `translateY(${(1 - smoothstep(h, 0.28, 0.48)) * 10}px)`;
      const aspect = viewport.width / viewport.height;
      msg.current.style.width = `${Math.round(560 * Math.min(1, aspect * 1.5))}px`;
    }

    // 3) 자세 — 휴식 ↔ 화면 채움
    const { restPos, restQ, tgtPos, tgtQ, m, e, s, n, u, r } = tmp;

    // 뷰포트가 좁으면(모바일 세로) 노트북을 줄여 화면 폭의 ~80% 안에 들어오게
    const k = THREE.MathUtils.clamp(viewport.width / (W * 1.25), 0.38, 1);
    g.scale.setScalar(k);

    // 휴식 자세: 살짝 내려다보이게 기울이고, 포인터 패럴랙스
    restPos.set(0, laptop.restY * k, 0);
    e.set(deg(laptop.restTiltX) + info.pointer.y * 0.03, deg(laptop.restTiltY) + info.pointer.x * 0.05, 0);
    restQ.setFromEuler(e);

    // 채움 자세: 화면(열림각 기준)이 카메라를 정면으로 보며 뷰포트 높이를 덮도록
    const full = deg(laptop.openAngle);
    const sin = Math.sin(full), cos = Math.cos(full);
    // 노트북 로컬 좌표에서의 화면 중심·법선·위쪽
    s.set(0, BT + (D / 2) * sin, -D / 2 + (D / 2) * cos);
    n.set(0, -cos, sin);
    u.set(0, sin, cos);
    // 로컬 기저(r,u,n) → 월드 기저(x,y,z): R = L^T
    m.makeBasis(r, u, n).transpose();
    tgtQ.setFromRotationMatrix(m);
    const fovRad = deg((camera as THREE.PerspectiveCamera).fov);
    const screenH = D * 0.84 * k;
    // 세로가 긴 화면에선 화면 "폭"이 먼저 뷰포트를 덮어야 가장자리가 안 보인다
    const aspect = viewport.width / viewport.height;
    const screenW = W * 0.9 * k;
    const distH = screenH / (2 * Math.tan(fovRad / 2) * laptop.fillOverscan);
    const distW = screenW / (2 * Math.tan(fovRad / 2) * aspect * laptop.fillOverscan);
    const dist = Math.min(distH, distW);
    // 화면 중심이 카메라 앞 dist 에 오도록 (로컬 오프셋도 축소 배율 적용)
    tgtPos.set(0, 0, camera.position.z - dist).sub(s.multiplyScalar(k).applyQuaternion(tgtQ));

    const z = smoothstep(h, 0.5, 1);
    g.position.lerpVectors(restPos, tgtPos, z);
    g.quaternion.slerpQuaternions(restQ, tgtQ, z);
    g.visible = h < 0.995;
  });

  const glass = (
    <meshPhysicalMaterial
      color="#dff0fb"
      transparent
      opacity={material.opacity}
      transmission={material.transmission}
      thickness={material.thickness}
      roughness={material.roughness}
      ior={material.ior}
      clearcoat={material.clearcoat}
      clearcoatRoughness={0.08}
      envMapIntensity={1.2}
    />
  );

  return (
    <group ref={root}>
      <group name="base">
        <RoundedBox args={[W, BT, D]} radius={R} smoothness={4} position={[0, BT / 2, 0]} castShadow receiveShadow>
          {glass}
        </RoundedBox>
        <mesh position={[0, BT - 0.02, 0.12]} rotation-x={-Math.PI / 2} receiveShadow>
          <planeGeometry args={[W * 0.86, D * 0.56]} />
          <meshStandardMaterial color="#1b2430" roughness={0.9} metalness={0.1} />
        </mesh>
        <mesh position={[0, BT - 0.015, D * 0.33]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[W * 0.3, D * 0.2]} />
          <meshStandardMaterial color="#2a3542" roughness={0.6} />
        </mesh>
      </group>

      <group ref={hinge} name="hinge" position={[0, BT, -D / 2]}>
        <RoundedBox args={[W, LT, D]} radius={R} smoothness={4} position={[0, LT / 2, D / 2]} castShadow>
          {glass}
        </RoundedBox>
        {/* 화면 — 페이지 배경과 같은 색. 끝까지 다가오면 화면이 곧 페이지가 된다 */}
        <mesh name="screen" position={[0, -0.003, D / 2]} rotation-x={Math.PI / 2}>
          <planeGeometry args={[W * 0.9, D * 0.84]} />
          <meshStandardMaterial color={PAGE_BG} emissive={PAGE_BG} emissiveIntensity={0.55} roughness={0.5} />
        </mesh>
        <Html
          transform
          position={[0, -0.006, D / 2]}
          rotation={[Math.PI / 2, 0, 0]}
          distanceFactor={2.2}
          style={{ pointerEvents: "none", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* 폭은 노트북 화면 비율에 맞춰 고정(560), 폰에서는 노트북이 k 배 줄어드는 만큼 함께 줄어든다 */}
          <div ref={msg} style={{ width: 560, padding: "28px 36px", color: "#0f1720", opacity: 0, fontFamily: "inherit" }}>
            <p style={{ fontSize: 14, fontWeight: 600, opacity: 0.55, marginBottom: 12 }}>{heroContent.title}</p>
            <h1 style={{ fontSize: 40, lineHeight: 1.18, fontWeight: 800, letterSpacing: "-0.02em", wordBreak: "keep-all", maxWidth: 480 }}>
              {heroContent.subtitle}
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.65, opacity: 0.72, marginTop: 18, wordBreak: "keep-all", maxWidth: 440 }}>
              {heroContent.tagline}
            </p>
          </div>
        </Html>
      </group>
    </group>
  );
}

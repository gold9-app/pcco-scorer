"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

import { LAPTOP } from "./sceneConfig";
import { smoothstep, type ScrollInfo } from "./useScrollProgress";
import { screenOverlay } from "./ScreenMessage";
import Particles, { createDriver } from "./Particles";
import type { SceneControls } from "./useSceneControls";

/**
 * 노트북 — 실체는 빛 입자(Particles)다. 이 컴포넌트는 자세와 타이밍을 정하고,
 * 입자 셰이더(driver)와 화면 메시지 DOM(anchor)에 같은 자세를 흘려 넣는다.
 *
 *   페이지가 열리면   흐르던 입자가 "G9" 로 모인다 → 머문다 → 흩어졌다 노트북 실루엣으로 모인다
 *                     → 뚜껑이 열린다 → 화면에 메시지. 그대로 멈춘다 (읽는 시간)
 *   들어가기 (hero 0→1, 1.6초)  0.0~0.25 메시지가 사라진다 · 0.05~0.65 입자가 사방으로 흩어진다 · 0.45~1 남은 자취가 위로
 *
 * 구조:  <root> 위치·크기(뷰포트의 fillW/fillH)·패럴랙스  — 입자 셰이더의 uModel
 *          ├ <hinge> rotation.x = 열림각
 *          │    ├ screen  어두운 반투명 판 (메시지 가독성)
 *          │    └ <anchor> 메시지 DOM 기준점
 *          └ (입자는 월드 좌표에서 그린다 — uModel 로 root 자세를 받는다)
 */

const deg = (d: number) => (d * Math.PI) / 180;

interface Props {
  scroll: React.RefObject<ScrollInfo>;
  controls: SceneControls;
}

const { width: W, depth: D, baseThickness: BT } = LAPTOP;

export default function Laptop({ scroll, controls }: Props) {
  const { laptop } = controls;
  const root = useRef<THREE.Group>(null);
  const hinge = useRef<THREE.Group>(null);
  const anchor = useRef<THREE.Group>(null);
  const screenMat = useRef<THREE.MeshBasicMaterial>(null);
  const driver = useRef(createDriver());
  const hs = useRef(0); // 표지 퇴장 진행도 (들어가기 뒤 시간으로 오른다)
  const clock = useRef(0); // 등장 타이머 (초)
  const readySent = useRef(false);
  const { viewport, size, camera } = useThree();

  const euler = useMemo(() => new THREE.Euler(), []);

  useFrame((_, dt) => {
    const g = root.current;
    const hg = hinge.current;
    if (!g || !hg) return;
    const info = scroll.current;
    const d = driver.current;

    // 들어가기: 1.6초에 걸쳐 흩어진다
    if (info.entered) hs.current = Math.min(1, hs.current + dt / 1.6);
    const h = hs.current;
    if (d.ready) clock.current += Math.min(dt, 0.1); // 로고 샘플이 준비된 뒤부터 인트로가 흐른다
    const c = clock.current;

    // 타임라인: 글자 → 머묾 → 노트북 → 열기
    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
    const textT = clamp01((c - laptop.textDelay) / laptop.textDuration);
    const morphStart = laptop.textDelay + laptop.textDuration + laptop.textHold;
    const formT = clamp01((c - morphStart) / laptop.morphDuration);
    const openT = clamp01((c - (morphStart + laptop.morphDuration * laptop.openAt)) / laptop.introDuration);
    const openIntro = 1 - Math.pow(1 - openT, 3);

    // 메시지까지 다 뜨면 표지에 "들어가기" 버튼을 띄우라고 알린다
    if (!readySent.current && openT >= 0.95) {
      readySent.current = true;
      window.dispatchEvent(new CustomEvent("hero:ready"));
    }

    // 들어가기: 메시지 → 흩어짐 → 뚜껑도 닫히며 위로
    const burst = smoothstep(h, 0.05, 0.65);
    const closeT = smoothstep(h, 0.0, 0.55);
    hg.rotation.x = -deg(laptop.openAngle) * openIntro * (1 - closeT);

    // 크기: 뷰포트 너비의 fillW(세로 화면은 fillWPortrait), 단 높이는 fillH 를 넘지 않게 (열린 뚜껑 높이 ≈ D)
    const portrait = viewport.width < viewport.height;
    const fw = portrait ? laptop.fillWPortrait : laptop.fillW;
    const k = Math.min((viewport.width * fw) / W, (viewport.height * laptop.fillH) / (D * 1.05));
    const exitT = smoothstep(h, 0.45, 1);
    g.scale.setScalar(k);
    g.position.set(0, -D * k * 0.5 + laptop.restY + exitT * (viewport.height * 0.6), 0);
    euler.set(deg(laptop.restTiltX) + info.pointer.y * 0.03, deg(laptop.restTiltY) + info.pointer.x * 0.05, 0);
    g.quaternion.setFromEuler(euler);
    g.updateMatrixWorld(true);

    d.text = textT;
    d.form = formT;
    d.pointer.set(info.pointer.x, info.pointer.y);
    d.open = -hg.rotation.x;
    d.burst = burst;
    d.model.copy(g.matrixWorld);

    // 화면 판: 실루엣이 완성되며 나타나고 흩어지며 사라진다
    if (screenMat.current) screenMat.current.opacity = 0.72 * smoothstep(formT, 0.75, 1) * (1 - burst);

    // 메시지: 뚜껑이 거의 다 열리면 나타나고, 스크롤 시작과 함께 먼저 사라진다
    if (anchor.current) {
      const show = smoothstep(openT, 0.55, 0.95) * (1 - smoothstep(h, 0.0, 0.25));
      screenOverlay.update(camera, anchor.current, size, { show, width: 480, distanceFactor: 2.2 });
    }
  });

  return (
    <>
      <group ref={root}>
        <group ref={hinge} name="hinge" position={[0, BT, -D / 2]}>
          <mesh name="screen" position={[0, -0.004, D / 2 + 0.01]} rotation-x={Math.PI / 2}>
            <planeGeometry args={[W * 0.9, D * 0.84]} />
            <meshBasicMaterial ref={screenMat} color="#0a0f16" transparent opacity={0} depthWrite={false} />
          </mesh>
          <group ref={anchor} name="screen-anchor" position={[0, -0.01, D / 2 + 0.01]} rotation={[Math.PI / 2, 0, 0]} />
        </group>
      </group>
      <Particles driver={driver} controls={controls} />
    </>
  );
}

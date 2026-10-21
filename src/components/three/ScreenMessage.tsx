"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { heroContent } from "@/data/content";

/**
 * 노트북 화면 안의 핵심 메시지 — Canvas 밖의 보통 DOM.
 * drei <Html> 은 React 루트를 하나 더 만들어 React 19 개발 모드에서 "synchronously unmount a root" 경고와 함께
 * 내용이 비는 일이 있어, 같은 CSS 3D 수학(CSS3DRenderer 방식)만 가져와 직접 그린다.
 * Laptop 이 매 프레임 `screenOverlay.update(...)` 로 자세를 흘려 넣는다.
 */

interface Nodes {
  el: HTMLDivElement;
  outer: HTMLDivElement;
  inner: HTMLDivElement;
  msg: HTMLDivElement;
}

const epsilon = (v: number) => (Math.abs(v) < 1e-10 ? 0 : v);
const CAMERA_MULT = [1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1];
const objectMult = (f: number) => [1 / f, 1 / f, 1 / f, 1, -1 / f, -1 / f, -1 / f, -1, 1 / f, 1 / f, 1 / f, 1, 1, 1, 1, 1];

function cssMatrix(m: THREE.Matrix4, mult: number[], prepend = "") {
  let s = "matrix3d(";
  for (let i = 0; i < 16; i++) s += epsilon(mult[i] * m.elements[i]) + (i !== 15 ? "," : ")");
  return prepend + s;
}

let nodes: Nodes | null = null;

export const screenOverlay = {
  /** 메시지 너비(px, 화면 비율에 따라 Laptop 이 정함) · distanceFactor 는 drei Html 과 같은 의미 */
  update(camera: THREE.Camera, anchor: THREE.Object3D, size: { width: number; height: number }, opts: { show: number; width: number; distanceFactor: number }) {
    if (!nodes) return;
    const { el, outer, inner, msg } = nodes;
    const widthHalf = size.width / 2;
    const heightHalf = size.height / 2;
    const fov = camera.projectionMatrix.elements[5] * heightHalf;
    el.style.width = `${size.width}px`;
    el.style.height = `${size.height}px`;
    el.style.perspective = `${fov}px`;
    outer.style.transform = `translateZ(${fov}px)${cssMatrix(camera.matrixWorldInverse, CAMERA_MULT)}translate(${widthHalf}px,${heightHalf}px)`;
    inner.style.transform = cssMatrix(anchor.matrixWorld, objectMult(1 / (opts.distanceFactor / 400)), "translate(-50%,-50%)");
    msg.style.width = `${Math.round(opts.width)}px`;
    msg.style.opacity = opts.show.toFixed(3);
    el.style.visibility = opts.show > 0.002 ? "visible" : "hidden";
  },
};

export default function ScreenMessage() {
  const el = useRef<HTMLDivElement>(null);
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const msg = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (el.current && outer.current && inner.current && msg.current) {
      nodes = { el: el.current, outer: outer.current, inner: inner.current, msg: msg.current };
    }
    return () => {
      nodes = null;
    };
  }, []);

  return (
    <div ref={el} aria-hidden style={{ position: "fixed", top: 0, left: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1, visibility: "hidden" }}>
      <div ref={outer} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", transformStyle: "preserve-3d" }}>
        <div ref={inner} style={{ position: "absolute", transformStyle: "preserve-3d", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
          <div ref={msg} style={{ width: 560, padding: "28px 36px", color: "#0f1720", opacity: 0, fontFamily: "inherit" }}>
            <p style={{ fontSize: 14, fontWeight: 600, opacity: 0.6, marginBottom: 12 }}>{heroContent.title}</p>
            <p style={{ fontSize: 40, lineHeight: 1.18, fontWeight: 800, letterSpacing: "-0.02em", wordBreak: "keep-all", maxWidth: 480 }}>
              {heroContent.subtitle}
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.65, opacity: 0.78, marginTop: 18, wordBreak: "keep-all", maxWidth: 440 }}>
              {heroContent.tagline}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

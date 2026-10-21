"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";

import { buildWell, pickWell, type Piece } from "./tetris";
import { beatProgress, type ScrollInfo } from "./useScrollProgress";
import type { SceneControls } from "./useSceneControls";

/**
 * 유리 테트리스 — 블록 20개. 본문을 내리는 동안 차례로 떨어져 아래부터 쌓인다.
 * 마지막(20번째) 블록은 문서 끝(CTA)에서 떨어져 우물을 완성한다 — "딱 맞게".
 * 우물은 80칸, 화면 비율에 맞는 모양을 고르고 뷰포트 안에 들어오는 최대 칸으로 바닥에 붙인다.
 */

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

interface Layout {
  cols: number;
  rows: number;
  cell: number;
  x0: number;
  y0: number;
  startAbove: number;
  pieces: Piece[];
}

function useLayout(cellScale: number, depth: number): Layout {
  const { viewport, size, camera } = useThree();
  return useMemo(() => {
    const vp = viewport.getCurrentViewport(camera, new THREE.Vector3(0, 0, depth));
    const [cols, rows] = pickWell(size.width, size.height);
    const cell = Math.min(vp.width / cols, vp.height / rows) * cellScale;
    const pieces = buildWell(cols, rows);
    return {
      cols,
      rows,
      cell,
      x0: -(cols * cell) / 2 + cell / 2,
      y0: -vp.height / 2 + cell / 2,
      startAbove: vp.height + cell * 2,
      pieces,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewport.width, viewport.height, size.width, size.height, cellScale, depth, camera]);
}

function GlassPiece({ piece, layout, scroll, controls }: { piece: Piece; layout: Layout; scroll: React.RefObject<ScrollInfo>; controls: SceneControls }) {
  const group = useRef<THREE.Group>(null);
  const t = useRef(0);
  const { cell, x0, y0 } = layout;
  const { tetris } = controls;

  const { cx, cy, offsets } = useMemo(() => {
    const xs = piece.cells.map(([c]) => x0 + c * cell);
    const ys = piece.cells.map(([, r]) => y0 + r * cell);
    const cx = xs.reduce((a, b) => a + b, 0) / xs.length;
    const cy = ys.reduce((a, b) => a + b, 0) / ys.length;
    return { cx, cy, offsets: xs.map((x, i) => [x - cx, ys[i] - cy] as const) };
  }, [piece, cell, x0, y0]);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const target = beatProgress(scroll.current, piece.index, layout.pieces.length);
    t.current += (target - t.current) * (1 - Math.exp(-dt * tetris.follow));
    const k = easeOutCubic(t.current);
    g.position.set(cx, cy + layout.startAbove * (1 - k), 0);
    g.rotation.z = piece.tilt * tetris.tilt * (1 - k);
    const sq = t.current > 0.88 ? 1 - 0.07 * Math.sin(((t.current - 0.88) / 0.12) * Math.PI) : 1;
    g.scale.set(1 + (1 - sq) * 0.5, sq, 1);
    g.visible = t.current > 0.002;
  });

  const size = cell * tetris.gap;
  // 마지막 블록 = 당신의 자리 — 틸 포인트
  const color = piece.index === layout.pieces.length - 1 ? "#ffffff" : piece.tint;
  return (
    <group ref={group}>
      {offsets.map(([dx, dy], i) => (
        <RoundedBox key={i} args={[size, size, size * 0.55]} radius={cell * 0.12} smoothness={3} position={[dx, dy, 0]}>
          <meshPhysicalMaterial
            color={color}
            emissive={color}
            emissiveIntensity={tetris.emissive}
            transparent
            opacity={tetris.opacity}
            roughness={tetris.roughness}
            ior={1.4}
            clearcoat={1}
            clearcoatRoughness={0.12}
            envMapIntensity={1.1}
            depthWrite={false}
          />
        </RoundedBox>
      ))}
    </group>
  );
}

export default function TetrisWell({ scroll, controls }: { scroll: React.RefObject<ScrollInfo>; controls: SceneControls }) {
  const layout = useLayout(controls.tetris.cellScale, controls.tetris.depth);
  return (
    <group name="tetris" position-z={controls.tetris.depth}>
      {layout.pieces.map((p) => (
        <GlassPiece key={`${layout.cols}x${layout.rows}-${p.index}`} piece={p} layout={layout} scroll={scroll} controls={controls} />
      ))}
    </group>
  );
}

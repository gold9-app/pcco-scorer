"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";

import { buildWell, type Piece } from "./tetris";
import type { ScrollInfo } from "./useScrollProgress";
import type { SceneControls } from "./useSceneControls";

/**
 * 유리 테트리스 — 뷰포트 전체가 우물.
 * 본문(content) 스크롤 진행도 0→1 에 맞춰 조각이 한 개씩 위에서 떨어져 아래부터 쌓이고,
 * 페이지 끝(CTA)에서 화면이 빈칸 없이 가득 찬다. 본문은 그 위에 유리 패널로 떠 있다.
 */

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

interface Layout {
  cols: number;
  rows: number;
  cell: number;
  x0: number; // col 0 중심 x
  y0: number; // row 0 중심 y
  startAbove: number;
  pieces: Piece[];
}

function useLayout(cellScale: number, depth: number): Layout {
  const { viewport, size, camera } = useThree();
  return useMemo(() => {
    // 우물이 놓이는 깊이(z = depth)에서 뷰포트가 몇 유닛인지 — 그 크기를 꽉 채운다
    const vp = viewport.getCurrentViewport(camera, new THREE.Vector3(0, 0, depth));
    const cols = size.width < 640 ? 4 : size.width < 1200 ? 6 : 8;
    const cell = (vp.width / cols) * cellScale;
    const rows = Math.ceil(vp.height / cell) + 1; // 맨 윗줄은 화면 위로 살짝 넘치게
    const pieces = buildWell(cols, rows);
    return {
      cols,
      rows,
      cell,
      x0: -(cols * cell) / 2 + cell / 2,
      y0: -vp.height / 2 + cell / 2,
      startAbove: vp.height + cell * 3,
      pieces,
    };
    // viewport.width/height 는 리사이즈 감지용 의존성
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewport.width, viewport.height, size.width, cellScale, depth, camera]);
}

function GlassPiece({ piece, layout, scroll, controls }: { piece: Piece; layout: Layout; scroll: React.RefObject<ScrollInfo>; controls: SceneControls }) {
  const group = useRef<THREE.Group>(null);
  const t = useRef(0);
  const { cell, x0, y0, pieces } = layout;
  const { tetris } = controls;
  const N = pieces.length;

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
    // 조각 i 는 content 진행도 start_i 에서 떨어지기 시작해 d 만큼 지나 착지한다.
    // 첫 조각은 content 0 에서 출발, 마지막 조각은 content 1 에서 정확히 착지. overlap 이 클수록 여러 조각이 동시에 떨어진다.
    const d = (1 + tetris.overlap) / N;
    const start = N > 1 ? (piece.index * (1 - d)) / (N - 1) : 0;
    const target = THREE.MathUtils.clamp((scroll.current.content - start) / d, 0, 1);
    t.current += (target - t.current) * (1 - Math.exp(-dt * tetris.follow));
    const k = easeOutCubic(t.current);
    g.position.set(cx, cy + layout.startAbove * (1 - k), 0);
    g.rotation.z = piece.tilt * tetris.tilt * (1 - k);
    const sq = t.current > 0.88 ? 1 - 0.07 * Math.sin(((t.current - 0.88) / 0.12) * Math.PI) : 1;
    g.scale.set(1 + (1 - sq) * 0.5, sq, 1);
    g.visible = t.current > 0.002;
  });

  const size = cell * tetris.gap;
  return (
    <group ref={group}>
      {offsets.map(([dx, dy], i) => (
        <RoundedBox key={i} args={[size, size, size * 0.55]} radius={cell * 0.12} smoothness={3} position={[dx, dy, 0]} castShadow>
          <meshPhysicalMaterial
            color={piece.tint}
            transparent
            opacity={tetris.opacity}
            transmission={tetris.transmission}
            thickness={tetris.thickness}
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
        <GlassPiece key={`${layout.cols}-${p.index}`} piece={p} layout={layout} scroll={scroll} controls={controls} />
      ))}
    </group>
  );
}

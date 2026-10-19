"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";

import { PIECES, type Piece } from "./tetris";
import { stageStore } from "./stageStore";
import { dropProgress, type ScrollInfo } from "./useScrollProgress";
import type { SceneControls } from "./useSceneControls";

/**
 * 유리 테트리스 — 뷰포트 양옆 4×4 우물.
 * 블록 0 은 노트북이 열릴 때, 블록 1~7 은 data-drop 섹션에 스크롤이 닿을 때 떨어진다.
 * 카메라는 고정이고 블록은 월드 좌표에 놓이므로, 스크롤해도 우물은 화면 아래에 붙어 있다 (HUD 처럼).
 */

interface Props {
  scroll: React.RefObject<ScrollInfo>;
  controls: SceneControls;
}

const CONTENT_MAX_PX = 1152; // max-w-6xl — 가운데 콘텐츠 열 너비
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

interface Layout {
  cell: number;
  floorY: number;
  wellX0: { left: number; right: number }; // 각 우물의 col 0 중심 x
  startAbove: number; // 낙하 시작 높이 (화면 위)
  compact: boolean;
}

function useLayout(cellScale: number): Layout {
  const { viewport, size } = useThree();
  return useMemo(() => {
    const upp = viewport.width / size.width; // units per px
    const contentHalf = (Math.min(size.width, CONTENT_MAX_PX) / 2 + 24) * upp;
    const gutter = viewport.width / 2 - contentHalf;
    const compact = gutter < 1.1;
    const cell = THREE.MathUtils.clamp(gutter / 5.2, 0.22, 0.46) * cellScale;
    const centerAbs = compact ? viewport.width / 2 - cell * 2.6 : contentHalf + gutter / 2;
    const floorY = -viewport.height / 2 + cell * 0.95;
    return {
      cell,
      floorY,
      wellX0: { left: -centerAbs - 1.5 * cell, right: centerAbs - 1.5 * cell },
      startAbove: viewport.height + cell * 5,
      compact,
    };
  }, [viewport.width, viewport.height, size.width, cellScale]);
}

function GlassPiece({
  piece,
  layout,
  scroll,
  controls,
}: {
  piece: Piece;
  layout: Layout;
  scroll: React.RefObject<ScrollInfo>;
  controls: SceneControls;
}) {
  const group = useRef<THREE.Group>(null);
  const t = useRef(0);
  const { cell, floorY, wellX0 } = layout;
  const { tetris } = controls;

  // 블록 중심(착지 위치)과 각 칸의 상대 오프셋
  const { cx, cy, offsets } = useMemo(() => {
    const xs = piece.cells.map(([c]) => wellX0[piece.side] + c * cell);
    const ys = piece.cells.map(([, r]) => floorY + r * cell);
    const cx = xs.reduce((a, b) => a + b, 0) / xs.length;
    const cy = ys.reduce((a, b) => a + b, 0) / ys.length;
    return { cx, cy, offsets: xs.map((x, i) => [x - cx, ys[i] - cy] as const) };
  }, [piece, cell, floorY, wellX0]);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const info = scroll.current;
    const target = piece.index === 0 ? (stageStore.get().open ? 1 : 0) : dropProgress(info, piece.index - 1);
    // 스크롤 스크럽을 부드럽게 따라간다
    t.current += (target - t.current) * (1 - Math.exp(-dt * tetris.follow));
    const k = easeOutCubic(t.current);
    g.position.set(cx, cy + layout.startAbove * (1 - k), 0);
    g.rotation.z = piece.tilt * tetris.tilt * (1 - k);
    // 착지 직전 살짝 눌렸다 펴지는 스쿼시
    const s = t.current > 0.86 ? 1 - 0.08 * Math.sin(((t.current - 0.86) / 0.14) * Math.PI) : 1;
    g.scale.set(1 + (1 - s) * 0.6, s, 1);
    g.visible = t.current > 0.001;
  });

  const size = cell * 0.94;
  return (
    <group ref={group}>
      {offsets.map(([dx, dy], i) => (
        <RoundedBox key={i} args={[size, size, size]} radius={cell * 0.16} smoothness={3} position={[dx, dy, 0]} castShadow>
          <meshPhysicalMaterial
            color={piece.tint}
            transmission={tetris.transmission}
            thickness={tetris.thickness}
            roughness={tetris.roughness}
            ior={1.42}
            clearcoat={1}
            clearcoatRoughness={0.12}
            attenuationColor={piece.tint}
            attenuationDistance={1.2}
          />
        </RoundedBox>
      ))}
    </group>
  );
}

export default function TetrisWell({ scroll, controls }: Props) {
  const layout = useLayout(controls.tetris.cellScale);
  return (
    <group name="tetris">
      {PIECES.map((p) => (
        <GlassPiece key={p.index} piece={p} layout={layout} scroll={scroll} controls={controls} />
      ))}
    </group>
  );
}
